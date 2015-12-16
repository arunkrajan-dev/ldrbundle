(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/server.js                                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
var verifyEmail = false;                                               // 1
                                                                       //
Accounts.config({ sendVerificationEmail: verifyEmail });               // 3
                                                                       //
Meteor.startup(function () {                                           // 5
                                                                       //
	// read environment variables from Meteor.settings                    //
	if (Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for (var variableName in babelHelpers.sanitizeForInObject(Meteor.settings.env)) {
			process.env[variableName] = Meteor.settings.env[variableName];      // 10
		}                                                                    //
	}                                                                     //
                                                                       //
	//                                                                    //
	// Setup OAuth login service configuration (read from Meteor.settings)
	//                                                                    //
	// Your settings file should look like this:                          //
	//                                                                    //
	// {                                                                  //
	//     "oauth": {                                                     //
	//         "google": {                                                //
	//             "clientId": "yourClientId",                            //
	//             "secret": "yourSecret"                                 //
	//         },                                                         //
	//         "github": {                                                //
	//             "clientId": "yourClientId",                            //
	//             "secret": "yourSecret"                                 //
	//         }                                                          //
	//     }                                                              //
	// }                                                                  //
	//                                                                    //
	if (Accounts && Accounts.loginServiceConfiguration && Meteor.settings && Meteor.settings.oauth && _.isObject(Meteor.settings.oauth)) {
		// google                                                            //
		if (Meteor.settings.oauth.google && _.isObject(Meteor.settings.oauth.google)) {
			// remove old configuration                                         //
			Accounts.loginServiceConfiguration.remove({                         // 36
				service: "google"                                                  // 37
			});                                                                 //
                                                                       //
			var settingsObject = Meteor.settings.oauth.google;                  // 40
			settingsObject.service = "google";                                  // 41
                                                                       //
			// add new configuration                                            //
			Accounts.loginServiceConfiguration.insert(settingsObject);          // 44
		}                                                                    //
		// github                                                            //
		if (Meteor.settings.oauth.github && _.isObject(Meteor.settings.oauth.github)) {
			// remove old configuration                                         //
			Accounts.loginServiceConfiguration.remove({                         // 49
				service: "github"                                                  // 50
			});                                                                 //
                                                                       //
			var settingsObject = Meteor.settings.oauth.github;                  // 53
			settingsObject.service = "github";                                  // 54
                                                                       //
			// add new configuration                                            //
			Accounts.loginServiceConfiguration.insert(settingsObject);          // 57
		}                                                                    //
		// linkedin                                                          //
		if (Meteor.settings.oauth.linkedin && _.isObject(Meteor.settings.oauth.linkedin)) {
			// remove old configuration                                         //
			Accounts.loginServiceConfiguration.remove({                         // 62
				service: "linkedin"                                                // 63
			});                                                                 //
                                                                       //
			var settingsObject = Meteor.settings.oauth.linkedin;                // 66
			settingsObject.service = "linkedin";                                // 67
                                                                       //
			// add new configuration                                            //
			Accounts.loginServiceConfiguration.insert(settingsObject);          // 70
		}                                                                    //
		// facebook                                                          //
		if (Meteor.settings.oauth.facebook && _.isObject(Meteor.settings.oauth.facebook)) {
			// remove old configuration                                         //
			Accounts.loginServiceConfiguration.remove({                         // 75
				service: "facebook"                                                // 76
			});                                                                 //
                                                                       //
			var settingsObject = Meteor.settings.oauth.facebook;                // 79
			settingsObject.service = "facebook";                                // 80
                                                                       //
			// add new configuration                                            //
			Accounts.loginServiceConfiguration.insert(settingsObject);          // 83
		}                                                                    //
		// twitter                                                           //
		if (Meteor.settings.oauth.twitter && _.isObject(Meteor.settings.oauth.twitter)) {
			// remove old configuration                                         //
			Accounts.loginServiceConfiguration.remove({                         // 88
				service: "twitter"                                                 // 89
			});                                                                 //
                                                                       //
			var settingsObject = Meteor.settings.oauth.twitter;                 // 92
			settingsObject.service = "twitter";                                 // 93
                                                                       //
			// add new configuration                                            //
			Accounts.loginServiceConfiguration.insert(settingsObject);          // 96
		}                                                                    //
		// meteor                                                            //
		if (Meteor.settings.oauth.meteor && _.isObject(Meteor.settings.oauth.meteor)) {
			// remove old configuration                                         //
			Accounts.loginServiceConfiguration.remove({                         // 101
				service: "meteor-developer"                                        // 102
			});                                                                 //
                                                                       //
			var settingsObject = Meteor.settings.oauth.meteor;                  // 105
			settingsObject.service = "meteor-developer";                        // 106
                                                                       //
			// add new configuration                                            //
			Accounts.loginServiceConfiguration.insert(settingsObject);          // 109
		}                                                                    //
	}                                                                     //
});                                                                    //
                                                                       //
Meteor.methods({                                                       // 116
	"createUserAccount": function (options) {                             // 117
		if (!Users.isAdmin(Meteor.userId())) {                               // 118
			throw new Meteor.Error(403, "Access denied.");                      // 119
		}                                                                    //
                                                                       //
		var userOptions = {};                                                // 122
		if (options.username) userOptions.username = options.username;       // 123
		if (options.email) userOptions.email = options.email;                // 124
		if (options.password) userOptions.password = options.password;       // 125
		if (options.profile) userOptions.profile = options.profile;          // 126
		if (options.profile && options.profile.email) userOptions.email = options.profile.email;
                                                                       //
		Accounts.createUser(userOptions);                                    // 129
	},                                                                    //
	"updateUserAccount": function (userId, options) {                     // 131
		// only admin or users own profile                                   //
		if (!(Users.isAdmin(Meteor.userId()) || userId == Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");                      // 134
		}                                                                    //
                                                                       //
		// non-admin user can change only profile                            //
		if (!Users.isAdmin(Meteor.userId())) {                               // 138
			var keys = Object.keys(options);                                    // 139
			if (keys.length !== 1 || !options.profile) {                        // 140
				throw new Meteor.Error(403, "Access denied.");                     // 141
			}                                                                   //
		}                                                                    //
                                                                       //
		var userOptions = {};                                                // 145
		if (options.username) userOptions.username = options.username;       // 146
		if (options.email) userOptions.email = options.email;                // 147
		if (options.password) userOptions.password = options.password;       // 148
		if (options.profile) userOptions.profile = options.profile;          // 149
                                                                       //
		if (options.profile && options.profile.email) userOptions.email = options.profile.email;
		if (options.roles) userOptions.roles = options.roles;                // 152
                                                                       //
		if (userOptions.email) {                                             // 154
			var email = userOptions.email;                                      // 155
			delete userOptions.email;                                           // 156
			userOptions.emails = [{ address: email }];                          // 157
		}                                                                    //
                                                                       //
		var password = "";                                                   // 160
		if (userOptions.password) {                                          // 161
			password = userOptions.password;                                    // 162
			delete userOptions.password;                                        // 163
		}                                                                    //
                                                                       //
		if (userOptions) {                                                   // 166
			Users.update(userId, { $set: userOptions });                        // 167
		}                                                                    //
                                                                       //
		if (password) {                                                      // 170
			Accounts.setPassword(userId, password);                             // 171
		}                                                                    //
	},                                                                    //
                                                                       //
	"sendMail": function (options) {                                      // 175
		this.unblock();                                                      // 176
                                                                       //
		//if (!Meteor.user())                                                //
		//throw new Meteor.Error(403, "User not logged in");                 //
                                                                       //
		//console.log("Send mail clicked " + JSON.stringify(options, null, 4));
		Email.send(options);                                                 // 182
	}                                                                     //
});                                                                    //
                                                                       //
Accounts.onCreateUser(function (options, user) {                       // 186
	console.log("on create user ");                                       // 187
	if (!user.roles) {                                                    // 188
		if (Meteor.users.find().count()) {                                   // 189
			user.roles = ["user"];                                              // 190
		} else {                                                             //
			console.log("Creating new admin user");                             // 192
			user.roles = ["admin"];                                             // 193
			return user;                                                        // 194
		}                                                                    //
	}                                                                     //
	console.log("user role: " + user.roles);                              // 197
                                                                       //
	//Allow admin to create new user                                      //
	if (Users.isInRoles(Meteor.userId(), ["admin"])) return user;         // 200
                                                                       //
	//If user is created through service, merge it to already             //
	//created account for the user by admin                               //
	if (user.services) {                                                  // 204
		var email = user.services["google"].email;                           // 205
                                                                       //
		if (!email) throw new Meteor.Error(403, "Email not found");          // 207
                                                                       //
		var existingUser = Meteor.users.findOne({ 'emails.address': email });
                                                                       //
		// see if any existing user has this email address, otherwise create new
		if (!existingUser) throw new Meteor.Error(403, "Please request admin to add your mail in user list");
                                                                       //
		// Remove existing user and create new account                       //
		Meteor.users.remove({ _id: existingUser._id }); // remove existing record
		return user; // record is re-inserted                                // 218
	}                                                                     //
});                                                                    //
                                                                       //
Accounts.validateLoginAttempt(function (info) {                        // 222
                                                                       //
	// reject users with role "blocked"                                   //
	if (info.user && Users.isInRole(info.user._id, "blocked")) {          // 225
		throw new Meteor.Error(403, "Your account is blocked.");             // 226
	}                                                                     //
                                                                       //
	if (verifyEmail && info.user && info.user.emails && info.user.emails.length && !info.user.emails[0].verified) {
		throw new Meteor.Error(499, "E-mail not verified.");                 // 230
	}                                                                     //
                                                                       //
	return true;                                                          // 233
});                                                                    //
                                                                       //
Users.before.insert(function (userId, doc) {                           // 237
	if (doc.emails && doc.emails[0] && doc.emails[0].address) {           // 238
		doc.profile = doc.profile || {};                                     // 239
		doc.profile.email = doc.emails[0].address;                           // 240
	} else {                                                              //
		// oauth                                                             //
		if (doc.services) {                                                  // 243
			// google e-mail                                                    //
			if (doc.services.google && doc.services.google.email) {             // 245
				doc.profile = doc.profile || {};                                   // 246
				doc.profile.email = doc.services.google.email;                     // 247
			} else {                                                            //
				// github e-mail                                                   //
				if (doc.services.github && doc.services.github.accessToken) {      // 250
					var github = new GitHub({                                         // 251
						version: "3.0.0",                                                // 252
						timeout: 5000                                                    // 253
					});                                                               //
                                                                       //
					github.authenticate({                                             // 256
						type: "oauth",                                                   // 257
						token: doc.services.github.accessToken                           // 258
					});                                                               //
                                                                       //
					try {                                                             // 261
						var result = github.user.getEmails({});                          // 262
						var email = _.findWhere(result, { primary: true });              // 263
						if (!email && result.length && _.isString(result[0])) {          // 264
							email = { email: result[0] };                                   // 265
						}                                                                //
                                                                       //
						if (email) {                                                     // 268
							doc.profile = doc.profile || {};                                // 269
							doc.profile.email = email.email;                                // 270
						}                                                                //
					} catch (e) {                                                     //
						console.log(e);                                                  // 273
					}                                                                 //
				} else {                                                           //
					// linkedin email                                                 //
					if (doc.services.linkedin && doc.services.linkedin.emailAddress) {
						doc.profile = doc.profile || {};                                 // 278
						doc.profile.name = doc.services.linkedin.firstName + " " + doc.services.linkedin.lastName;
						doc.profile.email = doc.services.linkedin.emailAddress;          // 280
					} else {                                                          //
						if (doc.services.facebook && doc.services.facebook.email) {      // 282
							doc.profile = doc.profile || {};                                // 283
							doc.profile.email = doc.services.facebook.email;                // 284
						} else {                                                         //
							if (doc.services.twitter && doc.services.twitter.email) {       // 286
								doc.profile = doc.profile || {};                               // 287
								doc.profile.email = doc.services.twitter.email;                // 288
							} else {                                                        //
								if (doc.services["meteor-developer"] && doc.services["meteor-developer"].emails && doc.services["meteor-developer"].emails.length) {
									doc.profile = doc.profile || {};                              // 291
									doc.profile.email = doc.services["meteor-developer"].emails[0].address;
								}                                                              //
							}                                                               //
						}                                                                //
					}                                                                 //
				}                                                                  //
			}                                                                   //
		}                                                                    //
	}                                                                     //
});                                                                    //
                                                                       //
Users.before.update(function (userId, doc, fieldNames, modifier, options) {
	if (modifier.$set && modifier.$set.emails && modifier.$set.emails.length && modifier.$set.emails[0].address) {
		modifier.$set.profile.email = modifier.$set.emails[0].address;       // 305
	}                                                                     //
});                                                                    //
                                                                       //
Accounts.onLogin(function (info) {});                                  // 309
                                                                       //
Accounts.urls.resetPassword = function (token) {                       // 313
	return Meteor.absoluteUrl('reset_password/' + token);                 // 314
};                                                                     //
                                                                       //
Accounts.urls.verifyEmail = function (token) {                         // 317
	return Meteor.absoluteUrl('verify_email/' + token);                   // 318
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=server.js.map
