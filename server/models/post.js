const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const PostSchema = new Schema ({
  title: { type: String, required: true, maxLength: 100 },
  content: { type: String, required: true, minLength: 1, maxLength: 10000 },
  date_posted: { type: Date, required: true },
  updated: { type: Date, required: false },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Boolean, required: false },
});

PostSchema.virtual('url').get(function() {
  return `/posts/${this._id}`;
});

PostSchema.virtual('date_formatted').get(function() {
  return DateTime.fromJSDate(this.date_posted).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Post', PostSchema);