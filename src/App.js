import React, { useState, useEffect } from 'react'
import './App.css';
import Post from './Post'
import { db, auth } from './firebase'
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@mui/system';
import ImageUpload from './ImageUpload';


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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'theme.palette.background.paper',
    border: '2px solid #000',
    boxShadow: 10,
    p: 4

  },
})
);

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);

      } else {
        setUser(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data(),
      })))
    })
  }, [])

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)

      .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }

  return (

    <div className='app'>
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />

      ) : (
        <h3>You need to login in first to be able to upload </h3>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Box
            className='app_signUp'
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            Validate
            autoComplete="off"
          >
            {/* <form> */}
            <center>
              <img
                className='app_headerImage'
                src='/header_logo.png'
                alt=''
              />
            </center>
            <TextField
              type='text'
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signUp}>Sign Up</Button>

          </Box>
        </div>
      </Modal >

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Box
            className='app_signUp'
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            Validate
            autoComplete="off"
          >
            {/* <form> */}
            <center>
              <img
                className='app_headerImage'
                src='/header_logo.png'
                alt=''
              />
            </center>
            <TextField
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signIn}>Sign In</Button>

          </Box>
        </div>

      </Modal >

      <div className='app_header'>
        <img
          className='app_headerImage'
          src='/header_logo.png'
          alt=''
        />
      </div>

      {user ? (

        <Button onClick={() => auth.signOut()}>Log Out</Button>
      ) : (
        <div className='app_loginContainer'>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}


      <h1> Hello World!!</h1>

      {
        posts.map(({ id, post }) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
    </div >

  );
}

export default App;
