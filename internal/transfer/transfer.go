/*
   Copyright The containerd Authors.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

// Package transfer provides client-side transfer types that marshal
// into the containerd transfer API protobuf messages.
package transfer

import (
	"context"
	"io"

	transferpb "github.com/containerd/containerd/api/types/transfer"
	"github.com/containerd/containerd/v2/core/streaming"
	tstreaming "github.com/containerd/containerd/v2/core/transfer/streaming"
	"github.com/containerd/typeurl/v2"
)

// ContainerPath represents a path within a running container's
// filesystem. It acts as either a source or destination in a transfer
// operation, identifying the container and path for archive operations.
type ContainerPath struct {
	ContainerID       string
	Path              string
	NoWalk            bool
	PreserveOwnership bool
}

// MarshalAny marshals the ContainerPath to a typeurl.Any.
func (cp *ContainerPath) MarshalAny(ctx context.Context, sm streaming.StreamCreator) (typeurl.Any, error) {
	return typeurl.MarshalAny(&transferpb.ContainerPath{
		ContainerID:       cp.ContainerID,
		Path:              cp.Path,
		NoWalk:            cp.NoWalk,
		PreserveOwnership: cp.PreserveOwnership,
	})
}

// ReadStream carries data from the client to the server (import
// direction). The client sends data through the stream and the server
// reads it.
type ReadStream struct {
	MediaType string
	reader    io.Reader
}

// NewReadStream creates a ReadStream that will send data from r to the
// server during marshaling.
func NewReadStream(r io.Reader, mediaType string) *ReadStream {
	return &ReadStream{MediaType: mediaType, reader: r}
}

// MarshalAny marshals the ReadStream, creating a streaming connection
// and starting a goroutine that sends data from the reader.
func (s *ReadStream) MarshalAny(ctx context.Context, sm streaming.StreamCreator) (typeurl.Any, error) {
	sid := tstreaming.GenerateID("data")
	stream, err := sm.Create(ctx, sid)
	if err != nil {
		return nil, err
	}

	go tstreaming.SendStream(ctx, s.reader, stream)

	return typeurl.MarshalAny(&transferpb.ReadStream{
		Stream:    sid,
		MediaType: s.MediaType,
	})
}

// WriteStream carries data from the server to the client (export
// direction). The server writes data into the stream and the client
// receives it.
type WriteStream struct {
	MediaType string
	writer    io.WriteCloser
}

// NewWriteStream creates a WriteStream that will receive data from the
// server into w during marshaling.
func NewWriteStream(w io.WriteCloser, mediaType string) *WriteStream {
	return &WriteStream{MediaType: mediaType, writer: w}
}

// MarshalAny marshals the WriteStream, creating a streaming connection
// and starting a goroutine that receives data into the writer.
func (s *WriteStream) MarshalAny(ctx context.Context, sm streaming.StreamCreator) (typeurl.Any, error) {
	sid := tstreaming.GenerateID("data")
	stream, err := sm.Create(ctx, sid)
	if err != nil {
		return nil, err
	}

	go func() {
		io.Copy(s.writer, tstreaming.ReceiveStream(ctx, stream))
		s.writer.Close()
	}()

	return typeurl.MarshalAny(&transferpb.WriteStream{
		Stream:    sid,
		MediaType: s.MediaType,
	})
}
