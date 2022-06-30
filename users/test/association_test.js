const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('associations', () => {
    let joe, blogPost, comment; 

    beforeEach(() => {
        joe = new User({ name: 'Joe'});
        blogPost = new BlogPost({ title: 'JS is great', content: 'Uh huh'});
        comment = new Comment({ content: 'weeeeeee' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;
    });
});