import AsyncStorage from "@react-native-async-storage/async-storage";

async function AuthHeader() {
  let token = await AsyncStorage.getItem("token");
  
    if (token) {
      return `Bearer ${token}`;
    } else {
      return ``;
    }
  }
  export default AuthHeader;