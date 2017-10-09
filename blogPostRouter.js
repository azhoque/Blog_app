const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

//going to add BlogPostss to Blog, so there's some data look at 
BlogPosts.create(
    'blog 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus sagittis semper. Donec ac suscipit sapien. Pellentesque in consequat nunc, a porta tellus. Nunc et bibendum est. Nam et ligula commodo, condimentum enim nec, eleifend eros. Pellentesque quis leo at ex pretium convallis.', 'Aziz Hoque', 1
);
BlogPosts.create(
    'blog 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus sagittis semper. Donec ac suscipit sapien. Pellentesque in consequat nunc, a porta tellus. Nunc et bibendum est. Nam et ligula commodo, condimentum enim nec, eleifend eros. Pellentesque quis leo at ex pretium convallis.', 'Karsten Johnson', 2
);

//send back JSON representation of all blogs on GET to root
router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

//when new blog is added, ensure has required fields. if not, lof error and return 400 code with helpful message. otherwise, and new item and return with status 201
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author']
    for(let i = 0; i < requiredFields.length; i++){
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in blog body`
            console.error (message);
            return res.status(400).send(message);
        }
    }
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.id);
    res.status(201).json(item);
});

//delete blog-post by id
router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Delete blog post\`${req.params.ID}\``);
    res.status(204).end(); 
});

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'id'];
    for (let i = 0; i < requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)){
            const message = `Misiing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if(req.params.id !== req.body.id){
        const message = `Request path id \`${req.params.id}\` and request body id \`${req.body.id}\` must match`
        console.error(message);
        return res.staus(400).send(message);
    }
    console.log(`Updating blog post \`${req.params.id}\``);
    const updatedItem = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        author: req.body.author
    })
    res.status(204).end();
});
module.exports = router;
