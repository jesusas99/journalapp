import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal'

export const SideBarItem = ({ title, body, id , date, imageURLS = []}) => {
    const dispatch = useDispatch();

    const onClicNote = () => {
        dispatch( setActiveNote({ title, body, id, date, imageURLS}) )
    }
    const newTitle = useMemo( () => {
        return title.length> 17 ? title.substring(0,17) + '...'
        : title;
    },[title])

  return (
    <ListItem key={ id } disablePadding>
        <ListItemButton  onClick={ onClicNote }>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ title } />
                <ListItemText secondary={ body } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
