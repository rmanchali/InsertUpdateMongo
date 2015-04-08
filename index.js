
var mongoose =require ("mongoose");
mongoose.connect('mongodb://mongodb01-az3.development.tescloud.com:27017/registration',
                 {user: 'registration_user', pass: 'SOh3TbYhxuLiW8ypJPxmt1oOfL'},
                 function(err) {if (err) { console.log('Connection Error ************: ',err);} });

//('mongodb://userAdmin:password@mongodb01-az1.development.tescloud.com:27017/registration');  

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	var args = process.argv[2];

	var identitySchema = mongoose.Schema({
	    firstName: String,
	    lastName: String,
	    identityId: String,
	    identification: { email: {original:String, index: String}, username: {original:String, index: String} }
	});

	var identityModel = mongoose.model('identities', identitySchema);


	if(args=='insert')
	{
		console.log('*******Inserting documents******');

		var newDoc = new identityModel({ firstName: 'First name',lastName: 'Lastname'
										,identityId:'hjsadjasj-dsajdksak-kl', 
										identification: { email: {original:'origemil', index: 'indexemail'}
										,username: {original:'testranjan', index: 'testranjan'}} });

		newDoc.save(callback);
	}
	else if(args=='update')
	{
		console.log('*******Updating documents******');
		//db.identities.find({'identification.email.original':'hassy@yld.io'})

		var query = { 'identification.username.original':'testranjan' }
		  , update = { $inc: { visits: 1 }}
		  , options = { multi: true };

		identityModel.update(query, { $set: { 'identification.email.original': 'UpdatedEmail@ttt.com','identification.email.indexed': 'UpdatedEmail@ttt.com' }}, options, callback)

	}
	else if(args=='delete')
	{
		console.log('*******Deleting documents******');
		identityModel.remove({'identification.username.original':'testranjan'}, callback)
	}
	else
	{
		console.log('*******INVALID argument******');
	}

	function callback (err, numAffected) {
	  if (err) {
	      console.log('Errrror....Try Again');
	      return;
	  }
	  console.log('Number of rows affected=', numAffected);
	}
});







