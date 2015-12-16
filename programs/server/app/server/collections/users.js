(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/collections/users.js                                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Users.allow({                                                          // 1
  remove: function (userId, doc) {                                     // 2
    return Users.userCanRemove(userId, doc);                           // 3
  }                                                                    //
});                                                                    //
                                                                       //
//Accounts.validateNewUser(function(user){                             //
//  console.log ("Validate " + user);                                  //
// if(Users.isInRoles(Meteor.userId(), ["admin"])) return user;        //
// throw new Meteor.Error(403, "User is not in admin list");           //
//});                                                                  //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=users.js.map
