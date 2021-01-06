import React, { useState, useEffect } from 'react'
import "./Posts.css"
import Post from "./Post"
import axios from "../../axios"

function Posts() {
    const [postsData, setPostsData] = useState([])

    useEffect(() => {
        console.log("calling syncfeed!")
        syncFeed()
    }, [])

    const syncFeed = () => {
        axios.get('/retrieve/posts')
            .then((res) => {
                console.log("showing all posts!")
                console.log(res.data)
                setPostsData(res.data)
            })
    }

    return (
        <div className="posts">
            {postsData.map(post => (
                <Post 
                    user={post.user}
                    profilePic={post.profilePic}
                    imgName={post.imgName}
                    caption={post.caption}
                    timestamp={post.timestamp}
                    likes={post.likes}
                    comments={post.comments}
                    key={post.imgName}
                />
            ))}
        </div>
    )
}

export default Posts
