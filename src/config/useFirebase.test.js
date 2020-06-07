import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { renderHook } from '@testing-library/react-hooks';
import firebase from 'firebase';

import { act } from 'react-test-renderer';
import { useFirebaseStorage, useRealtimeDatabase, initialiseFirebase } from './useFirebase';

configure({ adapter: new Adapter() });

describe('useRealtimeDatabase', () => {
  if (firebase.apps.length === 0) {
    initialiseFirebase();
  }
  const key = '';
  const { result, waitForNextUpdate } = renderHook(() => useRealtimeDatabase(key));

  it('Should get a value', async () => {
    await waitForNextUpdate();
    expect(result.current).not.toBeNull();
  });
});

describe('useFirebaseStorage', () => {
  if (firebase.apps.length === 0) {
    initialiseFirebase();
  }
  const key = 'banner-image.png';
  const { result, waitForNextUpdate } = renderHook(() => useFirebaseStorage(key));

  it('Should return a value', async () => {
    act(async () => {
      await waitForNextUpdate();
    });
    expect(result.current).not.toBeNull();
  });
});
