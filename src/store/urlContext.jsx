import React, { createContext, useState, useEffect } from 'react';

export const UrlContext = createContext(null);

export const UrlProvider = ({ children }) => {
  const [url, setUrl] = useState(window.location.pathname);

  useEffect(() => {
    const updateUrl = () => setUrl(window.location.pathname);
    window.addEventListener('popstate', updateUrl); 

    return () => window.removeEventListener('popstate', updateUrl);
  }, []); 

  return (
    <UrlContext.Provider value={url}>
      {children}
    </UrlContext.Provider>
  );
};
