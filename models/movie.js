const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    type: Number,
    required: true
  },
  year: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www\.)?([\w\W\d]+)(\.)([a-z]{1,10})([\w\W\d]+)?$/.test(v);
      },
      message: (props) => `${props.value} не является валидной ссылкой!`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www\.)?([\w\W\d]+)(\.)([a-z]{1,10})([\w\W\d]+)?$/.test(v);
      },
      message: (props) => `${props.value} не является валидной ссылкой!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www\.)?([\w\W\d]+)(\.)([a-z]{1,10})([\w\W\d]+)?$/.test(v);
      },
      message: (props) => `${props.value} не является валидной ссылкой!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true
  },
  nameEN: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('card', movieSchema);
