import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  const requestInterceptors = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const responseInterceptors = httpClient.interceptors.response.use(
    (res) => res,
    (error) => {
      setError(error);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(requestInterceptors);
      httpClient.interceptors.response.eject(responseInterceptors);
    };
  }, [requestInterceptors, responseInterceptors]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
