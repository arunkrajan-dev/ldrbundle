(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/lib/calendar.js                                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
this.insertCalEvent = function (id, s, d, l, sd, ed) {                 // 2
  var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
  console.log("Giigke cakebder ubser event");                          // 4
  try {                                                                // 5
    Meteor.http.post(url, {                                            // 6
      'headers': {                                                     // 7
        'Authorization': "Bearer " + Meteor.user().services.google.accessToken,
        'Content-Type': 'application/json'                             // 9
      },                                                               //
      'data': {                                                        // 11
        "id": id.toLowerCase(),                                        // 12
        "summary": "Ldr:" + s,                                         // 13
        "description": d,                                              // 14
        "location": l,                                                 // 15
        "start": {                                                     // 16
          "dateTime": moment(sd).format("YYYY-MM-DDTHH:mm:ssZ")        // 17
        },                                                             //
        "end": {                                                       // 19
          "dateTime": moment(sd).format("YYYY-MM-DDTHH:mm:ssZ")        // 20
        }                                                              //
      }                                                                //
    });                                                                //
  } catch (e) {                                                        //
    console.log("Error in calendar insert: " + e);                     // 25
  } finally {                                                          //
    return true;                                                       // 27
  }                                                                    //
};                                                                     //
                                                                       //
this.updateCalEvent = function (id, s, d, l, sd, ed) {                 // 31
  var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events/" + id.toLowerCase();
  console.log("google calender update event " + url);                  // 33
  try {                                                                // 34
    Meteor.http.put(url, {                                             // 35
      'headers': {                                                     // 36
        'Authorization': "Bearer " + Meteor.user().services.google.accessToken,
        'Content-Type': 'application/json'                             // 38
      },                                                               //
      'data': {                                                        // 40
        //"id":id.toLowerCase(),                                       //
        "summary": "LDR:" + s,                                         // 42
        "description": d,                                              // 43
        "location": l,                                                 // 44
        "start": {                                                     // 45
          "dateTime": moment(sd).format("YYYY-MM-DDTHH:mm:ssZ")        // 46
        },                                                             //
        "end": {                                                       // 48
          "dateTime": moment(sd).format("YYYY-MM-DDTHH:mm:ssZ")        // 49
        }                                                              //
      }                                                                //
    });                                                                //
  } catch (e) {                                                        //
    console.log("Error in calendar update: " + e);                     // 54
  } finally {                                                          //
    return true;                                                       // 56
  }                                                                    //
};                                                                     //
                                                                       //
this.removeCalEvent = function (id) {                                  // 61
  var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events/" + id.toLowerCase();
  console.log("google calender remove event " + url);                  // 63
  try {                                                                // 64
    Meteor.http.del(url, {                                             // 65
      'headers': {                                                     // 66
        'Authorization': "Bearer " + Meteor.user().services.google.accessToken,
        'Content-Type': 'application/json'                             // 68
      }                                                                //
    });                                                                //
    return true;                                                       // 71
  } catch (e) {                                                        //
    console.log("Error in reomve calendar event: " + e);               // 73
  } finally {                                                          //
    return true;                                                       // 75
  }                                                                    //
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=calendar.js.map
