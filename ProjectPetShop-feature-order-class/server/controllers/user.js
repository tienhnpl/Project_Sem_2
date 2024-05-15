const {User, TemporaryRegistration} = require('../models/user')
const asyncHandler = require('express-async-handler')
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt')
const { use } = require('../routes/user')
const jwt = require('jsonwebtoken')
const sendMail = require('../ultils/sendMail')
const crypto = require('crypto')
const makeToken = require('uniqid')
const IsDeleteUser = require('../models/isDeleteUser'); 
const path = require('path')

// const register = asyncHandler(async(req, res) => {
//     const {email, password, firstname, lastname} = req.body
//     if (!email || !password || !firstname || !lastname)
//     return res.status(400).json({
//         success: false,
//         mes: 'Missing inputs'
// })

//     const user = await User.findOne({email})
//     if (user) throw new Error('User has existed')
//     else {
//         const newUser = await User.create(req.body)
//         return res.status(200).json({
//             success: newUser ? true : false,
//             mes: newUser ? 'Register is successfully. Please go login~' : 'Something went wrong'
//         })
//     }
   
// })

const register = asyncHandler(async(req, res) => {
    const { email, password, firstname, lastname, mobile} = req.body
    if (!email || !password || !firstname || !lastname || !mobile)
    return res.status(400).json({
        success: false,
        mes: 'Missing inputs'
    })

    const token = makeToken(); // Tạo token tạm thời
    const userData = { email, password, firstname, lastname, mobile, token };

    // Lưu thông tin đăng ký vào cơ sở dữ liệu
    await TemporaryRegistration.create(userData);

    const html = `Xin vui lòng click vào link dưới đây để hoàn tất quá trình đăng ký. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/finalregister/${token}>Click here</a>`;
    await sendMail({ email, html, subject: 'Hoàn tất đăng ký Pet Village' });

    // Xóa cookie tạm thời
    res.clearCookie('dataregister');

    return res.json({
        success: true,
        mes: 'Hãy kiểm tra gmail của bạn'
    });
});

