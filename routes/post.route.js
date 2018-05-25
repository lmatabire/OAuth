module.exports = (app) => {
    const posts = require('../controllers/post.controller');

    // Create a new Note
    app.post('/posts', posts.create);

    // Retrieve all Notes
    app.get('/posts', posts.findAll);

    // Retrieve a single Note with noteId
    app.get('/posts/:postId', posts.findOne);

    // Update a Note with noteId
    app.put('/posts/:postsId', posts.update);

    // Delete a Note with noteId
    app.delete('/posts/:postsId', posts.delete);
}


