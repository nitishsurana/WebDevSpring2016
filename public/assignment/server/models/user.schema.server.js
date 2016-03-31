/**
 * Created by Nitish on 3/29/2016.
 */
module.exports = function(mongoose){

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String]
    }, {collection: 'user'});
    //console.log("User  Schema");
    //console.log(UserSchema);
    return UserSchema;
};