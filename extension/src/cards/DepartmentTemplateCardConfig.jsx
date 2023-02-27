import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, Switch, FormControlLabel, FormControl, FormGroup, FormLabel, List, ListItem, ListItemText, FormHelperText } from '@ellucian/react-design-system/core';
import Forms from '../components/Forms.jsx';

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
        }
    } = props;
    const [cardSettings, setCardSettings] = useState(customConfiguration ? customConfiguration.cardSettings : {
        title: '',
        summary: '',
        dirBool: false,
        blog: false,
        blogEmail: '',
        formList: [{
            label: '',
            url: '',
            type: ''
        }]
    })

    useEffect(() => {
        setCustomConfiguration({
            customConfiguration: {
                client: {cardSettings}
            }
        })
    }, [cardSettings])

    const handleAddForm = (paramL, paramU, paramT) => {
        setCardSettings({
            ...cardSettings,
            formList: [...cardSettings.formList, {
                label: paramL,
                url: paramU,
                type: paramT
            }]
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
        <Grid container direction="column" justifyContent="space-between" alignItems="flex-start">
            <TextField
                label= "Title"
                margin="normal"
                onBlur={handleBlur}
                onChange={(e) => handleChange("title", e)}
                placeholder="ITS"
                value={cardSettings.title}
            />
            <TextField
                label="Summary"
                margin="normal"
                multiline
                onBlur={handleBlur}
                onChange={(e) => handleChange("summary", e)}
                placeholder="Lorem Ipsum"
                value={cardInfo.summary}
            />
            <FormControl component="fieldset">
                <FormLabel component="legend">
                    Card Features
                </FormLabel>
                <FormGroup>
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
                margin="normal"
                onBlur={handleBlur}
                onChange={(e) => handleChange("blogEmail", e)}
                placeholder="test@eckerd.edu"
                value={cardSettings.blogEmail}
            />
            <Forms formList={cardSettings.formList} setFormList={handleAddForm} />
            <List>
            {cardSettings.formList && cardSettings.formList.length !== '0' && cardSettings.formList.map((form, index) => {
                return (
                    <ListItem key={index}>
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
    cardInfo: PropTypes.object
};

export default DepartmentTemplateCardConfig;