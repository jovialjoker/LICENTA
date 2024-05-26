import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const useCacheAndSync = (storageKey: string, serverUrl: string) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const getDataFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem(storageKey);
      if (storedData !== null) {
        setData(JSON.parse(storedData));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveDataToStorage = async (data: any) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  const sendDataToServer = async (data: any) => {
    try {
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed');
      }

      return response.json();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const syncData = async () => {
      if (isConnected) {
        const storedData = await AsyncStorage.getItem(storageKey);
        if (storedData) {
          await sendDataToServer(JSON.parse(storedData));
          await AsyncStorage.removeItem(storageKey);
        }
      }
    };

    syncData();
  }, [isConnected]);

  const cacheData = async (newData: any) => {
    setData(newData);
    await saveDataToStorage(newData);
    if (isConnected) {
      await sendDataToServer(newData);
      await AsyncStorage.removeItem(storageKey);
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  return [data, cacheData];
};

export default useCacheAndSync;
