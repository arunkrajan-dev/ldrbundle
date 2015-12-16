(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/publish/hearings.js                                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.publish("hearings", function (caseId) {                         // 1
	if (Users.isInRoles(this.userId, ["admin", "viewer"])) {              // 2
		return Hearings.find({ caseId: caseId }, {});                        // 3
	}                                                                     //
	return Hearings.find({ caseId: caseId, ownerId: this.userId }, {});   // 5
});                                                                    //
                                                                       //
Meteor.publish("hearings_empty", function () {                         // 8
	if (Users.isInRoles(this.userId, ["admin", "viewer"])) {              // 9
		return Hearings.find({ _id: "null" }, {});                           // 10
	}                                                                     //
	return Hearings.find({ _id: null, ownerId: this.userId }, {});        // 12
});                                                                    //
                                                                       //
Meteor.publish("hearing", function (hearingId) {                       // 15
	if (Users.isInRoles(this.userId, ["admin", "viewer"])) {              // 16
		return Hearings.find({ _id: hearingId }, {});                        // 17
	}                                                                     //
	return Hearings.find({ _id: hearingId, ownerId: this.userId }, {});   // 19
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=hearings.js.map
