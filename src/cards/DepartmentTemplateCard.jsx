import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Tabs, Tab, TabLayout, TabLayoutContent, List, ListItem } from '@ellucian/react-design-system/core';
import Directory from "../components/Directory";
import { useCardInfo } from '@ellucian/experience-extension/extension-utilities';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const styles = () => ({
    card: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: 0,
        marginLeft: spacing40
    }
});

const DepartmentTemplateCard = (props) => {
    const { classes } = props;
    const {configuration: {
        summary,
        organization,
        directory
    }} = useCardInfo();
    const [value, setValue] = useState({
        index: 0,
        text: 'default text'
    });

    return (
        <div className={classes.card}>
            <Typography variant="h2">
                {organization}
            </Typography>
            <TabLayout>
                <TabLayoutContent>
                    {value.index == "0" && <Typography variant='caption'> {summary} </Typography>}
                    {value.index == "1" && <Directory />}
                </TabLayoutContent>
                <Tabs
                    id={`${organization}_Tabs`}
                    onChange={(e, val) => setValue({
                        index: val,
                        text: e.currentTarget.dataset.text})
                    }
                    value={value.index} >
                    <Tab id={`${organization}_Tab1`} label="Summary" />
                    {directory && <Tab id={`${organization}_Tab0`} label="Directory" />}
                    <Tab id={`${organization}_Tab2`} label="Forms" />
                    <Tab id={`${organization}_Tab2`} label="See More" />
                </Tabs>
            </TabLayout>
        </div>
    );
};

DepartmentTemplateCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DepartmentTemplateCard);