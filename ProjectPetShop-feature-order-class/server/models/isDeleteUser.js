const mongoose = require('mongoose');

const isDeleteUserSchema = new mongoose.Schema({
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deletedAt: {
        type: Date,
        default: Date.now
    },
    // Thêm các trường thông tin của người dùng bị xóa
    username: String,
    email: String,
    // Thêm các trường thông tin khác nếu cần
}, {
    timestamps: true
});

module.exports = mongoose.model('isDeleteUser', isDeleteUserSchema);
