const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const Schema = moongose.Schema;
mongoose.set('strictQuery', true);

const celebritySchema = new Schema ({
    name: {type: String},
    occupation: {type: String},
    catchPhrase: {type: String}
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;