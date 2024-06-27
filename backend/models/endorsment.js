const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    endName: { type: String },
    memName: { type: String },
    eidNo: { type: String },
    cardNo: { type: String },
    memType: { type: String },
    entryDate: { type: String },
    exitDate: { type: String },
    relation: { type: String },
    visaRegion: { type: String },
    validStatus: { type: String },
    uploadStatus: { type: String },
    endNo: { type: String },
    polNo: { type: String }
}, { collection: 'endorsment' });

const Model = mongoose.model('Endorsment', schema);

module.exports = Model;