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

package shimtest

import (
	"context"
	"net"
	"sync"
	"testing"
	"time"

	eventsapi "github.com/containerd/containerd/api/services/ttrpc/events/v1"
	"github.com/containerd/containerd/api/types"
	"github.com/containerd/ttrpc"
	"google.golang.org/protobuf/types/known/emptypb"
)

// eventRecorder implements the containerd ttrpc events service and
// records every envelope it receives. Shims push events to this
// endpoint (the TTRPC_ADDRESS the shim reads from its environment);
// tests can then assert on topic order, contents, and timing.
type eventRecorder struct {
	mu        sync.Mutex
	envelopes []*types.Envelope
}

// Forward implements the eventsapi.TTRPCEventsService.Forward method.
func (r *eventRecorder) Forward(_ context.Context, req *eventsapi.ForwardRequest) (*emptypb.Empty, error) {
	r.mu.Lock()
	r.envelopes = append(r.envelopes, req.Envelope)
	r.mu.Unlock()
	return &emptypb.Empty{}, nil
}

// topics returns the ordered topic strings recorded so far.
func (r *eventRecorder) topics() []string {
	r.mu.Lock()
	defer r.mu.Unlock()
	out := make([]string, len(r.envelopes))
	for i, e := range r.envelopes {
		out[i] = e.Topic
	}
	return out
}

// waitForTopic polls until an envelope with the given topic is
// recorded, or the timeout expires. Returns nil on timeout.
func (r *eventRecorder) waitForTopic(topic string, timeout time.Duration) *types.Envelope {
	deadline := time.Now().Add(timeout)
	for {
		r.mu.Lock()
		for _, e := range r.envelopes {
			if e.Topic == topic {
				r.mu.Unlock()
				return e
			}
		}
		r.mu.Unlock()
		if time.Now().After(deadline) {
			return nil
		}
		time.Sleep(10 * time.Millisecond)
	}
}

// startEventsRecorder binds a TTRPC events server to the socket path
// the shim dials as its events endpoint (bundleDir/c.sock) and
// returns a recorder capturing every forwarded envelope. Must be
// called before startShim so the shim's first publish succeeds.
func startEventsRecorder(tb testing.TB, bundleDir string) *eventRecorder {
	tb.Helper()

	socketPath := containerdSockPath(tb, bundleDir)

	ln, err := net.Listen("unix", socketPath)
	if err != nil {
		tb.Fatal("events listen:", err)
	}

	srv, err := ttrpc.NewServer()
	if err != nil {
		ln.Close()
		tb.Fatal("events server:", err)
	}

	rec := &eventRecorder{}
	eventsapi.RegisterTTRPCEventsService(srv, rec)

	go srv.Serve(context.Background(), ln)

	tb.Cleanup(func() {
		srv.Close()
		ln.Close()
	})

	return rec
}
