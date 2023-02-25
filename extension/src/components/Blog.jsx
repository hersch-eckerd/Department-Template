import { withStyles } from '@ellucian/react-design-system/core/styles';
import axios from 'axios';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Tabs, Tab, TabLayout, TabLayoutContent, List, ListItem } from '@ellucian/react-design-system/core';
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
    const blogEmail = customConfiguration ? customConfiguration.cardInfo.blogEmail : null;
    // gets posts from wordpress based on user email
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`https://wordpress.ban.eckerd.edu/wp-json/wp/v2/posts?author_email=${blogEmail}`)
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [blogEmail]);
    return (
        <div>
        {posts.map(post => (
            <div key={post.id}>
            <h2>{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </div>
        ))}
        </div>
    );
};

Blog.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Blog);