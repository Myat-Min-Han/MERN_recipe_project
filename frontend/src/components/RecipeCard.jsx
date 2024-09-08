import {React, useState, useEffect, useContext} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import '../styles/RecipeCard.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import MyPagination from './MyPagination';
import axios from '../helpers/axios.js';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import CardMedia from '@mui/material/CardMedia';
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import DialogBox from './DialogBox.jsx';

const RecipeCard = () => {

    const navigate = useNavigate();
    const {user} = useContext(AuthContext)

    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [open, setOpen] = useState(false);
    const [avatar, setAvatar] = useState('')

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scroll({
            top: 100,
            left: 100,
            behavior: "smooth",
        })
    };

    useEffect(() => { 
        const fetchData = async () => {
            try {
                const res = await axios('/api/recipes?page=' +page);
                if(res.status === 200) {
                setRecipes(res.data.recipes);
                setTotalPages(res.data.recipesCount);
                setAvatar(res.data.recipes[0].title.charAt(0))
                }
            } catch(e) {
                console.warn(e)
            }
        };
        fetchData();
    }, [page]);

    //Dialog component
    const [DialogOpen, setDialogOpen] = useState(false);

    const Diaolog_handleClickOpen = () => {
        setDialogOpen(true);
    };

    const Dialog_handleClose = () => {
        setDialogOpen(false);
    };


    return (
    <>
    <section className='recipeCard-container'>
        {
            recipes.map((recipe) => (
            <Card key={recipe._id} className='recipeCard-card'>
            <CardHeader sx={{ paddingBottom: 1}}
                avatar={
                    <Avatar
                    style={{
                        backgroundColor: 'rgb(218, 69, 69)'
                    }}
                    >{avatar}</Avatar>
                }
                title={
                    <Typography className='recipeCard-header-typo' 
                    sx={{
                        fontWeight: 'bold'
                    }}
                    variant='body1'>{recipe.title}</Typography>
                }
                
                subheader={<Typography sx={{
                    opacity: 0.7
                }}>
                    {recipe.time}
                </Typography>}

                action={ 
                    <>
                    <Tooltip title='Edit'>
                        <IconButton aria-label="settings" onClick={() => navigate('/recipes/edit/' + recipe._id)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    
                    
                    <Tooltip title='Delete'>
                        <IconButton aria-label="settings"
                        onClick={Diaolog_handleClickOpen}
                        >
                            <DeleteIcon/>
                            <Snackbar
                                open={open}
                                autoHideDuration={2000}
                                onClose={handleClose}
                                message="Successfully deleted"
                            />
                        </IconButton>
                    </Tooltip>
                    </>
                }
            />
            
            <DialogBox DialogOpen={DialogOpen} Dialog_handleClose={Dialog_handleClose} recipe_id={recipe._id}
            setRecipes={setRecipes} handleClick={handleClick}
            />
            <CardMedia
                component="img"
                height="194"
                image={import.meta.env.VITE_BACKEND_URL + recipe.photo}
                alt="Cannot load image"
            />

            <CardContent>

            <Typography variant='subtitle1' gutterBottom >
                Ingridients - {
                recipe.ingridients.map((ingridient, index) => (
                <span className='ingridients' key={index}>
                    <Chip label={ingridient} sx={{
                        color: 'white'
                    }} size="small" />
                </span> 
                ))
            }
            </Typography>

            <Typography variant="body2">
                {recipe.description}
            </Typography>
            <br/>

            <Link to={`/recipes/${recipe.title}`}>Read more...</Link>
            </CardContent>
        </Card>
        ))
        } 
    </section>
    { user && <MyPagination page={page} count={totalPages} onPageChange={handlePageChange} />}
    </>
)
}

export default RecipeCard