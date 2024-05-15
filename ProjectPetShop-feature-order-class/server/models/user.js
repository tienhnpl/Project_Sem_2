
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Declare the Schema for temporary registration
const temporaryRegistrationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Export the temporary registration model
const TemporaryRegistration = mongoose.model('TemporaryRegistration', temporaryRegistrationSchema);

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    // Các trường thông tin người dùng
    firstname:{
                type:String,
                required:true,
            },
            lastname:{
                type:String,
                required:true,
            },
            email:{
                type:String,
                required:true,
                unique:true,
            },
            avatar:{
                type:String,
            },
            mobile:{
                type:String,
                required:true,
                unique:true
            },
            password:{
                type:String,
                required:true,
            },
            role:{
                type:String,
                enum: [1997,107297],
                default: 107297,
            },
            cart:[{
                product: {type: mongoose.Types.ObjectId, ref: 'Product'},
                quantity: Number,
                title: String,
                subcategory: String,
            }],
            address: String,
            wishlist:[{type: mongoose.Types.ObjectId, ref: 'Product'}],
            isBlocked: {
                type: Boolean,
                default: false
            },
            refreshToken: {
                type: String
            },
            passwordChangedAt: {
                type: String
            },
            passwordResetToken: {
                type: String
            },
            passwordResetExpires: {
                type: String
            },
            registerToken: {
                type: String
            }
            
}, {
    timestamps: true
});

// hash password
userSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password)
    },
    createPasswordChangedToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000
        return resetToken
    }
}

//Export the user model
const User = mongoose.model('User', userSchema);

module.exports = { User, TemporaryRegistration };
