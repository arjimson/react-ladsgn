const mongoose = require('mongoose');
const Scehma = mongoose.Schema;

const SampleSchema = new Scehma({
    title: {
        type: String
    }
})

module.exports = Sample = mongoose.model('sample', SampleSchema);