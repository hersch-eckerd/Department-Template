import React, {useState} from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Button, TextField, List, ListItemText, FormControl, FormControlLabel, FormLabel, FormGroup, Checkbox, ListItem, Grid, Typography, TextLink } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import FormView from './FormView';
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

function Forms({formList, handleAddForm, handleDeleteForm, classes}) {

  const [url, setUrl] = useState('')
  const [label, setLabel] = useState('')
  const roleList = ['advisor', 'alumni', 'employee', 'instructor', 'student', 'vendor'];
  // a useState variable that is a single object with keys of role names and values of booleans
  const [role, setRole] = useState(roleList.reduce((obj, roleName) => ({...obj, [roleName]: false}), {}))
  const handleSubmit = () => {
    handleAddForm({url, label, role})
    setUrl('');
    setLabel('');
    setRole(roleList.map( (roleName) => ({[roleName]: false})));
  };

  const handleChange = name => event => {
    setRole({...role, [name]: event.target.checked });
  };

  const handleDelete = (index) => {
    const newFormList = [...formList];
    newFormList.splice(index, 1);
    handleDeleteForm(...newFormList)
  }
  console.log("role: ")
  console.log(role)
  console.log("roleList: ")
  console.log(roleList)

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
        <FormControl >
          <FormLabel component="legend">Roles to show form</FormLabel>
          <FormGroup>
          {roleList.map( (roleName, index) => {
            return (
              <FormControlLabel key={index}
                control={
                  <Checkbox
                    checked={role[roleName]}
                    onChange={handleChange([roleName])}
                    value={role[roleName]}
                    />
                  }
                label={roleName}
                />
            )})}
          </FormGroup>
        </FormControl>
        <Button
          className={classes.input}
          onClick={handleSubmit} >
            Add Value
        </Button>
      </Grid>
      {!formList || !Array.isArray(formList) || formList.length == 0
      ? <div>
          <Typography color="textSecondary">
              No forms found.
          </Typography>
        </div>
      : <List>
        {formList && formList.map( (value, index) => (
        <Grid containter direction="row" justifyContent="space-evenly" key={index}>
          <ListItem id="Form" button href={value.url} >
            <ListItemText primary={value.label} />
          </ListItem>
          <TextLink onClick={() => handleDelete(index)}>Delete</TextLink>
        </Grid>
        ))}
      </List>}
    </Grid>
  )
}

Forms.propTypes = {
  handleDeleteForm: PropTypes.func,
  handleAddForm: PropTypes.func,
  formList: PropTypes.array,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Forms)