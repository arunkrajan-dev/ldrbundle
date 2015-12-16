(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/publish/caseprofile.js                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.publish("caseprofile_list", function () {                       // 1
	if (Users.isInRoles(this.userId, ["admin", "viewer"])) {              // 2
		return Caseprofile.find({}, { sort: [["caseId", "desc"]] });         // 3
	}                                                                     //
	return Caseprofile.find({ ownerId: this.userId }, { sort: [["caseId", "desc"]] });
});                                                                    //
                                                                       //
Meteor.publish("caseprofile_empty", function () {                      // 8
	if (Users.isInRoles(this.userId, ["admin", "viewer"])) {              // 9
		return Caseprofile.find({ _id: null }, {});                          // 10
	}                                                                     //
	return Caseprofile.find({ _id: null, ownerId: this.userId }, {});     // 12
});                                                                    //
                                                                       //
Meteor.publish("caseprofile_details", function (caseId) {              // 15
	if (Users.isInRoles(this.userId, ["admin", "viewer"])) {              // 16
		return Caseprofile.find({ _id: caseId }, {});                        // 17
	}                                                                     //
	return Caseprofile.find({ _id: caseId, ownerId: this.userId }, {});   // 19
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=caseprofile.js.map
