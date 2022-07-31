import * as React from 'react';
import {FormControlLabel,Button,Paper,Typography,TextField,Stack,Box,Checkbox} from '@mui/material';
import Popper from '@mui/material/Popper';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import {BASE_URL} from '../utils/constants'
import { useAppContext } from '../context/notes/state';

const Form2=(props) => {
  const is_login=useAppContext();
  const [message,setMessage]=React.useState(null);
  const [selected,setSelected]=React.useState(false);
  const [Button_label,setLabel]=React.useState("Login")
const handleCheckbox=  ()=>{
setSelected(!selected);
setLabel((selected?"Login": "Register"))
}
const handleSubmit=async (data)=>{
let url
if (selected){
  data.likes=[]
  data.shared=[]
  data.for_me=[]
  url=`${BASE_URL}/api/user_register`
}
else url=`${BASE_URL}/api/user_login`
 const response= await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
const rs=await response.json()
  console.log(rs,data)
  setMessage(rs.message)
  if(rs.message==="success"){
  props.changeState(null)
  is_login.setLogin(true);
is_login.setUsername(data.username);
}

}

const dataDefault={
    
  'username': '',
  "email":'',
  'password':''


}
return (
  <FormContainer defaultValues={dataDefault}
                 onSuccess={handleSubmit}
  >
    <Paper sx={{p:3}}>
    
    <Box sx={{ display: 'flex', flexDirection: 'column', }}>
<Box sx={{ display: 'flex', flexDirection: 'row', }}>
<Box sx={{p:1}}>
    <TextFieldElement

      required
      margin={'dense'}
      label={'Username'}
      name={'username'}
    />
    </Box>
   <Box sx={{p:1}}>
    <TextFieldElement
    
      label={'Password'}
      name={'password'}
      margin={'dense'}
      required
      type={'password'}
      
    />
    </Box>
   </Box>
   <Box sx={{p:1}}>
    <FormControlLabel
    control={ <Checkbox checked={selected} label="register" onChange={handleCheckbox} />} label="Register"/>
    </Box>
    {selected && <TextFieldElement
      required

      type={'email'}
      margin={'dense'}
      label={'Email'}
      name={'email'}
    />}

    <Button sx={{mt:1}} type={'submit'} color={'primary'} variant={'contained'}>{Button_label}</Button>

    </Box>
    <Typography variant="h5" component="div">
{message}
        </Typography>
    </Paper>

  </FormContainer>)
}
export default function SimplePopper() {
   const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

const [anchorEl, setAnchorEl] = React.useState(null);
 
 

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;


  return (
    <>
     
      <Button color="inherit"  onClick={handleClick}>
        Toggle Popper
      </Button>


      <Popper id={id} open={open} anchorEl={anchorEl}>

              
<Form2 changeState={setAnchorEl}/>
      </Popper>
      

    </>
  );
}
