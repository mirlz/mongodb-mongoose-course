const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('associations', () => {
    let joe, blogPost, comment; 

    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        blogPost = new BlogPost({ title: 'JS is great', content: 'Uh huh'});
        comment = new Comment({ content: 'weeeeeee' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([
            joe.save(),
            blogPost.save(),
            comment.save()
        ]).then(() => {
            done();
        })
    });

    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Joe' })
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is great');
                done();
            })
    })
});