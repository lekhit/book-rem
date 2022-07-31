import { createContext, useContext,useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  
const [login,setLogin]=useState(false)
const [username,setUsername]=useState(null);
const [likes,setLikes]=useState({99:true})
const [likechanged,setLikechanged]=useState(true)
const [readlist,setReadlist]=useState({"upnext":{99:true}})
const [likecount,setLikecount]=useState(0)
  return (
    <AppContext.Provider value={{likecount,setLikecount,likechanged,setLikechanged,login,setLogin,username,setUsername,likes,setLikes,readlist,setReadlist}}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}