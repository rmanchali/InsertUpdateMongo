var mongoose =require ("mongoose");

mongoose.connect('mongodb://userAdmin:userAdmin@mongodb01-az1.development.tescloud.com:27017/registration');  

var userModel = mongoose.model('identities');

//db.identities.find({"identityId" : "b193392d-cefa-4c9f-8f4a-53ae89ce88e9"})

var query = { identityId: 'b193392d-cefa-4c9f-8f4a-53ae89ce88e9' }
  , update = { $inc: { visits: 1 }}
  , options = { multi: true };

userModel.update(query, { $set: { email: 'newEmail' }}, options, callback)

function callback (err, numAffected) {
  if (err) {
      console.log('Errrror....Try Again');
      return;
  }
  console.log('Number of rows affected=', numAffected);
})



