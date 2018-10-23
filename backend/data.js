const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Structure de la BDD
const DataSchema = new Schema(
    {
        id: Number
        , message: String
    }
    , {
        timestamps: true
    }
);

//Export the new Schema, so we could modifiy it using NodeJs
module.exports = mongoose.model("Data", DataSchema);