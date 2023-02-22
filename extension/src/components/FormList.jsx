import React, {useEffect, useState} from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Button, TextField, List, ListItem, Grid, Typography, TextLink } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';

const styles = () => ({
  card: {
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0
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
    setNewForm([...newForm.slice(0, index), ...newForm.slice(index + 1)])
  };

  return (
    <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch">
      <Grid item><Typography>Add Form</Typography></Grid>
      <Grid item direction="row" justifyContent="space-around" alignItems="stretch">
        <TextField item
          value={formURL}
          onChange={(e) => setFormURL(e.target.value)}
          label= "URL of Form" />
        <TextField item
          value={formLabel}
          onChange={(e) => setFormLabel(e.target.value)}
          label= "Label of Form" />
        <Button item onClick={handleAddValue}>Add Value</Button>
      </Grid>

      {Array.isArray(newForm)
      ? newForm.map( (value, index) => (
        <Grid container direction="row" justifyContent="center" alignItems="center" key={index}>
          <TextLink
            id= {value.label + "-TextLink" }
            target="_blank"
            href={value.url} >
            {value.label}
          </TextLink>
          <Button onClick={() => handleDeleteValue(index)}>Delete</Button>
        </Grid> ) )
      : typeof newForm === "object"
      ? <TextLink
          id= {newForm.label + "-TextLink" }
          target="_blank"
          href={newForm.url} >
          {newForm.label}
        </TextLink> : null
      }
    </Grid>
  )
}

FormList.propTypes = {
  setFormList: PropTypes.func,
  formList: PropTypes.object
};

export default withStyles(styles)(FormList)