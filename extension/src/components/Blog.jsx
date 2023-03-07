import { withStyles } from '@ellucian/react-design-system/core/styles';
import axios from 'axios';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Tabs, Tab, TabLayout, TabLayoutContent, List, ListItem, TextLink } from '@ellucian/react-design-system/core';
import { useCardInfo, useData } from '@ellucian/experience-extension/extension-utilities';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';


const styles = () => ({
    card: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: 0,
        marginLeft: spacing40
    },
    BlogPost: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }
});
const Blog = ({classes}) => {

    const {configuration : {customConfiguration}} = useCardInfo();
    const blogEmail = customConfiguration ? customConfiguration.cardSettings.blogEmail : 'default';
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`https://wordpress.ban.eckerd.edu/wp-json/wp/v2/posts?author_email=${blogEmail}`)
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => {
            console.log(error);
            setPosts([]);
        });
    }, [blogEmail]);

    return (
        <List>
        {posts.map(post => (
            <ListItem className={classes.BlogPost} key={post.id} divider>
                <Typography variant="h4">
                    <TextLink href={post.link}>
                        {post.title.rendered}
                    </TextLink>
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </ListItem>
        ))}
        </List>
    );
};

Blog.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Blog);