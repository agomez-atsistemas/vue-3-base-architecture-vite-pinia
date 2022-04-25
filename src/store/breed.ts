import { defineStore } from 'pinia';
import { Breed, getBreedList, getBreedPhotoList } from '@/services/dogsService';
import { useUserMessageStore, UserMessageType } from './userMessage'; 

export interface BreedState {
  isLoading: boolean;
  breedList: Breed[];
  selectedBreed?: string | null;
  breedPhotoList: string[];
}

export const useBreedStore = defineStore({
  id:'breed',
  state: (): BreedState => ({
    isLoading: true,
    breedList: [],
    selectedBreed: null,
    breedPhotoList: []
  }),
  actions: {
    setBreedList(payload: Breed[]): void {
      this.isLoading = false;
      this.breedList = payload;
    },
    setSelectedBreed(payload: string): void {
      this.isLoading = true;
      this.selectedBreed = payload;
    },
    setBreedPhotoList(payload: string[]): void {
      this.isLoading = false;
      this.breedPhotoList = payload;
    },
    setBreedPhotoListFailure(): void {
      this.isLoading = false;
      this.breedPhotoList = [];
    },
    async fetchBreedList(): Promise<void> {
      const userMessageStore = useUserMessageStore();
      try {
        userMessageStore.clearUserMessage();
        const response = await getBreedList();
        this.setBreedList(response);
      } catch (error) {
        userMessageStore.setUserMessage({ type: UserMessageType.error, message: (error as Error).message });
      }
    },
    async selectBreed(breedId: string): Promise<void> {
      const userMessageStore = useUserMessageStore();
      try {
        this.setSelectedBreed(breedId);
        userMessageStore.clearUserMessage();
        const response = await getBreedPhotoList(breedId);
        this.setBreedPhotoList(response);
      } catch (error) {
        this.setBreedPhotoListFailure();
        userMessageStore.setUserMessage({ type: UserMessageType.error, message: (error as Error).message });
      }
    }
  },
  getters: {}
});
