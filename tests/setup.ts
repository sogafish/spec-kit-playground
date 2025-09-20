import '@testing-library/jest-dom';

// i18next モック
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'ja',
    },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

// IntersectionObserver モック
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  disconnect() {}
  unobserve() {}
} as unknown as typeof IntersectionObserver;

// ResizeObserver モック
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  disconnect() {}
  unobserve() {}
} as unknown as typeof ResizeObserver;

// localStorage モック
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// sessionStorage モック
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

// matchMedia モック
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});