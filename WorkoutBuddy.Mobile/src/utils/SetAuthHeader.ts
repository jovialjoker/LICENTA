function AuthHeader() {
    const token = sessionStorage.getItem("token");
  
    if (token) {
      return `Bearer ${token}`;
    } else {
      return ``;
    }
  }
  export default AuthHeader;