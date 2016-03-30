/**
 * Created by Nitish on 3/29/2016.
 */

var FieldSchema = require('./field.schema.server');
module.exports = function(mongoose){
    var FormSchema = mongoose.Schema({
        userId: String,
        title: {type: String, default: 'New Form'},
        fields: [FieldSchema],
        created: {type: Date, default: Date.now()},
        updated: {type: Date, default: Date.now()}
    }, {collection: 'form'});
    return FormSchema;
};