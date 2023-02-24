import React, {useEffect, useState} from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Button, TextField, List, ListItemText, ListItemButton, ListItem, Grid, Typography, TextLink } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import { spacing60 } from '@ellucian/react-design-system/core/styles/tokens';
const styles = theme => ({
  root: {
      backgroundColor: theme.palette.background.paper
    },
  listArea: {
      backgroundColor: theme.palette.grey['200'],
      maxWidth: theme.spacing(100),
      minWidth: theme.spacing(50),
      padding: spacing60
    }
});


function FormList(props) {
  const {setFormList} = props;
  const [newForm, setNewForm] = useState()
  const [formURL, setFormURL] = useState()
  const [formLabel, setFormLabel] = useState()

  useEffect(() => {
    setFormList(newForm)
  }, [newForm] )

  const handleAddValue = () => {
    if (Array.isArray(newForm)) {
      setNewForm(newForm => [...newForm, {
        label: formLabel,
        url: formURL } ])
    } else {
      setNewForm([ {
        label: formLabel,
        url: formURL } ])
    }
  }
  const handleDeleteValue = (index) => {
    if (Array.isArray(newForm)) {
      setNewForm([...newForm.slice(0, index), ...newForm.slice(index + 1)])
    } else {
      setNewForm(null)
    }
  };

  return (
    <Grid container direction="column" justifyContent="space-between" alignItems="stretch" >
      <Grid item><Typography>Add Form</Typography></Grid>
      <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-start" >
        <TextField item
          value={formURL}
          onChange={(e) => setFormURL(e.target.value)}
          label= "URL of Form"
          />
        <TextField item
          value={formLabel}
          onChange={(e) => setFormLabel(e.target.value)}
          label= "Label of Form" />
        <Button item onClick={handleAddValue}>Add Value</Button>
      </Grid>

      <List component="nav">
      {Array.isArray(newForm)
      ? newForm.map( (value, index) => (
        <ListItem key={index}>
          <ListItemButton id="hover" href={value.url} target="_blank">
            <ListItemText primary={value.label} id= {value.label + "-FormLink" }/>
          </ListItemButton >
          <Button onClick={() => handleDeleteValue(index)}>Delete</Button>
        </ListItem>
        ) )
      : typeof newForm === "object"
      ? <ListItem>
          <ListItemButton id="hover" href={newForm.url} target="_blank">
            <ListItemText primary={newForm.label} id= {newForm.label + "-FormLink" }/>
          </ListItemButton >
          {/* <Button onClick={() => handleDeleteValue(0)}>Delete</Button> */}
        </ListItem> : <Typography>No Forms!</Typography>
      }
      </List>
    </Grid>
  )
}

FormList.propTypes = {
  setFormList: PropTypes.func,
  formList: PropTypes.object
};

export default withStyles(styles)(FormList)