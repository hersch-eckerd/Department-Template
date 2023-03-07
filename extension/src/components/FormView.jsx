import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, List, ListItem, ListItemText } from '@ellucian/react-design-system/core';
import { useUserInfo } from '@ellucian/experience-extension/extension-utilities';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const styles = () => ({
    root: {
        padding: spacing40
    }
});

const FormView = ({classes, formList}) => {
    const {roles} = useUserInfo();
    const [filteredList, setFilteredList] = useState([]);
    useEffect( () => {
        formList.map( form => {
            for (const [role, value] of Object.entries(form.role)) {
                if (value == true && roles.includes(role)) {
                    setFilteredList(filteredList => [...filteredList, form]);
                }}
                return null;
            })
    }, [formList]);

    if (!filteredList || !Array.isArray(filteredList) || filteredList.length === 0) {
    return (
        <div >
            <Typography color="textSecondary">
                No forms found.
            </Typography>
        </div> )}
    else {
        return (
        <List>
        {filteredList.map( (value, index) => (
            <ListItem id="Form" button component="a" href={value.url} key={index}>
                <ListItemText primary={value.label} />
            </ListItem>
        ))}
        </List> )
    }
}
FormView.propTypes = {
    classes: PropTypes.object.isRequired,
    formList: PropTypes.array.isRequired,
    userInfo: PropTypes.object.isRequired
};

export default withStyles(styles)(FormView);