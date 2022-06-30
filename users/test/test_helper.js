const mongoose = require('mongoose');

before((done) => {
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .once('open', () => {
            console.log('connected to mongodb');
            done();
        })
        .on('error', (err)=> {
            console.warn('error: ', err);
        });
})

beforeEach((done) => {
    // const { users, comments, blogposts} = mongoose.connection.collections;

    // users.drop(() => {
    //     comments.drop(() => {
    //         blogposts.drop(() => {
    //             done();
    //         });
    //     });
    // });

    mongoose.connection.db.dropDatabase(() => {
        done();
    });
});