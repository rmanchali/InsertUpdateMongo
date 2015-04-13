
var mongoose =require ("mongoose");
mongoose.connect("mongodb://<connection>",
                 {user: "<user>", pass: "<password>"},
                 function(err) {if (err) { console.log('Connection Error ************: ',err);} });


//('mongodb://userAdmin:password@mongodb01-az1.development.tescloud.com:27017/registration');  

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	var args = process.argv[2];
	var username = process.argv[3] || 'testranjan';
	

	var identitySchema = mongoose.Schema({
	    firstName: String,
	    lastName: String,
	    identityId: String,
	    identification: { email: {original:String, indexed: String}, username: {original:String, indexed: String} }
	});


	var identityModel = mongoose.model('identities', identitySchema);


	if(args=='insert')
	{
		console.log('*******Inserting documents******');

		var newDoc = new identityModel({ firstName: username + 'First name',lastName: username + 'Lastname'
										,identityId: username + 'hjsadjasj-dsa-000-jdksak-kl', 
										identification: { email: {original: username + '@origemil', indexed: username + '@origemil'}
										,username: {original: username, indexed: username}} });

		newDoc.save(callback);
	}
	else if(args=='update')
	{
		var args2 = process.argv[3];
		console.log('*******Updating documents******');
		//db.identities.find({'identification.email.original':'hassy@yld.io'})
		//	{$or : [{'identification.username.original':'testranjan'},{'identification.username.original':'testranjan'}]}
		var query = { 'identification.username.original': username }
		  , update = { $inc: { visits: 1 }}
		  , options = { multi: true };

		identityModel.update(query, { $set: { 'identification.email.original': 'UpdatedEmail@ttt.com','identification.email.indexed': 'UpdatedEmail@ttt.com' }}, options, callback)

	}
	else if(args=='delete')
	{
		console.log('*******Deleting documents******');
		identityModel.remove({'identification.username.original': username}, callback)
	}
	else if(args=='view')
	{
		
		identityModel.findOne({ 'identification.username.original': username}, 'firstName lastName identification.email.original', function (err, identityModel) {
  		if (err) return callback;
  		
  		console.log('%s %s %s.', identityModel.firstName, identityModel.lastName, identityModel.identification.email.original) // Space Ghost is a talk show host.
	})
		
	}

	else
	{
		console.log('*******INVALID argument******');
	}

	function callback (err, numAffected) {
	  if (err) {
	      console.log('Errrror....Try Again',err);
	      process.exit(1);
	      return;
	  }
	  console.log('Number of rows affected=', numAffected);
	  process.exit(code=0);
	}
});







