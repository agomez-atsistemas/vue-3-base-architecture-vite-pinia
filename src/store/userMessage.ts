import { defineStore } from 'pinia';

export enum UserMessageType {
  error = 'ERROR',
  info = 'INFO'
}
export interface UserMessageState {
  type: UserMessageType | null;
  message: string | null;
}

export const useUserMessageStore = defineStore({
  id:'userMessage',
  state: (): UserMessageState => ({
    type: null,
    message: null
  }),
  actions: {
    setUserMessage(payload: UserMessageState): void {
      this.type = payload.type;
      this.message = payload.message;
    },
    clearUserMessage(): void {
      this.type = null;
      this.message = null;
    }
  },
  getters: {}
});
