import React, { createContext, useState } from 'react';

// Create context
export const AppContext = createContext();

// Provider component
export const ContextProvider = ({ children }) => {
  const [categoryName, setCategoryName] = useState("");

  return (
    <AppContext.Provider value={{ categoryName, setCategoryName }}>
      {children}
    </AppContext.Provider>
  );
};
