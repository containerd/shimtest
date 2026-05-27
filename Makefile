GO ?= go
GO_BUILDTAGS ?=
# On Windows the test binary must have the .exe extension to be executable.
ifeq ($(OS),Windows_NT)
TEST_BINARY = _output/shimtest.exe
else
TEST_BINARY = _output/shimtest.test
endif
TESTBIN_OUT = _output/testbin

# Target arch for testbin. Always linux; defaults to amd64.
TESTBIN_GOARCH ?= amd64

.PHONY: build testbin clean help

build: testbin
	$(GO) test -c -tags "shimtest_embedded$(if $(GO_BUILDTAGS), $(GO_BUILDTAGS),)" -o $(TEST_BINARY) .

testbin: $(TESTBIN_OUT)

$(TESTBIN_OUT):
	@mkdir -p _output
	CGO_ENABLED=0 GOOS=linux GOARCH=$(TESTBIN_GOARCH) \
		$(GO) build -ldflags='-s -w' -o $(TESTBIN_OUT) ./cmd/testbin

clean:
	rm -f $(TEST_BINARY) $(TESTBIN_OUT) _output/testbin-*

help:
	@echo "Usage: make build"
	@echo ""
	@echo "Targets:"
	@echo "  build    Build the test binary (includes testbin)"
	@echo "  testbin  Build the testbin container binary only"
	@echo "  clean    Remove build artifacts"
	@echo ""
	@echo "Cross-compilation (always linux):"
	@echo "  make testbin TESTBIN_GOARCH=arm64"
	@echo ""
	@echo "If a pre-built testbin is available, place it at"
	@echo "$(TESTBIN_OUT) before running make build."
	@echo ""
	@echo "Running tests:"
	@echo "  $(TEST_BINARY) -test.v -test.timeout=120s -shimtest.config=<config.json>"
	@echo ""
	@echo "Running benchmarks:"
	@echo "  $(TEST_BINARY) -test.run=^$$ -test.bench=. -test.timeout=300s -shimtest.config=<config.json>"
	@echo ""
	@echo "Examples:"
	@echo "  make build"
	@echo "  $(TEST_BINARY) -test.v -test.timeout=120s -shimtest.config=profiles/myconfig.json"
	@echo "  $(TEST_BINARY) -test.run=^$$ -test.bench=BenchmarkShim -test.count=3 -test.timeout=300s -shimtest.config=profiles/myconfig.json"
