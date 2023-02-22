import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Tabs, Tab, TabLayout, TextLink, TabLayoutContent, Grid } from '@ellucian/react-design-system/core';
// import Directory from "../components/Directory";
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
    const { configuration: { customConfiguration:  {settings, formList} }} = useCardInfo();
    const title = settings ? settings.title : undefined;
    const summary = settings ? settings.summary : undefined;
    const dirBool = settings ? settings.dirBool : 0;
    const blog = settings ? settings.blog : false;
    const forms = formList ? formList : [];
    const [value, setValue] = useState({
        index: 0,
        text: 'default'
    });

    console.log(formList)
    console.log(settings)

    return (
        <Grid>
            <Typography variant="h2"> {title} </Typography>
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
                    {dirBool && <Tab id={`Directory`} label="Directory" />}
                    {blog && <Tab id={`Blog`} label="Blog" />}
                    <Tab id={`Forms`} label="Forms" />
                    <Tab id={`SeeMore`} label="See More" />
                </Tabs>
                <TabLayoutContent>
                    <Typography>Content for tab <strong>{value.text}</strong></Typography>
                    {forms != null && forms.map((value, index) => (
                        <TextLink key={index}
                            id= {value.label + "-TextLink" }
                            target="_blank"
                            href={value.url} >
                            {value.label}
                      </TextLink>
                    ))}
                    {value.index == 0 && <Typography variant='caption'> {summary} </Typography>}
                    {value.index == 1 && value.text}
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