import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { TextField, Grid, Switch, FormControlLabel, FormControl, FormGroup, FormLabel, List, ListItem, ListItemText, FormHelperText } from '@ellucian/react-design-system/core';
import Forms from '../components/Forms.jsx';
import FormView from '../components/FormView.jsx';
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
    const [cardSettings, setCardSettings] = useState(customConfiguration ? customConfiguration.client.cardSettings : {
        summary: '',
        dirBool: false,
        blogBool: false,
        formBool: false,
        smBool: false,
        dirCode: '',
        blogEmail: '',
        smLink: '',
        formList: []
    })
    console.log(customConfiguration)

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
                multiline
                onBlur={handleBlur}
                onChange={(e) => handleChange("summary", e)}
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
                                id={`dirBool`}
                                checked={cardSettings.dirBool}
                                onChange={handleSwitch("dirBool")}
                                value={cardSettings.dirBool}
                            />
                        }
                        label="Show Directory?"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                id={`blogBool`}
                                checked={cardSettings.blogBool}
                                onChange={handleSwitch("blogBool")}
                                value={cardSettings.blogBool}
                            />
                        }
                        label="Show Blog?"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                id={`formBool`}
                                checked={cardSettings.formBool}
                                onChange={handleSwitch("formBool")}
                                value={cardSettings.formBool}
                            />
                        }
                        label="Show Forms?"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                id={`smBool`}
                                checked={cardSettings.smBool}
                                onChange={handleSwitch("smBool")}
                                value={cardSettings.smBool}
                            />
                        }
                        label="Show See More Link?"
                    />
                </FormGroup>
            </FormControl>
            {cardSettings.dirBool == true && <TextField
                label= "Banner Code from crosswalk-rules to sync groups with"
                className={classes.input}
                onBlur={handleBlur}
                onChange={(e) => handleChange("dirCode", e)}
                placeholder="HR-FULL-TIME"
                value={cardSettings.dirCode}
            />}
            {cardSettings.blogBool == true && <TextField
                label= "Email to pull blog posts from"
                className={classes.input}
                onBlur={handleBlur}
                onChange={(e) => handleChange("blogEmail", e)}
                placeholder="test@eckerd.edu"
                value={cardSettings.blogEmail}
            />}
            {cardSettings.smBool == true && <TextField
                label= "See More Link"
                className={classes.input}
                onBlur={handleBlur}
                onChange={(e) => handleChange("smLink", e)}
                placeholder="https://www.eckerd.edu"
                value={cardSettings.smLink}
            />}
            <Forms formList={cardSettings.formList} setFormList={handleAddForm} />
            <FormView formList={cardSettings.formList} />
        </Grid>
    );
};

DepartmentTemplateCardConfig.propTypes = {
    cardControl: PropTypes.object,
    cardInfo: PropTypes.object,
    classes: PropTypes.object
};

export default withStyles(styles)(DepartmentTemplateCardConfig);