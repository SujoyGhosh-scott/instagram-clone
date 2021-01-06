import React from 'react'
import "./Profile.css"
import Header from '../Header/Header'
import Avatar from "@material-ui/core/Avatar";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import GridOnIcon from '@material-ui/icons/GridOn';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

function Profile() {
    return (
        <div className="profile">
            <div className="profile__header">
                <Header />
            </div>
            <div className="profile__body">
                <Avatar />
                <div className="profile__body__info">
                    <p className="profile__username">sujoy ghosh</p>
                    <p className="profile__bio">developer</p>
                </div>
                <div className="edit__profile">
                    <p>add bio</p>
                    <AddCircleOutlineIcon fontSize="small" />
                </div>
            </div>
            <div className="header__selected" />
            <div className="profile__posts">
                <div className="profile__posts__header">
                    <div>
                        <GridOnIcon fontSize="small" />
                        <p>POSTS</p>
                    </div>
                    <div>
                        <LiveTvIcon fontSize="small" />
                        <p>IGTV</p>
                    </div>
                    <div>
                        <BookmarkBorderIcon fontSize="small" />
                        <p>SAVED</p>
                    </div>
                    <div>
                        <AssignmentIndIcon fontSize="small" />
                        <p>TAGGED</p>
                    </div>
                </div>
                <div className="posts__posts">
                    
                </div>
            </div>
        </div>
    )
}

export default Profile
