const router = ('router');
const { Post, User } = require('../../models');

// get all users,  route that will retrieve all posts in the database
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'post_url', 'title', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;