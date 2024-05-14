import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getProducts } from 'apis'; // Nhập hàm API để lấy thông tin sản phẩm

const Dashboard = () => {
  const [productsData, setProductsData] = useState(null);
  const [bestSellers, setBestSellers] = useState(null);
  console.log(bestSellers);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const [bestSellersResponse] = await Promise.all([
        getProducts({ sort: '-sold' }),
        getProducts({ sort: '-createdAt' })
      ]);
      if (bestSellersResponse?.success) {
        const products = bestSellersResponse.products;
        setBestSellers(products);
        setProductsData(products); // Cập nhật cả dữ liệu cho biến productsData
      }    } catch (error) {
      console.error("Lỗi khi tải thông tin sản phẩm:", error);
    }
  }

  const fetchLowProducts = async () => {
    try {
      const lowQuantityResponse = await getProducts(); // Lấy các sản phẩm có quantity dưới 10
  
      if (lowQuantityResponse?.success) {
        const lowQuantityProducts = lowQuantityResponse.products;
  
        setProductsData(lowQuantityProducts); // Cập nhật dữ liệu cho biến productsData
      }
    } catch (error) {
      console.error("Lỗi khi tải thông tin sản phẩm:", error);
    }
  }

  useEffect(() => {
    fetchLowProducts();
  }, []);
  

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text x={x} y={y} fill="white" fontSize={10} textAnchor="middle" dominantBaseline="middle">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  const filterAndSortLowInventoryProducts = () => {
    return productsData?.filter(productsData => productsData?.quantity < 10)
                       .sort((a, b) => a.quantity - b.quantity);
  };

  const COLORS = ['#FF6633', '#FFB399', '#FF33FF', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300'];

  return (
    <div className=''>
      <div className='p-4 border-b border-b-blue-400 w-full bg-white flex justify-between items-center fixed top-0'>
      <h1 className='text-3xl font-bold tracking-tight'>Thống kê sản phẩm</h1>
      </div>
      <div style={{ display: 'flex' }}>
        <ResponsiveContainer width="50%" height={400}>
          <PieChart>
            <Pie
              data={bestSellers}
              dataKey="sold"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              label={renderCustomizedLabel}
              paddingAngle={5}
            >
{bestSellers?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{ marginLeft: '20px', marginTop:'70px' }}>
          <h4>Chú thích</h4>
          {bestSellers?.map((entry, index) => (
            <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: COLORS[index % COLORS.length], marginRight: '10px' }}></div>
              <span>{`${entry.title}: ${(entry.sold / bestSellers.reduce((acc, curr) => acc + curr.sold, 0) * 100).toFixed(2)}%`}</span>
            </div>
          ))}
        </div>
      </div>
      <div className='pl-6'>
      <h1 className='text-3xl font-bold tracking-tight mb-[30px]'>Danh sách sản phẩm sắp hết hàng</h1>
        <table>
          <thead>
            <tr>
              <th>Số thứ tự</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng hàng thực tế</th>
            </tr>
          </thead>
          <tbody>
            {filterAndSortLowInventoryProducts()?.map((product, index) => (
              <tr key={product.id}>
                <td ><span>{index + 1}</span></td>
                <td ><span>{product.title}</span></td>
                <td className='flex items-center justify-center text-red-500'><span>{product.quantity}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;