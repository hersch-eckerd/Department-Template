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
  const {formList, setFormList} = props;

  const [formURL, setFormURL] = useState()
  const [formLabel, setFormLabel] = useState()

  const handleAddValue = () => {
    if (formList === null) {
      setFormList([{url: formURL, label: formLabel}])
    } else if (Array.isArray(formList)) {
      setFormList([...formList, {url: formURL, label: formLabel}])
    }
  }
  const handleDeleteValue = (index) => {
    if (Array.isArray(formList)) {
      setFormList([...formList.slice(0, index), ...formList.slice(index + 1)])
    } else {
      setFormList(null)
    }
  };

  return (
    <Grid container direction="column" justifyContent="space-between" alignItems="stretch" >
      <Grid><Typography>Add Form</Typography></Grid>
      <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-start" >
        <TextField
          value={formURL}
          onChange={(e) => setFormURL(e.target.value)}
          label= "URL of Form"
          />
        <TextField
          value={formLabel}
          onChange={(e) => setFormLabel(e.target.value)}
          label= "Label of Form" />
        <Button onClick={handleAddValue}>Add Value</Button>
      </Grid>
    </Grid>
  )
}

FormList.propTypes = {
  setFormList: PropTypes.func,
  formList: PropTypes.array
};

export default withStyles(styles)(FormList)