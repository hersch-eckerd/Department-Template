import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Tabs, Tab, List, ListItemButton, ListItemText, TabLayout, TextLink, TabLayoutContent, Grid } from '@ellucian/react-design-system/core';
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
    const [cardSettings, setCardInfo] = useState(customConfiguration ? customConfiguration.cardSettings : {
        title: 'Default Title',
        summary: 'Default Summary',
        dirBool: null,
        blog: null,
        forms: []
    })

    const [value, setValue] = useState({
        index: 0,
        text: 'default'
    });

    return (
        <Grid>
            <Typography variant="h2"> {cardSettings.title} </Typography>
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
                    <Typography>Forms</Typography>
                    {Array.isArray(cardSettings.forms)
                    ? <List>
                        {cardSettings.forms.length !== '0' && cardSettings.forms.map((value, index) => (
                            <ListItemButton
                                key={index}
                                component="a"
                                id= {value.label + "-TextLink" }
                                target="_blank" >
                                <ListItemText>{value.label}</ListItemText>
                            </ListItemButton>
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