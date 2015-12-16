(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/collections/hearings.js                                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Hearings.allow({                                                       // 1
	insert: function (userId, doc) {                                      // 2
		return Hearings.userCanInsert(userId, doc);                          // 3
	},                                                                    //
                                                                       //
	update: function (userId, doc, fields, modifier) {                    // 6
		return Hearings.userCanUpdate(userId, doc);                          // 7
	},                                                                    //
                                                                       //
	remove: function (userId, doc) {                                      // 10
		return Hearings.userCanRemove(userId, doc);                          // 11
	}                                                                     //
});                                                                    //
                                                                       //
Hearings.before.insert(function (userId, doc) {                        // 15
	doc.createdAt = new Date();                                           // 16
	doc.createdBy = userId;                                               // 17
	doc.modifiedAt = doc.createdAt;                                       // 18
	doc.modifiedBy = doc.createdBy;                                       // 19
	doc.calendarId = Random.hexString(25);                                // 20
                                                                       //
	if (!doc.ownerId) doc.ownerId = userId;                               // 23
});                                                                    //
                                                                       //
Hearings.before.update(function (userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};                                  // 27
	modifier.$set.modifiedAt = new Date();                                // 28
	modifier.$set.modifiedBy = userId;                                    // 29
});                                                                    //
                                                                       //
Hearings.before.remove(function (userId, doc) {});                     // 32
                                                                       //
Hearings.after.insert(function (userId, doc) {                         // 36
	//console.log("After insert Hearing: " + JSON.stringify(doc, null, 4));
	var cs = Caseprofile.findOne({ _id: doc.caseId }, {});                // 38
	console.log("Case Detail: " + JSON.stringify(cs, null, 4));           // 39
                                                                       //
	if (insertCalEvent(doc.calendarId, cs.caseId + " | Hearing", "Client: " + cs.clientName + "Previous Bussiness Notes:" + doc.description + "Purpose: " + doc.purpose, cs.court, doc.nextDate)) console.log("Event Added to google calendar");
});                                                                    //
                                                                       //
Hearings.after.update(function (userId, doc, fieldNames, modifier, options) {
	//console.log("After update Hearing: " + JSON.stringify(doc, null, 4));
	var cs = Caseprofile.findOne({ _id: doc.caseId }, {});                // 47
	console.log("Case Detail: " + JSON.stringify(cs, null, 4));           // 48
                                                                       //
	if (updateCalEvent(doc.calendarId, cs.caseId + " | Hearing", "Client: " + cs.clientName + "Previous Bussiness Notes:" + doc.description + "Purpose: " + doc.purpose, cs.court, doc.nextDate)) console.log("Event Added to google calendar");
});                                                                    //
                                                                       //
Hearings.after.remove(function (userId, doc) {                         // 54
	//console.log("After remove Hearing: " + JSON.stringify(doc, null, 4));
	if (removeCalEvent(doc.calendarId)) console.log("Event removed from google calendar");
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=hearings.js.map
