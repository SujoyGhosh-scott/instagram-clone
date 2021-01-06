import React from 'react'
import "./Header.css"
import { Link } from "react-router-dom";
import HeaderLogo from "../images/Instagram_logo.png"
import ModeCommentRoundedIcon from '@material-ui/icons/ModeCommentRounded';
import IconButton from '@material-ui/core/IconButton';

function Header() {
    return (
        <div className="header">
            <Link to="/">
                <img src={HeaderLogo} className="header__logo" alt="" />
            </Link>
            <Link to="/messages">
                <IconButton>
                    <ModeCommentRoundedIcon />
                </IconButton>
            </Link>
        </div>
    )
}

export default Header
