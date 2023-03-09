import React, {useEffect, useState} from 'react';
import axios from 'axios';
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
    const [cardSettings, setCardSettings] = useState(customConfiguration ? customConfiguration.client.cardSettings : {
        summary: 'Summary',
        dirBool: false,
        blogBool: false,
        formBool: false,
        smBool: false,
        dirCode: '',
        smLink: '',
        formList: [],
        blogCategories: {}
    })
    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState()

    /* useEffect(() => {
        axios.get(`https://wordpress.ban.eckerd.edu/wp-json/wp/v2/categories`)
        .then(response => {
            response.data.map(category => {
                if (categories != null) {
                    setCategories({
                        ...categories,
                        [category.name]: category.id
                    })
                } else {
                    setCategories({
                        [category.name]: category.id
                    })
                }
                return null
            })
        .catch(error => {
            console.log(error);
            setCategories([])}
        )})
        }, [] ) */
    const setConfig = (settings) => {
        setCustomConfiguration({
            customConfiguration: {
                client: settings
            }
        })
    }

    const handleAddForm = (form) => {
        setCardSettings({
            ...cardSettings,
            formList: [...cardSettings.formList, form]
        })
        setConfig(cardSettings)
    }
    const handleDeleteForm = (form) => {
        console.log("card config delete form")
        console.log(form)
        if (form != null) {
            setCardSettings({
                ...cardSettings,
                formList: [form]
            })
        } else {
            setCardSettings({
                ...cardSettings,
                formList: []
            })
        }
        setConfig(cardSettings)
    }
    const handleChange = (tabLabel, e) => {
        setCardSettings({
            ...cardSettings,
            [tabLabel]: e.target.value
        })
        setConfig(cardSettings)
    }
    const handleSwitch = name => event => {
        setCardSettings({
            ...cardSettings,
            [name]: event.target.checked
        })
        setConfig(cardSettings)
    }
    const handleBlur = e => {
        setIsCustomConfigurationValid(e.target.value !== '');
    }
    const handleCategories = (name, id) => e => {
        if (e.target.checked) {
            console.log(name)
        } else {
            console.log(name)
        }
        setCardSettings()
        console.log(cardSettings)
    }

    return (
        <Grid className={classes.card} direction="column" justifyContent="space-between" alignItems="flex-start">
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
                                onBlur={handleBlur}
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
            {/* cardSettings.blogBool == true && categories != null &&
            categories.map((category) => (
                <FormControlLabel
                    control={
                        <Switch
                            id={`blog${category.id}`}
                            checked={cardSettings.blogCategories[category.name]}
                            onChange={handleCategories(category.name, category.id )}
                            value={category.name}
                        />
                    }
                    label={category.name}
                    key={category.id}
                />
            )) */}
            {cardSettings.smBool == true && <TextField
                label= "See More Link"
                className={classes.input}
                onBlur={handleBlur}
                onChange={(e) => handleChange("smLink", e)}
                placeholder="https://www.eckerd.edu"
                value={cardSettings.smLink}
            />}
            <Forms className={classes.input} formList={cardSettings.formList} handleAddForm={handleAddForm} handleDeleteForm={handleDeleteForm} />
        </Grid>
    );
};

DepartmentTemplateCardConfig.propTypes = {
    cardControl: PropTypes.object,
    cardInfo: PropTypes.object,
    classes: PropTypes.object
};

export default withStyles(styles)(DepartmentTemplateCardConfig);