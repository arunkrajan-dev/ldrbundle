(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// both/collections/caseprofile.js                                     //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
this.Caseprofile = new Mongo.Collection("caseprofile");                // 1
                                                                       //
this.Caseprofile.userCanInsert = function (userId, doc) {              // 3
	return Users.isInRoles(userId, ["admin", "user"]);                    // 4
};                                                                     //
                                                                       //
this.Caseprofile.userCanUpdate = function (userId, doc) {              // 7
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};                                                                     //
                                                                       //
this.Caseprofile.userCanRemove = function (userId, doc) {              // 11
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=caseprofile.js.map
