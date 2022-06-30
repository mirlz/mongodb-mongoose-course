const assert = require('assert');
const User = require('../src/user');

describe('updating records: users collection', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe', likes: 0 });
        joe.save().then(() => {
            done();
        })
    });

    function assertName(operation, name, done) {
        operation
            .then(() => {
                return User.find({});
            }).then((users) => {
                assert(users.length === 1);
                assert(users[0].name === name);
                done();
            })
    }

    it('instance type using set n save', (done) => {
        joe.set('name', 'Alex'); // only doing changes for the model, not saved to the db
        assertName(joe.save(), 'Alex', done);
    });

    // update function deprecated
    it('instance type updateOne', (done) => {
        assertName(joe.updateOne({'name': 'Hello Kitty'}), 'Hello Kitty', done);
    });

    // update function deprecated
    it('model updateMany', (done) => {
        assertName(
            User.updateMany({ name: 'Joe'}, { name: 'Alex'}), 
            'Alex', 
            done
        );
    });

    it('model findOneAndUpdate', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex'}), 
            'Alex', 
            done
        );
    });

    it('model findByIdAndUpdate', (done) => {
        assertName(
            User.findByIdAndUpdate({ _id: joe._id}, { name: 'Alex'}), 
            'Alex', 
            done
        );
    });

    it('a user can have their likes incremented by 1', (done) => {
        User.updateMany({ name: 'Joe'}, { $inc: { likes: 1} })
            .then(() => {
                return User.findOne({ name: 'Joe'})
            }).then((user) => {
                assert(user.likes === 1);
                done();
            });
    });
});