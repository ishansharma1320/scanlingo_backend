const dynamoose = require("../../dynamoose.config");
let tablename = "translations"
// Define the schema for your data

const translationObjectSchema = new dynamoose.Schema({
    type: {
        type: String,
        enum: ["Image", "Text"],
    },
    translation_id: String,
    created_at: Date,
    image: {
        type: Object,
        schema: {
            image_original_uri: String,
            image_thumbnail: {
                type: Array,
                schema: [{
                    type: Object, schema: {
                        size: Number, url: String
                    }
                }]
            }

        }


    },
    text: {
        type: Object,
        schema: {
            source: {
                type: Object,
                schema: {
                    utterance: String,
                    lang: String
                }
            },
            translated: {
                type: Object, schema: {
                    utterance: String,
                    lang: String,
                }
            }
        },

    },
    bookmark: {
        type: Boolean,
        default: false
    }

});

// Create a DynamoDB model using the schema
const Translation = dynamoose.model(tablename, translationObjectSchema);

module.exports.Translation = Translation;