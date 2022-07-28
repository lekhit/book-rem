import NoteContext from "./noteContext";
import react from 'react';

const NoteState=(props)=>{
  const state={
    "name":"lekhit",
    'class':"10 a"
  }
return (
  <NoteContext.provider value={state}>
{props.children}
  </NoteContext.provider>
)
}
export default noteState;