const { config } = require("dotenv");
const mongoose = require("mongoose");

const configurationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /[^><?=]+/.test(v);
            }
        }
    },
    config:{
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

const DBSchema = mongoose.Schema({
    microfrontendName: {
        type: String,
        enum: ["ekgview", "radarview", "rectanglemappingview"]
    },
    configurations: {
        type : [configurationSchema]
    }
});

const DB = new mongoose.model('DB', DBSchema);

module.exports = DB;