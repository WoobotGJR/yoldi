const fetchToken = (): string | null => {
  // Проверяем, если мы находимся в браузере
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export default fetchToken;
