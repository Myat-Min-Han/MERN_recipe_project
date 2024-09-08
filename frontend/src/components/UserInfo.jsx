import { React, useState, useContext}from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import { Divider, ListItemText } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import LoginIcon from '@mui/icons-material/Login';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom';
import axios from '../helpers/axios.js';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx'

const UserInfo = () => {

    let { user, dispatch } = useContext(AuthContext)
    const [open, setOpen] = useState(false);

    const navigate = useNavigate()

    const toggleDrawer = (newOpen) => {
        setOpen(newOpen);
    };

    const logout = async () => {
        let res = await axios.post("http://localhost:8000/api/user/logout");
        if(res.status === 200) {
            dispatch({type: 'log-out'})
            navigate('/')
        }
    }

    const DrawerList = (
        
        <Box sx={{ width: 250}} role="presentation" onClick={() => toggleDrawer(false)}>
            <Divider sx={{ height: '50px'}}/>
            <List> 
                {!user && <Link to='log-in'style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <ListItemIcon>
                                <LoginIcon/>
                            </ListItemIcon>
                            <ListItemText primary='log-in'/>
                        </ListItemButton>
                    </ListItem>
                </Link>}

                {!user && <Link to='sign-up'style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <ListItemIcon>
                                <AddBoxIcon/>
                            </ListItemIcon>
                            <ListItemText primary='sign-up'/>
                        </ListItemButton>
                    </ListItem>
                </Link>}

                {user && <Link to='log-out'style={{ textDecoration: 'none', color: 'black'}} onClick={logout}>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText primary='log-out'/>
                        </ListItemButton>
                    </ListItem>
                </Link> }
            </List>
        </Box>
    )
    return (
    <section>
            <IconButton onClick={() => toggleDrawer(true)} style={{position: 'relative', top: '-8px'}}>
                <MenuIcon />
            </IconButton> 
            <Drawer open={open} onClose={() => toggleDrawer(false)} >
                {DrawerList}
            </Drawer>
    </section>
    )
}

export default UserInfo