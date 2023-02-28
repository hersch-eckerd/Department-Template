import React, {useState} from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Button, TextField, List, ListItemText, ListItemButton, ListItem, Grid, Typography, SelectionMenu, SelectionMenuItem, TextLink } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import { spacing60 } from '@ellucian/react-design-system/core/styles/tokens';
const styles = theme => ({
  root: {
      backgroundColor: theme.palette.background.paper
    },
    forms: {
      marginTop: spacing60,
      marginBottom: spacing60
    },
    input: {
      marginRight: 20,
      marginLeft: 20
    }

});

function Forms({formList, setFormList, classes}) {
  const [url, setUrl] = useState('')
  const [label, setLabel] = useState('')
  const [type, setType] = useState('Student');

  const handleSubmit = () => {
    setFormList({url, label, type})
    setUrl('');
    setLabel('');
    setType('Student');
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleDeleteValue = (index) => {
    if (Array.isArray(formList.formList)) {
      setFormList([...formList.formList.slice(0, index), ...formList.formList.slice(index + 1)])
    } else {
      setFormList([])
    }
  };

  return (
    <Grid container className={classes.forms} direction="column" justifyContent="space-evenly" alignItems="flex-start" >
      <Typography variant="h3">Add Form</Typography>
      <Grid item direction="row" justifyContent="space-evenly" alignItems="center" >
        <TextField
          className={classes.input}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          label= "URL of Form" />
        <TextField
          className={classes.input}
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          label= "Label of Form" />
        <SelectionMenu
          className={classes.input}
          value={type}
          label="Type of Form"
          onChange={(e) => setType(e.target.value)}
        >
          <SelectionMenuItem value="Student">Student</SelectionMenuItem>
          <SelectionMenuItem value="Faculty">Faculty</SelectionMenuItem>
          <SelectionMenuItem value="Both">Both</SelectionMenuItem>
        </SelectionMenu>
        <Button
          className={classes.input}
          onClick={handleSubmit} >
            Add Value
        </Button>
      </Grid>
    </Grid>
  )
}

Forms.propTypes = {
  setFormList: PropTypes.func,
  formList: PropTypes.array,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Forms)