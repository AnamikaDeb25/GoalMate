const fetchRequest = async (url, method, body, headers) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
      timeout: 5000,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const request = async (
  url,
  method,
  body,
  headers,
  retryCount = 3,
  isAxios = true,
) => {
  return fetchRequest(url, method, body, headers);
};
