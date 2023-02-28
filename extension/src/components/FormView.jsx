import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Tabs, Tab, TabLayout, TabLayoutContent, List, ListItem, ListItemText } from '@ellucian/react-design-system/core';
import { useCardInfo, useData } from '@ellucian/experience-extension/extension-utilities';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const styles = theme => ({
    root: {
        padding: spacing40
    }
});

const FormView = ({ classes, formList }) => {
    console.log(formList)
    if (!formList || !Array.isArray(formList) || formList.length === 0) {
        return (
            <div >
                <Typography color="textSecondary">
                    No forms found.
                </Typography>
            </div>
        );
    }
    return (
    <List>
        {formList.map( (value, index) => (
        <ListItem id="Form" button href={value.url} key={index}>
            <ListItemText primary={value.label} />
        </ListItem>
        ))}
    </List> )
}

FormView.propTypes = {
    classes: PropTypes.object.isRequired,
    formList: PropTypes.array.isRequired
};

export default withStyles(styles)(FormView);