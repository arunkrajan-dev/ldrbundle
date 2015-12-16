(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// both/collections/users.js                                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
this.Users.userCanRemove = function (userId, doc) {                    // 1
	return Users.isInRoles(userId, ["admin"]);                            // 2
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=users.js.map
