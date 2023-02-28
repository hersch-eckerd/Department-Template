import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Tabs, Tab, List, ListItem, ListItemText, TabLayout, TextLink, TabLayoutContent, Grid } from '@ellucian/react-design-system/core';
// import Directory from "../components/Directory";
import Blog from "../components/Blog.jsx";
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
    const { configuration: { customConfiguration }} = useCardInfo();
    const [cardSettings, setCardSettings] = useState(customConfiguration ? customConfiguration.cardSettings : {
        summary: '',
        dirBool: false,
        blog: false,
        blogEmail: '',
        formList: []
    })

    const [value, setValue] = useState({
        index: 0,
        text: 'default'
    });
    console.log(cardSettings)

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
                    scrollButtons>

                    <Tab id={`Summary`} label="Summary" />
                    <Tab id={`Directory`} label="Directory" />
                    <Tab id={`Blog`} label="Blog" />
                    <Tab id={`Forms`} label="Forms" />
                    <Tab id={`SeeMore`} label="See More" />
                </Tabs>
                <TabLayoutContent>
                    <Typography variant="h4">Forms</Typography>
                    {Array.isArray(cardSettings.formList)
                    ? <List>
                        {cardSettings.formList && cardSettings.formList.length !== '0' &&  cardSettings.formList.map((value, index) => (
                        <ListItem button href={value.url} key={index}>
                            <ListItemText primary={value.label} />
                        </ListItem>
                        ))}
                    </List> : <Typography> No Forms </Typography>}
                    <Typography>Blog</Typography>
                    <Blog />
                    {value.index == 0 && <Typography variant='caption'> {cardSettings.summary} </Typography>}
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