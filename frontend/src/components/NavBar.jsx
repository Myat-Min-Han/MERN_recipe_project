import {React} from 'react';
import {Link}from 'react-router-dom'
import '../styles/NavBar.css';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import UserInfo from './UserInfo.jsx';
import Stack from '@mui/material/Stack';


const NavBar = () => {

  return (
  <section className='navBar-container'>
    <nav>
      <div className='navBar-logo'>
        <Typography variant='h5' gutterBottom>
          RecipeBook
        </Typography>
      </div>
      <div className='navBar-menu'>
        <Stack direction="row">
          <Link to='/'>Home</Link>
          <Link to='/recipes/create'>Create</Link>
          <UserInfo/>
        </Stack>
      </div>
    </nav>
    <Divider/>
  </section>
  )
}

export default NavBar