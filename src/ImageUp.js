// import { Button } from '@mui/material'
// import React from 'react'
// import { db, storage } from './firebase';

// export default function ImageUp() {

//     const [caption, setCaption] = useState('');
//     const [image, setImage] = useState('');
//     const [progress, setProgress] = useState('');
    
// function handleChange(e) {
//     if(e.target.files[0]) {
//         setImage(e.target.files[0])
//     }
// } 

// function handleUpload() {
//     const uploadTask = storage.ref(`images/${image.name}`).put(image)
//     uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//             const progress = Math.round(
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
//             )
//                 setProgress(progress)
//         }, 
//         (error) => {
//             console.log(error);
//             alert(error.message)
//         },

//         () => {
//             storage
//             .ref('images')
//             .child(image.name)
//             .getDownloadURL()
//             .then(url => {
//                 db
//                 .collection('posts')
//                 .add({
//                     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//                     caption: caption, 
//                     imageUrl: url,
//                     username: username
//                 })
//                 setProgress(0);
//                 setCaption('');
//                 setImage(null);
//             })
//         }
//     )
// }

//   return (
//     <div>
//         ImageUp

//     <input type='text' placeholder='Describe the image...' onChange={event => setCaption(event)}/> 
//     <input type='file' onChange={handleChange}/>
//     <Button onClick={handleUpload}>
//         Upload
//     </Button>
//     </div>
//   )
// }
