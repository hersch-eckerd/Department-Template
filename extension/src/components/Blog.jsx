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
    }
});
const Blog = () => {
    const {configuration : {customConfiguration}} = useCardInfo();
    const blogEmail = customConfiguration ? customConfiguration.cardSettings.blogEmail : 'default';
    // gets posts from wordpress based on user email
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        console.log("blog email is " + blogEmail)
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
            <ListItem key={post.id}>
                <TextLink href={post.link}
                    >{post.title.rendered}
                </TextLink>
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