import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getProducts } from 'apis'; // Nhập hàm API để lấy thông tin sản phẩm

const Dashboard = () => {
  const [productsData, setProductsData] = useState(null);
  const [bestSellers, setBestSellers] = useState(null);
  const [lowqlt, setLowQlt] = useState(20);
  console.log(bestSellers);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const [bestSellersResponse] = await Promise.all([
        getProducts({ sort: '-sold' }),
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
      const lowQuantityResponse = await getProducts({ limit: 50 }); // Lấy các sản phẩm có quantity dưới 10
  
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

  const filter0Products = () => {
    return productsData?.filter(productsData => productsData.quantity ===0)
  };

  const filterAndSortLowInventoryProducts = () => {
    return productsData?.filter(productsData => productsData?.quantity <= lowqlt && productsData.quantity > 0)
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


      <div className='pl-6 mb-[70px]'>
      <h1 className='text-3xl font-bold tracking-tight mb-[30px] text-red-500' >Danh sách sản phẩm hết hàng</h1>
        <table className='table-auto w-full'>
        <thead>
          <tr className='border bg-white w-full border=white'>
            <th className='text-center py-2'>STT</th>
            <th className='text-center py-2'>Sản phẩm</th>
            <th className='text-center py-2'>Số lượng hàng thực tế</th>
            <th className='text-center py-2'>Số lượng đã bán</th>
          </tr>
          </thead>
          <tbody>
            {filter0Products()?.map((product, index) => (
              <tr key={product.id}>
                <td className='text-center py-2' ><span>{index + 1}</span></td>
                <td className='text-center py-2'><span>{product.title}</span></td>
                <td className='flex items-center justify-center text-red-500'><span>{product.quantity}</span></td>
                <td className='text-center py-2'><span>{product.sold}</span></td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='pl-6'>
      <label className='text-3xl font-bold tracking-tight mb-[30px]' htmlFor="numberInput">Danh sách sản phẩm sắp hết hàng có số lượng dưới </label>
        <input 
          className='w-[80px] text-2xl ml-[10px]'
          type="number" 
          id="numberInput" 
          name="numberInput" 
          value={lowqlt}
          onChange={(e) => setLowQlt(parseInt(e.target.value))} // Cập nhật lowqlt khi có thay đổi
        />
        <table className='table-auto w-full'>
        <thead>
          <tr className='border bg-white w-full border=white'>
            <th className='text-center py-2'>STT</th>
            <th className='text-center py-2'>Sản phẩm</th>
            <th className='text-center py-2'>Số lượng hàng thực tế</th>
            <th className='text-center py-2'>Số lượng đã bán</th>
          </tr>
          </thead>
          <tbody>
            {filterAndSortLowInventoryProducts()?.map((product, index) => (
              <tr key={product.id}>
                <td className='text-center py-2' ><span>{index + 1}</span></td>
                <td className='text-center py-2'><span>{product.title}</span></td>
                <td className='flex items-center justify-center text-red-500'><span>{product.quantity}</span></td>
                <td className='text-center py-2'><span>{product.sold}</span></td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;