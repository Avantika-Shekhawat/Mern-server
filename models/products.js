import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    Pname : {
        type: String,
        required: true,
        trim: true
    },
    Pcategory: {
        type:String,
        required:true
    },
    Price:
    {
        type:Number,
        required:true,
        min:0
    },
    Stock:{
        type:Number,
        default:0,
        min:0
    },
    Status:{
        type:Boolean,
        required:true,
        default:true
    },
    Pdescription:{
        type:String
    },
    Imageurl:{
        type:String,
        required:true,
        default:''
    }

}, { timestamps: true });

const products = mongoose.model('products',ProductSchema);
export default products;