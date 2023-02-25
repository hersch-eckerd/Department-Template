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
    const [cardInfo, setCardInfo] = useState(customConfiguration ? customConfiguration.client : {
        title: '',
        summary: '',
        dirBool: false,
        blog: false,
        blogEmail: ''
    })
    const [formList, setFormList] = useState(null)

    useEffect(() => {
        setCustomConfiguration({
            customConfiguration: {
                client: {cardInfo, formList}
            }
        })
    }, [cardInfo, formList])

    const handleChange = (tabLabel, e) => {
        setCardInfo({
            ...cardInfo,
            [tabLabel]: e.target.value
         })
    }
    const handleSwitch = name => event => {
        const {checked} = event.target
        setCardInfo({
            ...cardInfo,
            [name]: checked
        })
    }
    const handleBlur = e => {
        setIsCustomConfigurationValid(e.target.value !== '');
    }

    return (
        <Grid container direction="column" justifyContent="space-between" alignItems="flex-start">
            <TextField
                label= "Title of Organization"
                margin="normal"
                onBlur={handleBlur}
                onChange={(e) => handleChange("title", e)}
                placeholder="ITS"
                value={cardInfo.title}
            />
            <TextField
                label="Summary of Organization"
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
                                checked={cardInfo.blog}
                                onChange={handleSwitch("blog")}
                                value={cardInfo.blog}
                            />
                        }
                        label="Show Blog?"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                id={`dirBool`}
                                checked={cardInfo.dirBool}
                                onChange={handleSwitch("dirBool")}
                                value={cardInfo.dirBool}
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
                    value={cardInfo.blogEmail}
                />
            <FormList formList = {formList} setFormList={setFormList} />
        </Grid>
    );
};

DepartmentTemplateCardConfig.propTypes = {
    cardControl: PropTypes.object,
    cardInfo: PropTypes.object
};

export default DepartmentTemplateCardConfig;