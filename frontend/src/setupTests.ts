import '@testing-library/jest-dom';

// Mock TextEncoder/TextDecoder which are required by some dependencies
class MockTextEncoder {
  encode() {
    return new Uint8Array();
  }
}

class MockTextDecoder {
  decode() {
    return '';
  }
}

global.TextEncoder = MockTextEncoder as any;
global.TextDecoder = MockTextDecoder as any;

// Mock fetch
global.fetch = jest.fn() as jest.Mock;
