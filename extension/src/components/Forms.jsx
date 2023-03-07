import React, {useState} from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Button, Chip, TextField, List, ListItemText, FormControl, FormControlLabel, FormLabel, FormGroup, Checkbox, ListItem, Grid, Typography, TextLink } from '@ellucian/react-design-system/core';
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
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 20
    },
    chip: {
      margin: 5
    }
});

function Forms({formList, handleAddForm, handleDeleteForm, classes}) {

  const [url, setUrl] = useState('')
  const [label, setLabel] = useState('')
  const roleList = ['advisor', 'alumni', 'employee', 'instructor', 'student', 'vendor'];
  const [role, setRole] = useState(roleList.reduce((obj, roleName) => ({...obj, [roleName]: false}), {}))
  const handleSubmit = () => {
    handleAddForm({url, label, role})
    setUrl('');
    setLabel('');
    setRole(roleList.reduce((obj, roleName) => ({...obj, [roleName]: false}), {}));
  };

  const handleChange = name => event => {
    setRole({...role, [name]: event.target.checked });
  };

  const handleDelete = (index) => {
    const newFormList = [...formList];
    console.log("previous form list:")
    console.log(newFormList)
    newFormList.splice(index, 1);
    console.log("index :")
    console.log(index)
    handleDeleteForm(...newFormList)
  }
  return (
    <Grid className={classes.forms} direction="column" justifyContent="space-evenly" alignItems="flex-start" >
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
          <ListItem id="Form" button key={index} href={value.url} >
            <ListItemText primary={value.label} />
            {Object.keys(value.role).map( (roleName, index) => { return value.role[roleName] ? <Chip className={classes.chip} key={index} label={roleName} /> : null })}
            <TextLink onClick={() => handleDelete(index)}>Delete</TextLink>
          </ListItem>
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