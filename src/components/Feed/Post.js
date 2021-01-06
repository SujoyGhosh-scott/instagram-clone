import React, {useState} from 'react'
import "./Post.css"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import ModeCommentRoundedIcon from '@material-ui/icons/ModeCommentRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import { Avatar } from '@material-ui/core';

function Post({user, profilePic, imgName, caption, timestamp, likes, comments}) {
    const [showComments, setShowcomments] = useState(false)
    return (
        <div className="post">
            <div className="post__header">
                <Avatar src={imgName} />
                <h4>{user}</h4>
                <MoreVertIcon className="post__moreIcon" />
            </div>
            <div className="post__body">
                {
                    imgName && <img 
                    className="post__body__row1" 
                    src={`http://localhost:9000/retrieve/image/single?name=${imgName}`} 
                    alt=""
                    />
                }
                <div className="post__body__row2">
                    <FavoriteRoundedIcon />
                    <ModeCommentRoundedIcon />
                    <SendRoundedIcon />
                    <BookmarkBorderRoundedIcon className="post__bookmarkIcon" />
                </div>
            </div>
            <div className="post__bottom">
                {
                    (likes != 0) ? 
                        <p>{likes} Likes</p>
                        : <></>
                }
                <p className="post__caption">{caption}</p>
                <div>
                    {
                        (comments.length>0) ? 
                        (!showComments) ? 
                                <p 
                                    className="post__comments" 
                                    onClick={() => setShowcomments(!showComments)}
                                >
                                    view all {comments.length} comments
                                </p>
                                : 
                                <div>
                                    <p onClick={() => setShowcomments(!showComments)}>close comments</p>
                                    {
                                        comments.map(comment => (
                                            <div className="comment">
                                                <Avatar />
                                                <div>
                                                    <h5>{comment.username}</h5>
                                                    <p>{comment.comment}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                        : <></>
                    }
                </div>
                <p>{timestamp}</p>
            </div>
            <form className="post_commentSection">
                <input type="text" placeholder="add a comment..." />
                <button type="submit">post</button>
            </form>
        </div>
    )
}

export default Post
