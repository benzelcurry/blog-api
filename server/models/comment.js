const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const CommentSchema = new Schema({
  content: { type: String, required: true, maxLength: 500 },
  date_posted: {type: Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parent_post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

CommentSchema.virtual('url').get(function() {
  return `/comments/${this._id}`;
});

CommentSchema.virtual('date_formatted').get(function () {
  return DateTime.fromJSDate(this.date_posted).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Comment', CommentSchema);