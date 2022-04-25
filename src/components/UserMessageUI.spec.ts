import { render } from '@testing-library/vue';
import { UserMessageState, UserMessageType } from '@/store/userMessage';
import UserMessageUI from './UserMessageUI.vue';
import { createTestingPinia } from '@pinia/testing';
import { createMockStore } from '@tests/unit/mockStore';

describe('UserMessageUI.vue', () => {
  it('hides if no message', () => {
    const { container } = render(UserMessageUI, {
      global: {
        plugins: [createTestingPinia()]
      }
    });
    const messageElement = container.querySelector('.UserMessage') as HTMLImageElement;
    expect(messageElement).toBeNull();
  });

  it('shows info message style', async () => {
    const initialState: UserMessageState = {
      type:UserMessageType.info,
      message: 'Test message',
    };

    const mockStore = createMockStore(initialState, 'userMessage');

    const { getByText } = render(UserMessageUI, {
      global: {
        plugins: [mockStore],
      },
    });
    
    expect(getByText('Test message'));
  });

  it('shows error message style', () => {
    const initialState: UserMessageState = {
      type:UserMessageType.error,
      message: 'Test error',
    };

    const mockStore = createMockStore(initialState, 'userMessage');

    const { getByText } = render(UserMessageUI, {
      global: {
        plugins: [mockStore],
      },
    });
    
    expect(getByText('Test error'));
  });
});
