const useAxios = (
  callbackFn: any,
  endpoint: string,
  appendToken?: boolean,
  opt?: object
) => {
  return async (data?: any) => {
    let token;
    if (appendToken) {
      token = sessionStorage.getItem("token");
    }

    return await callbackFn(`${process.env.REACT_APP_API_DOMAIN}/${endpoint}`, {
      ...opt,
      data,
      ...(token
        ? { Authorization: "Bearer " + token.substring(0, token.length) }
        : {}),
    });
  };
};

export default useAxios;
