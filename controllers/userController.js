const User = require('../models/User');

module.exports = {
  //returns all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // returns a single user by ID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      // shows complete friends and thoughts lists - not just IDs
      .populate("friends")
      .populate("thoughts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // creates new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // updates user by ID
  updateUser(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, {username: req.body.username, email: req.body.email}, { new: true})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
  },

  // deletes user by ID
  deleteUser(req, res) {
    User.findOneAndDelete({_id: req.params.userId})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
  },

  // adds friend ID to a given user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, { $addToSet: { friends: req.params.friendId } }, { new: true})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
  },

  // removes friend from user's list
  deleteFriend(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, { $pull: { friends: req.params.friendId } }, { new: true})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
  }
};
