import * as React from 'react';
import {FormControlLabel,Button,Paper,Typography,TextField,Stack,Box,Checkbox} from '@mui/material';
import Popper from '@mui/material/Popper';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import {BASE_URL} from '../utils/constants'

const Form2=() => {
  const [selected,setSelected]=React.useState(false);
  const [Button_label,setLabel]=React.useState("Login")
const handleCheckbox=  ()=>{
setSelected(!selected);
setLabel((selected?"Login": "Register"))
}
const handleSubmit=async (data)=>{
let url
if (selected){
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
  console.log(response.body,data)
}
return (
  <FormContainer defaultValues={{
    
      'username': '',
      "email":'',
      'password':''
    
    
  }}
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
    </Paper>
  </FormContainer>)
}
export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);
const [data,setData]=React.useState({"Username":"","Password":"","Email":""})
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleForm= (event)=>{
    const val=event.target.value
data={...data,[event.target.id]:val}
setData(data);

  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

const handleSubmit= ()=>{
  console.log(data);
}
  return (
    <>
     
      <Button color="inherit"  onClick={handleClick}>
        Toggle Popper
      </Button>


      <Popper id={id} open={open} anchorEl={anchorEl}>

              
<Form2/>
      </Popper>

    </>
  );
}
