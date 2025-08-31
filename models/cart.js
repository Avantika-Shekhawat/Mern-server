import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:true
    },
    ProductId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
    },
    Quantity:{
        type:Number,
        default:1,
    }
},{timestamps:true});

export default mongoose.model('carts',cartSchema);