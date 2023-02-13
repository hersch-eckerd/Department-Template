import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@ellucian/react-design-system/core';

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

    const client = customConfiguration ? customConfiguration.client : undefined;
    const [markdown, setMarkdown] = React.useState(client ? client.markdown : '');

    const handleChange = e => {
        const { value } = e.target;

        setMarkdown(value);
        setCustomConfiguration({
            customConfiguration: {
                client: {
                    markdown: value
                }
            }
        });
    };

    const handleBlur = e => {
        setIsCustomConfigurationValid(e.target.value !== '');
    };

    return (
        <Grid>
            <TextField
            label="Comments"
            margin="normal"
            multiline
            name="multiline"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Let us know what you think!"
            value={markdown}
            fullWidth
            />
        </Grid>
    );
};

DepartmentTemplateCardConfig.propTypes = {
    cardControl: PropTypes.object,
    cardInfo: PropTypes.object
};

export default DepartmentTemplateCardConfig;