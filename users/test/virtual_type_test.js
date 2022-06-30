const assert = require('assert');
const User = require('../src/user');

describe('virtual types: users collection', () => {
    it('postCount returns number of posts', (done) => {
        const joe = new User({ 
            name: 'Joe',
            posts: [{ title: 'some shit'}]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then(() => {
                assert(joe.postCount === 1);
                done();
            })
    });
});