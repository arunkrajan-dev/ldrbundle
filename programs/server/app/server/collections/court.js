(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/collections/court.js                                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Court = new Meteor.Collection("Court");                                // 1
                                                                       //
//Court.insert({name:'Chennai High Court'});                           //
//Court.insert({name:'Madurai High Court'});                           //
//Court.insert({name:'Chennai civil Court'});                          //
//Court.insert({name:'Chennai Family Court'});                         //
                                                                       //
console.log("Court db" + JSON.stringify(Court.find().fetch(), null, 4));
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=court.js.map
