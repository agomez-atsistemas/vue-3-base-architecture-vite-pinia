import { getBreedList } from '@/services/dogsService';
import { fetchBreedListFixture, breedListFixture } from '@tests/unit/mockBreedList';
import { BreedState, useBreedStore } from './breed';
import { UserMessageState, useUserMessageStore, UserMessageType } from './userMessage';
import { mockFetch } from 'vi-fetch';

describe('store/index.ts', () => {
  it('set breed list mutation with value passing', () => {
    const breedStore = useBreedStore();

    breedStore.setBreedList([{ id: 'breed1', name: 'Breed1' }]);

    expect(breedStore.breedList).toStrictEqual([{ id: 'breed1', name: 'Breed1' }]);
  });

  it('set selected breed mutation with value passing', () => {
    let breedStore = useBreedStore();

    const initialState: BreedState = {
      isLoading: false,
      breedList: [
        { id: 'breed1', name: 'Breed1' },
        { id: 'breed2', name: 'Breed2' },
        { id: 'breed3', name: 'Breed3' }
      ],
      selectedBreed: null,
      breedPhotoList: []
    };
    breedStore = {...breedStore, ...initialState};

    breedStore.setSelectedBreed('breed1');

    expect(breedStore.selectedBreed).toBe('breed1');
  });

  it('load available breed list', async () => {

    const mock = mockFetch('GET','/breeds/list/all').willResolve({
      message: fetchBreedListFixture.message,
      status: fetchBreedListFixture.status,
    });
  
    const breedList = await getBreedList();
    expect(breedList).toEqual(breedListFixture);
    expect(mock).toHaveFetched();

  });

  it('set user message mutation', () => {
    const userMessageStore = useUserMessageStore();

    const message: UserMessageState = {
      type: UserMessageType.error,
      message: 'Example of error test'
    };

    userMessageStore.setUserMessage(message);
    expect(userMessageStore.type).toBe('ERROR');

    userMessageStore.clearUserMessage();
    expect(userMessageStore.type).toBe(null);
  });
});
