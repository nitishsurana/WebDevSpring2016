/**
 * Created by Nitish on 4/11/2016.
 */
module.exports = function(mongoose){

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        fullName: String,
        email: String,
        phone: String,
        aboutMe: String,
        interestedInvestments: [String],
        followUsers: [String],
        followStocks: [String],
        roles: [String]
    }, {collection: 'projectUser'});
    return UserSchema;
};