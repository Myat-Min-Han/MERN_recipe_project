import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import axios from 'axios';

const DialogBox = ({DialogOpen, Dialog_handleClose, recipe_id, setRecipes, handleClick}) => {

    return (
    <Dialog
        open={DialogOpen}
        onClose={Dialog_handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title" style={{color: 'red'}}>
            Delete Confirmation
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this recipe?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={Dialog_handleClose}
            style={{color: 'black'}}
            >Cancel</Button>

            <Button autoFocus
            style={{
                backgroundColor: 'red',
                color: 'white'
            }}
            onClick={async () => {
                Dialog_handleClose();
                try {
                    let res = await axios.delete('/api/recipes/' + recipe_id);
                    setRecipes(prev => prev.filter(r => r._id !== recipe_id));
                    handleClick()
                } catch(e) {
                    console.log(e.message)
                }
            }} 
            > 
            Delete
            </Button>
        </DialogActions>
        </Dialog>
    )
}

export default DialogBox