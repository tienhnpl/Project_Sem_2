const icons = require("./icons");
const path = require("./path");

const productInfoTabs = [
    {
        id: 1,
        name: 'CHI TIẾT SẢN PHẨM',
        content: `Hạt Zoi Dog thức ăn cho chó 1kg
        Thức ăn hạt cho chó trưởng thành hạt Zoi Dog Food 
        có thương hiệu từ Thái Lan nổi tiếng về chất lượng, uy tín chắc chắn 
        sẽ đem đến những bữa ăn ngon miệng, giàu chất dinh dưỡng cho các bé cún.`
    },
       
    {
        id: 3,
        name: 'THANH TOÁN & GIAO HÀNG'
    }
];

const subcategories = [
    'Chó',
    'Mèo',
    'Thức ăn',
    'Chuồng & Nệm',
    'Bánh Thưởng',
    'Pate',
    'Sữa, bình sữa',
    'Bát ăn & Bình nước',
    'Đồ chơi & Huấn luyện',
    'Vệ sinh & Chăm sóc',
    'Vòng cổ, dây dắt',
];

const voteOptions = [
    {
        id: 1,
        text: 'Rất Tệ'
    },
    {
        id: 2,
        text: 'Tệ'
    },
    {
        id: 3,
        text: 'Bình Thường'
    },
    {
        id: 4,
        text: 'Tốt'
    },
    {
        id: 5,
        text: 'Tuyệt Vời'
    }
];

const {MdDashboard, TiGroup, FaProductHunt,FaShoppingBag, ImProfile,MdWorkHistory} = icons;
const adminSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Thống Kê',
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icon: MdDashboard({ size: 20 })
    },
    {
        id: 2,
        type: 'SINGLE',
        text: 'Quản Lý Người Dùng',
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: TiGroup({ size: 20 })
    },
    {
        id: 3,
        type: 'PARENT',
        text: 'Quản Lý Sản Phẩm',
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: FaProductHunt({ size: 20 }),
        submenu: [
            {
                text: 'Tạo Sản Phẩm',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`
            },
            {
                text: 'Quản Lý Sản Phẩm',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`
            }
        ]
    },
    {
        id: 4,
        type: 'SINGLE',
        text: 'Quản Lý Đơn Hàng',
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icon: FaShoppingBag({ size: 20 })
    },
];

const memberSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Thông Tin Cá Nhân',
        path: `/${path.MEMBER}/${path.PERSONAL}`,
        icon: ImProfile({ size: 20 })
    },
    {
        id: 2,
        type: 'SINGLE',
        text: 'Giỏ Hàng',
        path: `/${path.MEMBER}/${path.MY_CART}`,
        icon: FaShoppingBag({ size: 20 })
    },
    {
        id: 4,
        type: 'SINGLE',
        text: 'Lịch Sử Mua Hàng',
        path: `/${path.MEMBER}/${path.HISTORY}`,
        icon: MdWorkHistory({ size: 20 })
    },
];

const roles = [
    {
        code: 1997,
        value: 'Admin'
    },
    {
        code: 107297,
        value: 'User'
    }
]

const blockStatus = [
    {
        code: true,
        value: 'Blocked'
    },
    {
        code: false,
        value: 'Active'
    }
]

const statusOrder= [
    {
        label: 'Đã hủy',
        value: 'Đã hủy'
    },
    {
        label: 'Thành công',
        value: 'Thành công'
    },
]

module.exports = { productInfoTabs, subcategories, voteOptions, adminSidebar, roles,blockStatus, memberSidebar,statusOrder };
