import React from 'react'
import './Post.css'

export default function Post() {
    return (
        <div className='post'>
            <h3>Username</h3>
            {/* header => avatar + username  */}


            <img className='post_image' src='/mountain.jpg' alt='mountain' />
            {/* image */}

            <h4>Username: caption</h4>
            {/* username + caption */}


        </div>
    )
}
