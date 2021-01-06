import React, { useState, useEffect } from 'react'
import "./Stories.css"
import Avatar from "@material-ui/core/Avatar";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Story from './Story';
import axios from "../../axios"

function Stories() {
    const [addStories, setAddStories] = useState(false);
    const [stories, setStoeies] = useState([]);
    const [input, setInput] = useState("")
    const [image, setImage] = useState(null)

    useEffect(() => {
      console.log("calling fetchStories!")
      fetchStories()
    }, [])

    const fetchStories = () => {
      axios.get('/retrieve/stories')
        .then((res) => {
          console.log("showing all stories!")
          console.log(res.data)
          setStoeies(res.data)
        })
    }

    const handelChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    
    return (
        <div className="stories">
            <div className="add-story" onClick={() => setAddStories(!addStories)}>
                <Avatar />
                <AddCircleIcon className="add-icon" />
            </div>
            {stories.map((story) => (
            <Story
              key={story.imgName}
              username={story.user}
              profilePic={story.profilePic}
              caption={story.caption}
              image={story.image}
              timestamp={story.timestamp}
            />
            ))}
            
            {addStories && (
                <div className="add-my-story">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Add a caption..." value={input} onChange={e => setInput(e.target.value)} />
                    <div className="add-my-story-form-row2">
                    <input type="file" onChange={(e) => handelChange(e)} />
                    <button type="submit">Add Story</button>
                    </div>
                </form>
                </div>
            )}
        </div>
    )
}

export default Stories
