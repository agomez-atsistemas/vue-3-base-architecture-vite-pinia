import { createTestingPinia } from '@pinia/testing';
import { StateTree } from 'pinia';

export function createMockStore(initialState: StateTree, store: string | number) {
  const pinia = createTestingPinia();
  
  pinia.state.value[store] = {
    ...initialState,
  }

  return pinia;
}