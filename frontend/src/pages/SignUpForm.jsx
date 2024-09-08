import {React, useContext, useState} from 'react';
import '../styles/SignUpForm.css'
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from '../helpers/axios.js';
import Stack from '@mui/material/Stack'; 
import ErrorIcon from '@mui/icons-material/Error';
import { AuthContext } from '../context/AuthContext.jsx';

const SignUpForm = () => {

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext)

  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [error, setError] = useState(null)

  const signUp = async (e) => {

    try {
      e.preventDefault()
    let userAcc = {
      name, 
      email,
      password
    };

    let res = await axios.post('/api/user/register', userAcc);
    dispatch({type: 'sign-up', payload: res.data.user})
    navigate('/log-in')
    } catch(e) {
      setError(e.response.data.error)
    }
  }

  return (
    <section className='signUpForm-container' onSubmit={signUp}>
          <Typography className='sigUpForm-typo' gutterBottom variant='h5'>Sign Up</Typography>
          <form className='signUpForm-form'>
            <TextField id="standard-basic" label="Name" variant="standard" value={name} required
            onChange={e => setName(e.target.value)}/>
            <TextField id="standard-basic" label="Email" variant="standard" value={email} required
            onChange={e => setEmail(e.target.value)}/>
            <TextField id="standard-basic" label="Password(at least 5 words or numbers)" variant="standard" value={password} required
            onChange={e => setPassword(e.target.value)}/>

            { error ? (<Stack direction='row' spacing={1}>
            <ErrorIcon sx={{color: 'red'}}/><Typography variant="caption" display="block" gutterBottom style={{color: 'red'}}>
              {error}
            </Typography>
            </Stack>) : null}

            <Button type="submit" variant="contained"
            style={{
              backgroundColor: 'rgb(218, 69, 69)',
              marginTop: '15px',
              marginBottom: '15px'
            }}
            >Create</Button>
            
          </form>
    </section>
  )
}

export default SignUpForm