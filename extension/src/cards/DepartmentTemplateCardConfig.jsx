import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { TextField, Grid, Switch, FormControlLabel, FormControl, FormGroup, FormLabel, List, ListItem, ListItemText, FormHelperText } from '@ellucian/react-design-system/core';
import Forms from '../components/Forms.jsx';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';

const styles = () => ({
    card: {
        height: '100%',
        marginTop: 40,
        marginRight: spacing40,
        marginBottom: 40,
        marginLeft: spacing40
    },
    input: {
        marginTop: 20,
        marginBottom: 20
    }
});

const DepartmentTemplateCardConfig = (props) => {
    const {
        cardControl: {
            setCustomConfiguration,
            setIsCustomConfigurationValid
        },
        cardInfo: {
            configuration: {
                customConfiguration
            }
        }, classes
    } = props;
    const [cardSettings, setCardSettings] = useState(customConfiguration ? customConfiguration.cardSettings : {
        summary: '',
        dirBool: false,
        blog: false,
        blogEmail: '',
        formList: []
    })

    useEffect(() => {
        setCustomConfiguration({
            customConfiguration: {
                client: {cardSettings}
            }
        })
    }, [cardSettings])

    const handleAddForm = (form) => {
        setCardSettings({
            ...cardSettings,
            formList: [...cardSettings.formList, form]
        })
    }
    const handleChange = (tabLabel, e) => {
        setCardSettings({
            ...cardSettings,
            [tabLabel]: e.target.value
        })
    }
    const handleSwitch = name => event => {
        setCardSettings({
            ...cardSettings,
            [name]: event.target.checked
        })
    }
    const handleBlur = e => {
        setIsCustomConfigurationValid(e.target.value !== '');
    }

    return (
        <Grid className={classes.card} container direction="column" justifyContent="space-between" alignItems="flex-start">
            <TextField
                label="Summary"
                className={classes.input}
                margin="normal"
                multiline
                onBlur={handleBlur}
                onChange={(e) => handleChange("summary", e)}
                placeholder="Lorem Ipsum"
                value={cardSettings.summary}
            />
            <FormControl component="fieldset" className={classes.input}>
                <FormLabel component="legend">
                    Card Features
                </FormLabel>
                <FormGroup >
                    <FormControlLabel
                        control={
                            <Switch
                                id={`blogSwitch`}
                                checked={cardSettings.blog}
                                onChange={handleSwitch("blog")}
                                value={cardSettings.blog}
                            />
                        }
                        label="Show Blog?"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                id={`dirBool`}
                                checked={cardSettings.dirBool}
                                onChange={handleSwitch("dirBool")}
                                value={cardSettings.dirBool}
                            />
                        }
                        label="Show Directory?"
                    />
                </FormGroup>
            </FormControl>
            <TextField
                label= "Email to pull Blogs from"
                className={classes.input}
                onBlur={handleBlur}
                onChange={(e) => handleChange("blogEmail", e)}
                placeholder="test@eckerd.edu"
                value={cardSettings.blogEmail}
            />
            <Forms formList={cardSettings.formList} setFormList={handleAddForm} />
            <List>
            {cardSettings.formList && cardSettings.formList.length !== '0' && cardSettings.formList.map((form, index) => {
                return (
                    <ListItem button href={form.url} key={index}>
                      <ListItemText primary={form.label} />
                    </ListItem>
                    )
                })
            }
            </List>
        </Grid>
    );
};

DepartmentTemplateCardConfig.propTypes = {
    cardControl: PropTypes.object,
    cardInfo: PropTypes.object,
    classes: PropTypes.object
};

export default withStyles(styles)(DepartmentTemplateCardConfig);