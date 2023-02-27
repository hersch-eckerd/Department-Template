import React, {useState} from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Button, TextField, List, ListItemText, ListItemButton, ListItem, Grid, Typography, SelectionMenu, SelectionMenuItem, TextLink } from '@ellucian/react-design-system/core';
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

function Forms({formList, setFormList}) {

  const [url, setUrl] = useState('')
  const [label, setLabel] = useState('')
  const [type, setType] = useState('Student');

  const handleSubmit = (event) => {
    setFormList([
      ...formList,
      [url, label, type]
      ]);
    console.log(formList)
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
      setFormList(null)
    }
  };

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" >
      <Typography variant="h3">Add Form</Typography>
      <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-start" >
        <TextField
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          label= "URL of Form" />
        <TextField
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          label= "Label of Form" />
        <SelectionMenu
          value={type}
          label="Type of Form"
          onChange={(e) => setType(e.target.value)}
        >
          <SelectionMenuItem value="Student">Student</SelectionMenuItem>
          <SelectionMenuItem value="Faculty">Faculty</SelectionMenuItem>
        </SelectionMenu>
        <Button onClick={handleSubmit}>Add Value</Button>
      </Grid>
    </Grid>
  )
}

Forms.propTypes = {
  setFormList: PropTypes.func,
  formList: PropTypes.array
};

export default withStyles(styles)(Forms)