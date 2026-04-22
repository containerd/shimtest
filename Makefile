GO ?= go
GO_BUILDTAGS ?=
GO_TAGS = $(if $(GO_BUILDTAGS),-tags "$(strip $(GO_BUILDTAGS))",)
TEST_BINARY = _output/shimtest.test
TESTBIN_OUT = _output/testbin.gz

# Target OS/arch for testbin. Defaults to linux/amd64.
TESTBIN_GOOS ?= linux
TESTBIN_GOARCH ?= amd64

.PHONY: build testbin clean help

build: testbin
	$(GO) test -c $(GO_TAGS) -o $(TEST_BINARY) .

testbin: $(TESTBIN_OUT)

$(TESTBIN_OUT):
	@mkdir -p _output
	CGO_ENABLED=0 GOOS=$(TESTBIN_GOOS) GOARCH=$(TESTBIN_GOARCH) \
		$(GO) build -ldflags='-s -w' -o _output/testbin ./cmd/testbin
	gzip -c -9 _output/testbin > $(TESTBIN_OUT)
	rm -f _output/testbin

clean:
	rm -f $(TEST_BINARY) $(TESTBIN_OUT)

help:
	@echo "Usage: make build"
	@echo ""
	@echo "Targets:"
	@echo "  build    Build the test binary (includes testbin)"
	@echo "  testbin  Build the testbin container binary only"
	@echo "  clean    Remove build artifacts"
	@echo ""
	@echo "Cross-compilation:"
	@echo "  make testbin TESTBIN_GOARCH=arm64"
	@echo ""
	@echo "If a pre-built testbin.gz is available, place it at"
	@echo "$(TESTBIN_OUT) before running make build."
	@echo ""
	@echo "Running tests:"
	@echo "  sudo $(TEST_BINARY) -test.v -test.timeout=120s -shimtest.config=<config.json>"
	@echo ""
	@echo "Running benchmarks:"
	@echo "  sudo $(TEST_BINARY) -test.run=^$$ -test.bench=. -test.timeout=300s -shimtest.config=<config.json>"
	@echo ""
	@echo "Examples:"
	@echo "  make build"
	@echo "  sudo _output/shimtest.test -test.v -test.timeout=120s -shimtest.config=profiles/runc.json"
	@echo "  sudo _output/shimtest.test -test.run=^$$ -test.bench=BenchmarkShim -test.count=3 -test.timeout=300s -shimtest.config=profiles/nerdbox.json"
