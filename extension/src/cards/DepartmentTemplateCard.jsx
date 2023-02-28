import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Tabs, Tab, List, ListItem, ListItemText, TabLayout, TextLink, TabLayoutContent, Grid } from '@ellucian/react-design-system/core';
import Directory from "../components/Directory";
import Blog from "../components/Blog.jsx";
import FormView from "../components/FormView.jsx";
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
    const { summary, dirBool, formBool, blogBool, smBool, formList } = customConfiguration ? customConfiguration.cardSettings : {
        summary: '',
        dirBool: false,
        blogBool: false,
        formBool: false,
        blogEmail: '',
        smBool: false,
        formList: []
    };
    const [value, setValue] = useState({
        index: 0,
        text: 'default'
    });

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
                    {value.index == 0 && <Typography variant='caption'> {summary} </Typography>}
                    {value.index == 0 && <FormView formList={formList}/> }
                    {value.index == 1 && <Directory /> }
                    {value.index == 2 && <Blog /> }
                    {value.index == 3 && <FormView formList={formList}/>}
                </TabLayoutContent>
            </TabLayout>
        </Grid>
    );
};

DepartmentTemplateCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DepartmentTemplateCard);