import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Button, Typography, Tabs, Tab, TabLayout, TabLayoutContent, Grid } from '@ellucian/react-design-system/core';
import { Icon } from '@ellucian/ds-icons/lib';
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
    },
    button: {
        marginTop: spacing40,
        marginBottom: spacing40
    },
    hidden: {
        display: 'none'
    }
});

const DepartmentTemplateCard = (props) => {
    const { classes } = props;
    const { configuration: { customConfiguration }} = useCardInfo();
    const { summary, dirBool, formBool, blogBool, smBool, smLink, formList } = customConfiguration ? customConfiguration.cardSettings : {
        summary: '',
        dirBool: false,
        blogBool: false,
        formBool: false,
        blogEmail: '',
        smBool: false,
        smLink: '',
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
                    {dirBool ? <Tab id={`Directory`} label="Directory" /> : <Tab id={`Directory`} label="Directory" className={classes.hidden} />}
                    {blogBool ? <Tab id={`Blog`} label="Blog" /> : <Tab id={`Blog`} label="Blog" className={classes.hidden} />}
                    {formBool ? <Tab id={`Forms`} label="Forms" /> : <Tab id={`Forms`} label="Forms" className={classes.hidden} />}
                </Tabs>
                <TabLayoutContent>
                    {value.index == 0 &&
                        <Grid>
                            <Typography > {summary} </Typography>
                            {smBool && <Button className={classes.button} href={smLink} endIcon={<Icon name="chevron-right"/>}> See More </Button>}
                        </Grid>}
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