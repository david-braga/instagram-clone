import React, { useState, useEffect } from 'react'
import './App.css';
import Post from './Post'
import { db } from './firebase'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// import { createTheme } from '@mui/material/styles'
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

// const theme = createTheme()

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  },
})
);

function App() {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)

  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)

  // useEffect => runs a piece of code based on a specific condition

  useEffect(() => {
    db.collection('posts').onSnapshot(Querysnapshot => {
      setPosts(Querysnapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data(),
      }))
      )
    })
  }, [])


  return (

    <div className='app'>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={modalStyle} className={classes.paper}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <div className='app_header'>
        <img
          className='app_headerImage'
          src='/header_logo.png'
          alt=''
        />
      </div>

      <Button onClick={() => setOpen(true)}>Sign Up</Button>

      <h1> Hello World!!</h1>

      {
        posts.map(({ id, post }) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
    </div>

  );
}

export default App;
