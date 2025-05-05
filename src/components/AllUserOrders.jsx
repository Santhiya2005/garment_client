import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import { toast } from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate } from 'react-router-dom';
import { HiOutlineExternalLink } from 'react-icons/hi';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchProduct, setSearchProduct] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Axios({
          method: 'GET',
          url: 'http://localhost:8080/api/order/get-all-orders',
        });
        if (response.data.success) {
          setOrders(response.data.data);
        }
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await Axios({
        method: 'PUT',
        url: `http://localhost:8080/api/order/admin/update-order-status`,
        data: { orderId, orderStatus: newStatus },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setOrders(prev =>
          prev.map(o =>
            o.orderId === orderId ? { ...o, orderStatus: newStatus } : o
          )
        );
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Filter by product name, max price, and createdAt date
  const filteredOrders = orders.filter(order =>
    (searchProduct
      ? order.product_details?.name
          ?.toLowerCase()
          .includes(searchProduct.toLowerCase())
      : true) &&
    (filterPrice ? order.totalAmt <= filterPrice : true) &&
    (filterDate
      ? new Date(order.createdAt).toISOString().split('T')[0] === filterDate
      : true)
  );

  const generateReport = () => {
    const header = [
      'Order ID',
      'User',
      'Product',
      'Total Amount',
      'Order Status',
      'Order Date',
      'Fetch Date',
    ].join(',');

    const rows = filteredOrders.map(order => {
      const userLabel =
        order.userId?.name || order.userId?.mobile || 'Unknown';
      const productLabel =
        order.product_details?.name || 'Unknown product';
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
      const fetchDate = new Date().toISOString().split('T')[0];
      return [
        order.orderId,
        userLabel,
        productLabel,
        `₹${order.totalAmt}`,
        order.orderStatus,
        orderDate,
        fetchDate,
      ].join(',');
    });

    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'order_report.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="font-semibold mb-4">All Orders</h2>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Search by Product Name"
          value={searchProduct}
          onChange={e => setSearchProduct(e.target.value)}
          className="px-2 py-1 border rounded"
        />
        <input
          type="number"
          placeholder="Filter by Max Price"
          value={filterPrice}
          onChange={e => setFilterPrice(e.target.value)}
          className="px-2 py-1 border rounded"
        />
        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          className="px-2 py-1 border rounded"
        />
        <button
          onClick={generateReport}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Generate Report
        </button>
      </div>

      {/* Orders Table */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            {[
              'Order ID',
              'User',
              'Product',
              'Total Amount',
              'Status',
              'Order Date',
              'Fetch Date',
              'Action',
            ].map(title => (
              <th
                key={title}
                className="border px-4 py-2 bg-gray-100 text-left"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => {
            const userLabel =
              order.userId?.name || order.userId?.mobile || 'Unknown';
            const productLabel =
              order.product_details?.name || 'Unknown product';
            const orderDateDisplay = new Date(order.createdAt).toLocaleDateString();
            const fetchDateDisplay = new Date().toISOString().split('T')[0];

            return (
              <tr key={order.orderId}>
                <td className="border px-4 py-2">{order.orderId}</td>
                <td className="border px-4 py-2">{userLabel}</td>
                <td className="border px-4 py-2">{productLabel}</td>
                <td className="border px-4 py-2">₹{order.totalAmt}</td>
                <td className="border px-4 py-2">{order.orderStatus}</td>
                <td className="border px-4 py-2">{orderDateDisplay}</td>
                <td className="border px-4 py-2">{fetchDateDisplay}</td>
                <td className="border px-4 py-2">
                  <select
                    value={order.orderStatus}
                    onChange={e =>
                      handleStatusChange(order.orderId, e.target.value)
                    }
                    className="px-2 py-1 border rounded"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
