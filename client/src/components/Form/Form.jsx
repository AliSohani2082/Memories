import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/Posts'

import useStyles from './styles'
import Tags from './Tags/Tags'

// GET THE CURRENT ID

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch()
  const [postData, setPostData] = useState({
    title: '', message: '', tags: [], selectedFile: '',
  })
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
  const classes = useStyles()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const isLogedIn = useSelector((state) => state.auth.isLogedIn)

  useEffect(() => {
    if(post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("postData")
    console.log(postData)
    console.log("currentId")
    console.log(currentId)
    
    if(!currentId){
      console.log('create time!!')
      dispatch(createPost({ ... postData, name: user?.result?.name }))
    } else {
      console.log('update time!!')
      dispatch(updatePost(currentId, { ... postData, name: user?.result?.name }))
    }

    clear()
  }

  if(!isLogedIn) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  }

  const clear = () => {
    setCurrentId(null)
    setPostData({
      title: '', message: '', tags: [], selectedFile: '',
    })
  }
  return (
    <Paper className={classes.paper}>
      <h6></h6>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField  name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})} />
        <TextField  name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})} />
        <Tags postData={postData} setPostData={setPostData} />
        
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>

        <Button className={classes.buttonSubmit} variant="contained" color='primary' size='large' type='submit' fullWidth>Submit</Button>
        <Button variant="contained" color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form