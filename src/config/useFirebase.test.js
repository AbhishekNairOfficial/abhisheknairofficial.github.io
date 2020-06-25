import { renderHook } from '@testing-library/react-hooks';
import firebase from 'firebase';

import { useRealtimeDatabase, initialiseFirebase } from './useFirebase';

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
