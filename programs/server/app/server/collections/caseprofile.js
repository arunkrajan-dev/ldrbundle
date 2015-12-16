(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/collections/caseprofile.js                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Caseprofile.allow({                                                    // 1
	insert: function (userId, doc) {                                      // 2
		return Caseprofile.userCanInsert(userId, doc);                       // 3
	},                                                                    //
                                                                       //
	update: function (userId, doc, fields, modifier) {                    // 6
		return Caseprofile.userCanUpdate(userId, doc);                       // 7
	},                                                                    //
                                                                       //
	remove: function (userId, doc) {                                      // 10
		return Caseprofile.userCanRemove(userId, doc);                       // 11
	}                                                                     //
});                                                                    //
                                                                       //
Caseprofile.before.insert(function (userId, doc) {                     // 15
	doc.createdAt = new Date();                                           // 16
	doc.createdBy = userId;                                               // 17
	doc.modifiedAt = doc.createdAt;                                       // 18
	doc.modifiedBy = doc.createdBy;                                       // 19
	doc.calendarId = Random.hexString(25);                                // 20
                                                                       //
	if (!doc.ownerId) doc.ownerId = userId;                               // 23
	if (!doc.totalAmount) doc.totalAmount = 0;                            // 24
});                                                                    //
                                                                       //
Caseprofile.before.update(function (userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};                                  // 28
	modifier.$set.modifiedAt = new Date();                                // 29
	modifier.$set.modifiedBy = userId;                                    // 30
});                                                                    //
                                                                       //
Caseprofile.before.remove(function (userId, doc) {});                  // 35
                                                                       //
Caseprofile.after.insert(function (userId, doc) {                      // 39
	console.log("After insert case profile: " + JSON.stringify(doc, null, 4));
	if (insertCalEvent(doc.calendarId, doc.caseId + " | Filing", "Client: " + doc.clientName, doc.court, doc.filingDate)) console.log("Event Added to google calendar");
});                                                                    //
                                                                       //
Caseprofile.after.update(function (userId, doc, fieldNames, modifier, options) {
	console.log("After update case profile: " + JSON.stringify(doc, null, 4));
	if (updateCalEvent(doc.calendarId, doc.caseId + " | Filing", "Client: " + doc.clientName, doc.court, doc.filingDate)) console.log("Event updated in google calendar");
});                                                                    //
                                                                       //
Caseprofile.after.remove(function (userId, doc) {                      // 51
	//console.log("After remove case profile: " + JSON.stringify(doc, null, 4));
	if (removeCalEvent(doc.calendarId)) console.log("Event removed from google calendar");
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=caseprofile.js.map
