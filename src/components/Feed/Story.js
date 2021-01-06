import React, { useState, useEffect } from 'react';
import "./Story.css"
import { Avatar } from "@material-ui/core";
import {
  MoreHoriz,
  Close,
  ChevronRight,
  ChevronLeft,
} from "@material-ui/icons";

const Story = ({ profilePic, user, caption, image }) => {
    const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStory(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showStory]);

  return (
    <div className="story" onClick={() => setShowStory(true)}>
      <Avatar src={profilePic} />
      <p>{user}</p>
      {showStory && (
        <div className="showstory">
          <div className="main-story">
            <div className="main-story-top">
              <Avatar src={profilePic} />
              <p>username</p>
              <MoreHoriz className="more-icon" />
            </div>
            <div className="main-story-body">
              <ChevronLeft className="story-body-icon" />
              <img src={image} alt="" />
              <ChevronRight className="story-body-icon" />
              <Close
                className="story-body-icon close-icon"
                onClick={() => setShowStory(false)}
              />
            </div>
          </div>
          <h1 className="story-caption">{caption}</h1>
        </div>
      )}
    </div>
  );
}

export default Story