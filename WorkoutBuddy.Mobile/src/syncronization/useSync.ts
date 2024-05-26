import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const useSyncWithServer = (storageKey: string, url: string, method = 'GET', data = null) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const syncData = async () => {
      setLoading(true);

      try {
        const isConnected = await NetInfo.fetch().then(state => state.isConnected);

        if (isConnected) {
          // If connected, send data to the server
          if (method === 'POST' && data) {
            await sendDataToServer(url, data);
          }
          
          // Fetch data from the server
          const serverResponse = await axios({ method, url, data });
          setResponse(serverResponse.data);
          await AsyncStorage.setItem(url, JSON.stringify(serverResponse.data));
        } else {
          // If not connected, retrieve data from AsyncStorage
          const cachedData = await AsyncStorage.getItem(url);
          if (cachedData) {
            setResponse(JSON.parse(cachedData));
          } else {
            setError('No internet connection and no cached data available');
          }
        }
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    syncData();
  }, [url, method, data]);

  const sendDataToServer = async (storageKey: string, url: string, data: any) => {
    try {
      await axios.post(url, data);
      await AsyncStorage.removeItem(storageKey);
    } catch (err) {
      await AsyncStorage.setItem(storageKey, JSON.stringify(data));
      setError(err.message);
    }
  };

  return { response, error, loading };
};

export default useSyncWithServer;
