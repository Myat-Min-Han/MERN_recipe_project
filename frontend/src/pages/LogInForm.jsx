import {React, useState, useContext} from 'react';
import '../styles/SignInForm.css';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from '../helpers/axios.js';
import ErrorIcon from '@mui/icons-material/Error';
import Stack from '@mui/material/Stack'; 
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';


const SignInForm = () => {

  const {dispatch} = useContext(AuthContext);

  let navigate = useNavigate()
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [error, setError] = useState(null)

  const signIn =  async (e) => {
    try {
      e.preventDefault();
      const logInUser = {
        email, 
        password
      };
      let res = await axios.post('/api/user/login', logInUser)
        if(res.status === 200) {
        dispatch({type: 'log-in', payload: res.data.user})
        navigate('/')
        }
    } catch(e) {
      console.log(e.message);
      setError(e.response.data.error)
    }
  }
  
  return (
    <section className='signInform-container'>
        <Typography className='sigInForm-typo' gutterBottom variant='h5'>Log In</Typography>
          <form className='signInForm-form' onSubmit={signIn}>
            <TextField id="standard-basic" label="Email" value={email}  
            onChange={e => setEmail(e.target.value)}
            variant="standard" required
            />

            <TextField id="standard-basic" label="Password" variant="standard"
            value={password} onChange={e => setPassword(e.target.value)} required/>
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
            >Sign In</Button>
          </form>
          <Typography 
          style={{
            textAlign: 'center'
          }}
          variant="caption" display="block" gutterBottom
          >Don't have an account?<Link to="/sign-up">Sign up</Link></Typography>
    </section>

  )
}

export default SignInForm