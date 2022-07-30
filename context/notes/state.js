import { createContext, useContext,useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  
const [login,setLogin]=useState(false)
  

  return (
    <AppContext.Provider value={{login,setLogin}}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}