const finalRegister = asyncHandler(async(req, res) => {
    const { token } = req.params;
    
    // Tìm thông tin đăng ký tạm thời dựa trên token
    const temporaryRegistration = await TemporaryRegistration.findOne({ token });

    if (!temporaryRegistration) {
        return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
    }

    // Thực hiện đăng ký tài khoản từ thông tin tạm thời
    const newUser = await User.create({
        email: temporaryRegistration.email,
        password: temporaryRegistration.password,
        mobile: temporaryRegistration.mobile,
        firstname: temporaryRegistration.firstname,
        lastname: temporaryRegistration.lastname
    });

    if (newUser) {
        // Xóa thông tin đăng ký tạm thời từ cơ sở dữ liệu
        await TemporaryRegistration.deleteOne({ token });

        // Xóa cookie tạm thời
        res.clearCookie('dataregister');

        return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`);
    } else {
        // Xóa cookie tạm thời
        res.clearCookie('dataregister');
        
        return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
    }
});

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if (!email || !password)
    return res.status(400).json({
        success: false,
        mes: 'Missing inputs'
})

 // plain object
 const response = await User.findOne({ email })
 if (response && await response.isCorrectPassword(password)) {
     // Tách password và role ra khỏi response
     const { password, role, refreshToken, ...userData } = response.toObject()
     // Tạo access token
     const accessToken = generateAccessToken(response._id, role)
     // Tạo refresh token
     const newRefreshToken = generateRefreshToken(response._id)
     // Lưu refresh token vào database
     await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
     // Lưu refresh token vào cookie
     res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
     return res.status(200).json({
         success: true,
         accessToken,
         userData
     })
    }else {
        throw new Error('Invalid credentials')
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const uid = req.params.uid;
    const user = await User.findById(uid);
    if (!user) {
        return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
    }
    
    // Tạo một bản ghi mới trong schema IsDeleteUser
    const isDeletedUser = new IsDeleteUser({
        isDeleted: true,
        deletedBy: req.user._id,
        deletedAt: new Date(),
        username: user.firstname, // Lấy thông tin username từ người dùng bị xóa
        email: user.email,
        mobile: user.mobile
    });
    await isDeletedUser.save();
    
    // Xóa người dùng từ bảng User
    await User.findByIdAndDelete(uid);
    
    return res.status(200).json({ success: true, mes: 'Người dùng đã được tạm ẩn', deletedUser: isDeletedUser });
});


const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password ').populate({
        path: 'cart',
        populate: {
            path: 'product',
            select: 'title thumb price discount'
        }
    })
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'User not found'
    })
})
const refreshAccessToken = asyncHandler(async (req, res) => {
    // Lấy token từ cookies
    const cookie = req.cookies
    // Check xem có token hay không
    if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // Check token có hợp lệ hay không
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken })
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched'
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // Xóa refresh token ở db
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })
    // Xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: 'Logout is done'
    })
})
// Client gửi email
// Server check email có hợp lệ hay không => Gửi mail + kèm theo link (password change token)
// Client check mail => click link
// Client gửi api kèm token
// Check token có giống với token mà server gửi mail hay không
// Change password

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) throw new Error('Missing email')
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`

    const data = {
        email,
        html,
        subject: 'Forgot password'
    }
    const rs = await sendMail(data)
    return res.status(200).json({
        success: rs.response?.includes('OK')? true : false,
        mes: rs.response?.includes('OK') ? 'Hãy check mail của bạn' : 'Đã có lỗi, Hãy thử lại'
    })
})
const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error('Missing imputs')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Updated password' : 'Something went wrong'
    })
})
const getUsers = asyncHandler(async (req, res) => {   
    const queries = {...req.query}
    //Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])

    // Format lại các operators cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, macthedEl => `$${macthedEl}`)
    const formatedQueries = JSON.parse(queryString)  
    

    //Filtering
    if (queries?.name) formatedQueries.name = {$regex: queries.name, $options: 'i'}
    // const query = {}
    // if (req.query.q) {
    //     query = {$or : [
    //         {name : {$regex: req.query.q, $options: 'i'}},
    //         {email : {$regex: req.query.q, $options: 'i'}}
    //     ]}
    // }
    delete formatedQueries.q

    if (req.query.q) {
        formatedQueries['$or'] = [
            {firstname : {$regex: req.query.q, $options: 'i'}},
            {lastname : {$regex: req.query.q, $options: 'i'}},
            {email : {$regex: req.query.q, $options: 'i'}}
        ]
    }

    
    let queryCommand = User.find(formatedQueries)

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }

    // Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }

    // Pagination
    // limit: số object lấy về 1 lần gọi API
    //skip: 2
    // 1 2 3 ... 10
    //+2 => 2
    //+aìdszd => NaN
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page -1) * limit
    queryCommand.skip(skip).limit(limit)
    // Thực thi query
    const response = await queryCommand;

    
    // Execute query
    // Số lượng sản phẩm thỏa mản điều kiện !== số lượng sản phẩm trả về 1 lần gọi API
    const counts = await User.find(formatedQueries).countDocuments()
    return res.status(200).json({
        success: response ? true : false,
        counts,
        users: response ? response : 'Cannot get products',
    });
})
// const deleteUser = asyncHandler(async (req, res) => {
//     const { uid } = req.params
//     const response = await User.findByIdAndDelete(uid)
//     return res.status(200).json({
//         success: response ? true : false,
//         mes: response ? `Đã xóa người dùng ${response.email}` : 'Không thể xóa'
//     })
// })
const updateUser = asyncHandler(async (req, res) => {
    // 
    const { _id } = req.user
    const {firstname, lastname, email, monile, address} = req.body
    const data = {firstname, lastname, email, monile, address}
    if (req.file) data.avatar = req.file.path
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(_id, data, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Cập nhật thành công' : 'Đã xảy ra lỗi'
    })
})
const updateUserByAdmin = asyncHandler(async (req, res) => {
    // 
    const { uid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Cập nhật thành công' : 'Đã xảy ra lỗi'
    })
})
const updateUserAddress = asyncHandler(async (req, res) => {
    // 
    const { _id } = req.user
    if (!req.body.address) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(_id, {$push: {address: req.body.address}}, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})
const updateCart = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user; // Lấy ID của người dùng từ yêu cầu
        const { pid, quantity = 1, subcategory, title } = req.body; // Lấy thông tin từ thân yêu cầu

        if (!pid || !subcategory ) throw new Error('Thiếu thông tin đầu vào'); // Kiểm tra thông tin đầu vào
        if (quantity <= 0) throw new Error('Số lượng phải là số nguyên dương'); // Kiểm tra số lượng

        const user = await User.findById(_id).select('cart'); // Tìm người dùng theo ID và chỉ chọn giỏ hàng
        const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid); // Kiểm tra sản phẩm đã có trong giỏ hàng

        let response;

        if (alreadyProduct) {
            response = await User.updateOne(
                { _id, "cart.product": pid }, // Điều kiện cập nhật
                {
                    $set: {
                        "cart.$.quantity": quantity,
                        "cart.$.title": title,
                        "cart.$.subcategory": subcategory,
                    }
                },
                { new: true }
            );
        } else {
            response = await User.findByIdAndUpdate(
                _id,
                { $push: { cart: { product: pid, quantity, subcategory, title } } },
                { new: true }
            );
        }

        const updatedUser = await User.findById(_id).select('cart'); // Lấy lại giỏ hàng đã cập nhật

        return res.status(200).json({
            success: !!response,
            mes: response ? 'Đã thêm vào giỏ hàng' : 'Đã xảy ra lỗi',
            cart: updatedUser.cart // Trả về giỏ hàng đã cập nhật
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            mes: error.message
        });
    }
});


const removeProductInCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const {pid} = req.params
    const user = await User.findById(_id).select('cart')
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid)
    if (!alreadyProduct) return res.status(200).json({
        success: true ,
        mes:'Đã thêm vào giỏ hàng'
    })
    const response = await User.findByIdAndUpdate(_id, {$pull: {cart: {product: pid}}}, { new: true})
        return res.status(200).json({
            success: response ? true : false,
            mes: response ? 'Đã thêm vào giỏ hàng' : 'Đã xảy ra lỗi'
        })
})
module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateUserAddress,
    updateCart,
    finalRegister, 
    removeProductInCart,
}