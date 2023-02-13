require('dotenv').config();
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
/import { Typography, Tabs, Tab, TabLayout, TabLayoutContent, List, ListItem } from '@ellucian/react-design-system/core';
// import { integrationUtil } from '@ellucian/experience-extension-server-util';
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
    const context = {};
    const apiKey = process.env.API_KEY;
    const {configuration : {codeGroup}} = useCardInfo();

   /*  const {data: groupInfo} = integrationUtil.get({
        apiKey,
        context,
        resource: 'crosswalk-rules',
        searchParams: {
            criteria: JSON.stringify({
                "internalCodeGroup": codeGroup
            })
        }
    }); */

    const [list, setList] = useState();

    useEffect(() => {

    }, []);
    if (list != null) {list.map(person => {
        <ListItem>
            <ListItemText />
        </ListItem>
    })}
    return "Department"
};

Directory.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Directory);