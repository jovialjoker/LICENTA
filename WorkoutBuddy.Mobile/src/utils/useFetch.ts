import AsyncStorage from "@react-native-async-storage/async-storage";
import env from "./constants/env";

const useFetch = async (
    endpoint: string,
    opt?: object,
    data?: any
  ) => {
      let token = await AsyncStorage.getItem("token");
    
      let res = await fetch(`${env.NGROK_URL}/${endpoint}`, {
        // ...opt,
        body: data,
        ...(token
          ? { Authorization: "Bearer " + token.substring(0, token.length) }
          : {}),
      });
      return await res.json()
    };
  
  export default useFetch;
  