const { Schema, model } = require('mongoose');

// Defines user schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    // Validates email format
    email: { type: String, required: true, unique: true, trim: true, match: /.+\@.+\..+/, },
    // Defines list of thought and friend IDs linked to relevant objects
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Return friend count for array. 
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
