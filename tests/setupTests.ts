
import { config } from '@vue/test-utils';
import 'vi-fetch/setup';
import { mockFetch, prepareFetch } from 'vi-fetch';
import { createPinia, setActivePinia } from 'pinia';

// Start server before all tests
beforeAll(() => {
  prepareFetch(globalThis, 'fetch');
  mockFetch.setOptions({ baseUrl: 'https://dog.ceo/api' });
});

beforeEach(() => {
  setActivePinia(createPinia());
  mockFetch.clearAll();
})

config.global.mocks = { $t: (msg: string) => msg };
