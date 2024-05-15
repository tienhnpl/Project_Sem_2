const Order = require('../models/order')
const {User} = require('../models/user')
const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async(req, res) => {
    const {_id} = req.user
    const {products, total, address, status} = req.body
    if (address) {
        await User.findByIdAndUpdate({ _id }, { address, cart: [] })

    }
    const data = {products, total,orderBy: _id}
    if (status) data.status = status
    const rs = await Order.create(data)
    return res.json({
        success: rs ? true : false,
        rs: rs ? rs : 'Something went wrong',
    })
})


const updateStatusOrder = asyncHandler(async(req, res) => {
    const {oid} = req.params
    const {status} = req.body
    if (!status) throw new Error('Missing status')
    const response = await Order.findByIdAndUpdate(oid, {status}, {new:true})
    return res.json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong',
    })
})
const getUserOrders = asyncHandler(async(req, res) => {
    const queries = {...req.query}
    const {_id} = req.user
    //Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])

    // Format lại các operators cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formatedQueries = JSON.parse(queryString)
    // let subcategoriesQueryObject = {}
    

    // //Filtering
    // if (queries?.title) formatedQueries.title = {$regex: queries.title, $options: 'i'}
    // if (queries?.category) formatedQueries.category = {$regex: queries.category, $options: 'i'}
    // if (queries?.subcategories){
    //     delete formatedQueries.subcategories
    //     const subcategoriesArr = queries.subcategories?.split(',')
    //     const subcategoriesQuery = subcategoriesArr.map(el => ({subcategories: { $regex: el, $options: 'i'}})) 
    //     subcategoriesQueryObject = { $or: subcategoriesQuery}
    // }
    // let queryObject = {}
    // if (queries?.q) {
    //     delete formatedQueries.q
    //     queryObject = { 
    //         $or: [
    //         {subcategories: { $regex: queries.q, $options: 'i'}},
    //         {title: { $regex: queries.q, $options: 'i'}},
    //         {category: { $regex: queries.q, $options: 'i'}},
    //         {subcategory: { $regex: queries.q, $options: 'i'}}
    //     ]}
    // }
    const qr = {...formatedQueries, orderBy: _id}
    let queryCommand = Order.find(qr)

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
    const counts = await Order.find(qr).countDocuments()
    return res.status(200).json({
        success: response ? true : false,
        counts,
        orders: response ? response : 'Cannot get products',
    });
})
const getOders = asyncHandler(async(req, res) => {
    const queries = {...req.query}
    //Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])

    // Format lại các operators cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formatedQueries = JSON.parse(queryString)
    // let subcategoriesQueryObject = {}
    

    // //Filtering
    // if (queries?.title) formatedQueries.title = {$regex: queries.title, $options: 'i'}
    // if (queries?.category) formatedQueries.category = {$regex: queries.category, $options: 'i'}
    // if (queries?.subcategories){
    //     delete formatedQueries.subcategories
    //     const subcategoriesArr = queries.subcategories?.split(',')
    //     const subcategoriesQuery = subcategoriesArr.map(el => ({subcategories: { $regex: el, $options: 'i'}})) 
    //     subcategoriesQueryObject = { $or: subcategoriesQuery}
    // }
    // let queryObject = {}
    // if (queries?.q) {
    //     delete formatedQueries.q
    //     queryObject = { 
    //         $or: [
    //         {subcategories: { $regex: queries.q, $options: 'i'}},
    //         {title: { $regex: queries.q, $options: 'i'}},
    //         {category: { $regex: queries.q, $options: 'i'}},
    //         {subcategory: { $regex: queries.q, $options: 'i'}}
    //     ]}
    // }
    const qr = {...formatedQueries}
    let queryCommand = Order.find(qr)

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
    const counts = await Order.find(qr).countDocuments()
    return res.status(200).json({
        success: response ? true : false,
        counts,
        orders: response ? response : 'Cannot get products',
    });
})
module.exports = {
    createOrder,
    updateStatusOrder,
    getUserOrders,
    getOders
}