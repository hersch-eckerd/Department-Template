import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Tabs, Tab, List, ListItem, ListItemText, TabLayout, TextLink, TabLayoutContent, Grid } from '@ellucian/react-design-system/core';
// import Directory from "../components/Directory";
import Blog from "../components/Blog.jsx";
import FormList from "../components/FormList.jsx";
import { useCardInfo } from '@ellucian/experience-extension/extension-utilities';


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
    const { configuration: { customConfiguration: { cardSettings: { summary, dirBool, formBool, blogBool, smBool, formList } } }} = useCardInfo();
    const [value, setValue] = useState({
        index: 0,
        text: 'default'
    });
    console.log(summary, dirBool, formBool, blogBool, smBool, formList)

    return (
        <Grid>
            <TabLayout>
                <Tabs
                    id={"Tabs"}
                    onChange={(e, val) => setValue({
                        index: val,
                        text: e.currentTarget.dataset.text
                    })}
                    value={value.index}
                    variant="card"
                    scrollButtons >
                    <Tab id={`Summary`} label="Summary" />
                    {dirBool ? <Tab id={`Directory`} label="Directory" /> : <Tab id={`Directory`} label="Directory" disabled />}
                    {blogBool ? <Tab id={`Blog`} label="Blog" /> : <Tab id={`Blog`} label="Blog" disabled />}
                    {formBool ? <Tab id={`Forms`} label="Forms" /> : <Tab id={`Forms`} label="Forms" disabled />}
                    {smBool ? <Tab id={`SeeMore`} label="See More" /> : <Tab id={`SeeMore`} label="See More" disabled />}
                </Tabs>
                <TabLayoutContent>
                    <Typography variant="h4">Forms</Typography>
                    <FormList />
                    {value.index == 0 && <Typography variant='caption'> {summary} </Typography> }
                    {value.index == 1 && <Blog /> }
                    {value.index == 2 && value.text}
                </TabLayoutContent>
            </TabLayout>
        </Grid>
    );
};

DepartmentTemplateCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DepartmentTemplateCard);