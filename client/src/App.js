import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  console.log(!user ? 'there is no user': 'there is a user!')

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Navigate replace to="/posts" />} />
          <Route path='/posts' exact element={<Home />} />  
          <Route path='/posts/search' exact element={<Home />} />
          <Route path='/posts/:id' element={<PostDetails />} />  
          <Route path='/auth' exact element={!user ? <Auth /> : <Navigate replace to='/posts' />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App