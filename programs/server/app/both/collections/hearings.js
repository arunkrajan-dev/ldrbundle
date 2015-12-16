(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// both/collections/hearings.js                                        //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
this.Hearings = new Mongo.Collection("hearings");                      // 1
                                                                       //
this.Hearings.userCanInsert = function (userId, doc) {                 // 3
	return Users.isInRoles(userId, ["admin", "user"]);                    // 4
};                                                                     //
                                                                       //
this.Hearings.userCanUpdate = function (userId, doc) {                 // 7
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};                                                                     //
                                                                       //
this.Hearings.userCanRemove = function (userId, doc) {                 // 11
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=hearings.js.map
