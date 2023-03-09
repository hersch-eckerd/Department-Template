import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Tabs, Tab, TabLayout, TabLayoutContent, List, ListItem } from '@ellucian/react-design-system/core';
import { useCardInfo, useData } from '@ellucian/experience-extension/extension-utilities';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';


const styles = () => ({
    card: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: 0,
        marginLeft: spacing40
    }
});

const Directory = () => {
    const {configuration : {customConfiguration}} = useCardInfo();
    const [list, setList] = useState();

    useEffect(() => {
        console.log("directory effect loaded: code group = " );
    }, []);

    /* if (list != null) {list.map(person => {
        <ListItem>
            <ListItemText />
        </ListItem>
    })} */

    return <Typography>Directory Component</Typography>
};

Directory.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Directory);