import React, { useState } from 'react'
import { Button } from '@mui/material'
import firebase from 'firebase/compat/app'
import { storage, db } from './firebase'

export default function ImageUpload({ username }) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    };

    const handleUpload = (e) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(progress)
            },
            (error) => {
                console.log(error)
                alert(error.message)
            },
            () => {

                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });

                        setProgress(0);
                        setCaption('');
                        setImage()
                    })

            }
        )
    }

    return (
        <div>
            <progress value={progress} max='100' />
            <input type='text' value={caption} onChange={event => setCaption(event.target.value)} placeholder='Enter a caption...' />
            <input type='file' onChange={handleChange} />
            <Button className='imageUpload_button' onClick={handleUpload}>
                Upload
            </Button>

        </div>
    )
}
// Firebase Storage: An unknown error occurred,
//  please check the error payload for server response. (storage/unknown)