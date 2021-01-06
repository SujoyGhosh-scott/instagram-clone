import React from 'react'
import './Feed.css'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Stories from "./Stories"
import Posts from "./Posts"

function Feed() {
    return (
        <div className="feed">
            <nav className="feed__header">
                <Header />
            </nav>
            <Stories />
            <Posts />
            <nav className="feed__footer">
                <Footer />
            </nav>
        </div>
    )
}

export default Feed
