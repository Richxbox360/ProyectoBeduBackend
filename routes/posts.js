const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


//GET BACK ALL THE POSTS
router.get('/', async (req,res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch(err) {
    res.json({message: err});
  }
})

router.get('/specific', (req,res) => {
  res.send('We are on specific');
});

//SUBMITS A POST
router.post('/', async (req,res) => {
  const post = new Post({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    domain: req.body.domain,
    problem: req.body.problem,
    description: req.body.description
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch(err) {
    res.json({message:err});
  };
});

//GET BACK AN SPECIFIC Post by ID
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json(err);
  }
});


//DELETE A Post
router.delete('/:postId', async (req,res) => {
  try {
    const removedPost = await Post.remove({_id: req.params.postId});
    res.json(removedPost);
  } catch (err) {
    res.json({message: err});
  }
})

//Update a post
router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      {_id: req.params.postId},
      {$set: {
        name: req.body.name,
        surname: req.body.surname      
      }}
    );
    res.json(updatedPost);
  } catch (err) {
    res.json(err);
  }
})


module.exports = router;
