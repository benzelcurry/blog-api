const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 16 },
  password: { type: String, required: true, maxLength: 100 },
  account_created: { type: Date, required: true },
  full_name: { type: String, required: false, maxLength: 100 },
  admin: { type: Boolean, required: true },
});

UserSchema.virtual('url').get(function() {
  return `/users/${this._id}`;
});

UserSchema.virtual('date_formatted').get(function() {
  return DateTime.fromJSDate(this.date_posted).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('User', UserSchema);