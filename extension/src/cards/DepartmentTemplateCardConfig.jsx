import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, Switch, FormControlLabel, FormControl, FormGroup, FormLabel, FormHelperText } from '@ellucian/react-design-system/core';
import FormList from '../components/FormList.jsx';

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
    const [settings, setSettings] = useState(customConfiguration ? customConfiguration.client : {
        title: '',
        summary: '',
        dirBool: false,
        blog: false
    })
    const [formList, setFormList] = useState([])

    useEffect(() => {
        setCustomConfiguration({
            customConfiguration: {
                client: {settings, formList}
            }
        })
    }, [settings, formList])

    const handleChange = (tabLabel, e) => {
        setSettings({
            ...settings,
            [tabLabel]: e.target.value
         })
    }
    const handleSwitch = name => event => {
        setSettings({
            ...settings,
            [name]: event.target.checked
        })
    }
    const handleBlur = e => {
        setIsCustomConfigurationValid(e.target.value !== '');
    }

    return (
        <Grid container direction="column" justifyContent="space-around" alignItems="flex-start" >
            <Grid item >
                <TextField
                    label= "Title of Organization"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={(e) => handleChange("title", e)}
                    placeholder="ITS"
                    value={settings.title}
                />
                <TextField
                    label="Summary of Organization"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={(e) => handleChange("summary", e)}
                    placeholder="Lorem Ipsum"
                    value={settings.summary}
                />
            </Grid>
            <FormControl component="fieldset">
                <FormLabel component="legend">
                    Card Features
                </FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                id={`blogSwitch`}
                                checked={settings.blog}
                                onChange={handleSwitch("blog")}
                                value="blog"
                            />
                        }
                        label="Show Blog?"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                id={`dirBool`}
                                checked={settings.dirBool}
                                onChange={handleSwitch("dirBool")}
                                value="dirBool"
                            />
                        }
                        label="Show Directory?"
                    />
                </FormGroup>
            </FormControl>
            <Grid item><FormList setFormList={setFormList} /></Grid>
        </Grid>
    );
};

DepartmentTemplateCardConfig.propTypes = {
    cardControl: PropTypes.object,
    cardInfo: PropTypes.object
};

export default DepartmentTemplateCardConfig;