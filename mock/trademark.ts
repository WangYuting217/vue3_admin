//品牌管理模块mock数据
function createTrademarkList() {
    return [
        {
            id: 1,
            tmName: '华为',
            logoUrl: 'https://img.alicdn.com/imgextra/i1/2208857269262/O1CN01Q8Q8Q81Q8Q8Q8Q8Q8_!!2208857269262.jpg'
        },
        {
            id: 2,
            tmName: '小米',
            logoUrl: 'https://img.alicdn.com/imgextra/i2/2208857269262/O1CN01Q8Q8Q81Q8Q8Q8Q8Q8_!!2208857269262.jpg'
        },
        {
            id: 3,
            tmName: '苹果',
            logoUrl: 'https://img.alicdn.com/imgextra/i3/2208857269262/O1CN01Q8Q8Q81Q8Q8Q8Q8Q8_!!2208857269262.jpg'
        },
        {
            id: 4,
            tmName: '三星',
            logoUrl: 'https://img.alicdn.com/imgextra/i4/2208857269262/O1CN01Q8Q8Q81Q8Q8Q8Q8Q8_!!2208857269262.jpg'
        },
        {
            id: 5,
            tmName: 'OPPO',
            logoUrl: 'https://img.alicdn.com/imgextra/i5/2208857269262/O1CN01Q8Q8Q81Q8Q8Q8Q8Q8_!!2208857269262.jpg'
        }
    ]
}

//对外暴露品牌管理相关接口
export default [
    // 获取品牌列表接口
    {
        url: '/api/admin/product/baseTrademark/:page/:limit',
        method: 'get',
        response: ({ query, url }) => {
            // 从URL中提取页码和每页数量
            const urlParts = url.split('/');
            const page = parseInt(urlParts[urlParts.length - 2]) || 1;
            const limit = parseInt(urlParts[urlParts.length - 1]) || 3;
            
            const allTrademarks = createTrademarkList();
            const total = allTrademarks.length;
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const records = allTrademarks.slice(startIndex, endIndex);
            
            return {
                code: 200,
                message: '获取品牌列表成功',
                ok: true,
                data: {
                    records,
                    total,
                    size: limit,
                    current: page,
                    searchCount: true,
                    pages: Math.ceil(total / limit)
                }
            }
        },
    },
]
