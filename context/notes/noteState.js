import NoteContext from "./state";

function NoteState(props) {
  const state = {
    "name": "lekhit",
    'class': "10 a"
  };
  return (
    <NoteContext.provider value={state}>
      {props.children}
    </NoteContext.provider>
  );
}
export default NoteState;