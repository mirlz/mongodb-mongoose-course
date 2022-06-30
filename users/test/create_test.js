const assert = require('assert');
const User = require('../src/user');

describe('Creating records: users collection', () => {
    it('saves a user', (done) => {
        const joe = new User({
            name: 'Joe'
        });
        joe.save().then(() => {
            // has the record been saved successfully?
            assert(!joe.isNew);
            done();
        });
    });
});