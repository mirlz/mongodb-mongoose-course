const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user: users collection', () => {
    let joe; 

    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        joe.save().then(() => {
            done();
        })
    });

    it('model instance remove', (done) => {
        joe.remove()
            .then(() => {
                return User.findOne({ name: 'Joe'})
            }).then((user) => {
                assert(user === null);
                done();
            });
    });

    // collection's remove deprecated
    it('class method deleteMany', (done) => {
        User.deleteMany({ name: 'Joe'})
            .then(() => {
                return User.findOne({ name: 'Joe'})
            }).then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findOneAndRemove', (done) => {
        User.findOneAndRemove({ name: joe.name})
            .then(() => {
                return User.findOne({ name: 'Joe'})
            }).then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove({ _id: joe._id})
            .then(() => {
                return User.findOne({ _id: joe._id})
            }).then((user) => {
                assert(user === null);
                done();
            });
    });
});