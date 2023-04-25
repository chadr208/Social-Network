const { connect, connection } = require('mongoose');

connect('mongodb://localhost/social-challenge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
