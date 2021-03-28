import React from 'react'
import { Table } from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const OrdersTable = ({ orders }) => {
   return (
      <Table striped bordered hover>
         <thead>
            <tr>
               <th>Order No</th>
               <th>Date</th>
               <th>Status</th>
               <th>Total</th>
               <th>Actions</th>
            </tr>
         </thead>
         <tbody>
            {orders.map(order => (
               <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.date.replace('T', ' ')}</td>
                  <td>{order.orderStatus}</td>
                  <NumberFormat value={order.total / 100} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <td>{value}</td>} />
                  <td><Link to={`/orders/${order._id}`}>Details</Link></td>
               </tr>
            ))}
         </tbody>
      </Table>
   )
}

export default OrdersTable
