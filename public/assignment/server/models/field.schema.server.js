/**
 * Created by Nitish on 3/29/2016.
 */
module.exports = function(mongoose){

    var FieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [{
            label: String,
            value: String
        }]
    },{collection : 'fields'});

    return FieldSchema;
};