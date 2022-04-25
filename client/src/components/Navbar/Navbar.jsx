import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, AppBar, Typography, Toolbar, Avatar } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import useStyles from './styles'
import memories from '../../images/memories.png'
import { useAuth0 } from '@auth0/auth0-react'

const Navbar = () => {
    const classes = useStyles()
    const { loginWithRedirect, logout, user, isAuthenticated} = useAuth0()
    const dispatch = useDispatch()

    console.log(user)


    return (
        <AppBar className={classes.appBar} position='static' color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img src={memories} className={classes.image} alt="memories" height='60' />
            </div>
            <Toolbar className={classes.toolbar}>
                {isAuthenticated ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.name} src={user.picture}>{user.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.name}</Typography>
                        <Button  variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button onClick={loginWithRedirect} variant="contained" color="primary">Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar