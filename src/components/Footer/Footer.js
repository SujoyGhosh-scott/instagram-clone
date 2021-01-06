import React, {useState} from 'react'
import "./Footer.css"
import { Link } from "react-router-dom";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import MovieRoundedIcon from '@material-ui/icons/MovieRounded';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import Avatar from '@material-ui/core/Avatar';
import axios from "../../axios"
const dateFormat = require('dateformat')

function Footer() {
    const [addPost, setAddPost] = useState(false);
    const [input, setInput] = useState('');
    const [image, setImage] = useState(null)

    const handelChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handelSubmit = async (e) => {
        e.preventDefault()

        if(image) {
            const imgForm = new FormData()
            imgForm.append('file', image, image.name)

            //adding the image in the database
            axios.post('/upload/image', imgForm, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${imgForm._boundary}`,
                }
            }).then((res) => {
                console.log("returned data from upload/image")
                console.log(res.data)

                const myPost = {
                    user: "Sujoy ghosh",
                    profilePic: "",
                    imgName: res.data.filename,
                    timestamp: dateFormat(Date.now(), "dddd, mmmm dS, yyyy"),
                    caption: input,
                    likes: 0,
                    comments: []
                }
                console.log("sent myPost:")
                console.log(myPost)
                savePost(myPost)
            })
        } else {
            const myPost = {
                user: "Sujoy ghosh",
                profilePic: "",
                timestamp: dateFormat(Date.now(), "dddd, mmmm dS, yyyy"),
                caption: input,
                likes: 0,
                comments: []
            }
            console.log("sent myPost:")
            console.log(myPost)
            savePost(myPost)
        }

        setInput('')
        setImage(null)
    }

    const savePost = async (myPost) => {
        await axios.post('/upload/post', myPost)
            .then((resp) => {
                console.log("uploaded post: ")
                console.log(resp)
            })
    }

    return (
        <div className="footer">
            <Link className="footer__link" to="/">
                <HomeRoundedIcon fontSize="large" />
            </Link>
            <MovieRoundedIcon fontSize="large" />
            <AddBoxOutlinedIcon
                onClick={() => setAddPost(!addPost)} 
                fontSize="large" 
            />
            {addPost && (
                <div className="add-post">
                    <form onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Add a caption..." value={input} onChange={e => setInput(e.target.value)} />
                    <div className="add-post-form-row2">
                        <input type="file" onChange={(e) => handelChange(e)} />
                        <button type="submit" onClick={(e) => handelSubmit(e)}>Post</button>
                    </div>
                    </form>
                </div>
            )}
            <FavoriteBorderRoundedIcon fontSize="large" />
            <Link to="/profile">
                <Avatar />
            </Link>
        </div>
    )
}

export default Footer
