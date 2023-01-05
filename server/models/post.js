const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
  title: { type: String, required: true, maxLength: 100 },
  content: { type: String, required: true, minLength: 1, maxLength: 10000 },
  date_posted: { type: Date, required: true },
  // Might need to pull Author info in a more manual way, we'll see
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Boolean, required: false },
});

PostSchema.virtual('url').get(function() {
  return `/posts/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);