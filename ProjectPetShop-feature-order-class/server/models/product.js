const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
    description:{
        type:Array,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subcategories: {
        type: Array,
        required:true
    },
    discount:{
        type:Number,
        required:false,
    },
    quantity:{
        type:Number,
        default:0
    },
    sold:{
        type:Number,
        default:0
    },
    thumb: {
        type:String
    },
    images:{
        type:Array
    },
    // color:{
    //     type:String,
    //     require: true
    // },
    ratings: [
        {
            star: { type: Number },
            postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
            comment: { type: String },
            updatedAt: {type: Date}
        }
    ],
    totalRatings: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);