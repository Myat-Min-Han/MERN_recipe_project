import {React, useEffect, useState} from 'react';
import { TextField } from '@mui/material';
import '../styles/FormCard.css'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from '../helpers/axios.js';
import { useNavigate, useParams} from 'react-router-dom';
import date from 'date-and-time';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const FormCard = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    let [title, setTitle] = useState('')
    let [ingridients, setIngridients] = useState('')
    let [description, setDescription] = useState('')
    let [procedure, setProcedure] = useState('');
    let [file, setFile] = useState('');
    let [preview, setPreview] = useState('');
    let [loading, setLoading] = useState(false);
    let [err, setErr] = useState(null);

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    {id && useEffect(() => {
        const fetchSingle = async () => {
            let single = await axios.get('/api/recipes/' + id);
            if (single) {
                setPreview(import.meta.env.VITE_BACKEND_URL + single.data.photo)
                setTitle(single.data.title)
                setIngridients(single.data.ingridients);
                setDescription(single.data.description)
                setProcedure(single.data.procedure)
            }

        };
        fetchSingle();
    }, [id])}

    //time format function 

    const now = new Date();
    const pattern = date.compile('ddd, MMM DD YYYY');
    let time = date.format(now, pattern);        
    
    let createRecipe = async (e) => {
        try {
            e.preventDefault();
        setLoading(true);
        let recipe = {
            title,
            description,
            ingridients,
            procedure,
            time
        };

        let res;
        if(id) {
            res = await axios.patch("/api/recipes/" + id, recipe);
        } else {
            res = await axios.post("/api/recipes", recipe)
        };


        let formData = new FormData();

        formData.set('photo', file);

        let updatedRes = await axios.post(`/api/recipes/${res.data._id}/upload`, formData);

        if(res.status === 200) {
            setLoading(false)
            navigate('/')
        }
        } catch(e) {
            setErr(e.message)
        }
        

    };

    const upload = e => {
        let file = e.target.files[0];
        setFile(file)
        //preview 

        let reader = new FileReader();

        reader.onload = (e) => {
            setPreview(e.target.result)
        }

        reader.readAsDataURL(file)
    };


    return (
    <section className='FormCard-container'>
        
        <br/>
        <form action='' onSubmit={createRecipe}>
        <Typography variant='h5' gutterBottom className='FormCard-typo'>{ id ? 'Edit': "Create"} your recipe</Typography>
        <br/>

        <TextField type='file' size='small' onChange={upload}
        sx={
            {
                width: 400
            }
        }
        required
        />  
        <br/>

        {preview && <img src={preview} alt="Cannot load image" 
        style={{
            width: '400px',
            marginBottom: '10px'
        }}
        />}
        
        <TextField id="filled-basic" label="Title"  required variant="outlined" 
        value={title}
        
        onChange={(e) => setTitle(e.target.value)}
        sx={{
            width: 400
        }}
        />
        <br/>
        <TextField id="filled-basic" label="Description"  required variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)} 
        sx={{
            width: 400
        }}/>
        <br/>
        <TextField
        id="filled-multiline-flexible"
        label="Ingridients"
        multiline
        maxRows={2}
        variant="outlined"
        required
        value={ingridients}
        onChange={(e) => setIngridients(e.target.value.split(","))}
        sx={{
            width: 400
        }}
        />
        <br/>
        <TextField
        id="filled-multiline-flexible"
        label="Procedure"
        multiline
        maxRows={2}
        variant="outlined"
        required
        value={procedure}
        onChange={(e) => setProcedure(e.target.value)}
        sx={{
            width: 400
        }}/>
        <br/>
        
        <Button
            onClick={handleOpen}
            type='submit'
            variant='contained'
            style={{
                backgroundColor: "rgb(218, 69, 69)"
            }}
        >
            {id ? "Edit" : "Create"}
        </Button>
        <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        </form>
    </section>
    )
}

export default FormCard

