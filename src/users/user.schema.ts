import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    confirmToken: {
        type: String,
    },
    confirmTokenExpiration: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
UserSchema.pre('save', function(next){

    let user = this;

    // Make sure not to rehash the password if it is already hashed
    if(!user.isModified('password')) return next();

    // Generate a salt and use it to hash the user's password
    bcrypt.genSalt(10, (err, salt) => {

        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {

            if(err) return next(err);
            user.password = hash;
            next();

        });

    });

}); 

UserSchema.methods.checkPassword =  async function(attempt, callback){

    let user = this;

 
const result =  await  bcrypt.compareSync(  attempt ,  user.pass);
  
if( result ) {
 

  // return  callback(null, true);
  return {isMatch : true , err : null}
}else {
 
   const err = {err : 'error code U.S.ts'}
  //  return callback(err);
  return {isMatch : false , err : 'error code U.S.ts'}

}
   
 

}