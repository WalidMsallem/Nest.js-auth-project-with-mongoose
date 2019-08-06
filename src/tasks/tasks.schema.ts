import * as mongoose from 'mongoose';
 

export const TaskSchema = new mongoose.Schema({
    
    title: {
        type: String,
    //    unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    }
});
