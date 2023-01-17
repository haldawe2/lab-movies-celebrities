const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const Schema = moongose.Schema;
mongoose.set('strictQuery', true);

const movieSchema = new Schema ({
    title: {type: String},
    genre: {type: String},
    plot: {type: String},
    cast: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;