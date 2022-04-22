import React , { useState, useEffect } from 'react'
import { Grid, Chip, InputAdornment, IconButton, Box, FormControl, InputLabel, Input } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

import useStyle from './styles'


const Tags = ({ postData, setPostData }) => {
    const [value, setValue] = useState('')
    const classes = useStyle()

    const addTag = tags =>{
        if(!tags) return
        const SeperatedTags = tags.split(' ').filter((t) => !postData.tags.includes(t))
        setPostData({...postData, tags: [...postData.tags, ...SeperatedTags]})
        setValue('')
    }

    const deleteTag = tag =>{
        setPostData({...postData, tags: postData.tags.filter((t) => t !== tag)})
    }

    return (
        <Box display='flex' flexDirection="column" className={classes.box}>
            <FormControl className={classes.input} variant='outlined'>
                <InputLabel htmlFor="outlined-adornment-password">Tags</InputLabel>
                <Input
                    type='text'
                    label="Tags"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label="add tag"
                                onClick={() => addTag(value)}
                                edge='end'
                            >
                                <AddIcon />
                            </IconButton>
                        </InputAdornment>
                    }    
                />
            </FormControl>
            <Grid container>
                {postData.tags.map((tag) => (
                    <Grid  item>
                        <Chip className={classes.item} label={tag} onDelete={() => deleteTag(tag)} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Tags