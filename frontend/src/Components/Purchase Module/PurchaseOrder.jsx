import axios from 'axios';
import React, { Component } from 'react'
class PurchaseOrder extends Component {
    state = { 
        cart:[],
        amount:[],
        isAdded:[]
     }
    componentDidMount=()=>{
        axios.get('http://localhost:5000/purchasecart')
        .then(res=>{            
            this.setState({cart:res.data,
            amount:res.data.map(a=>a.amount)
            })})
        .catch(err=>console.log(err));
    }

    orderSearch=(e)=>{
        const value=e.target.value;
        axios.post('http://localhost:5000/ordersearch',{name:value})
        .then(res=>{this.setState({cart:res.data})})
        .catch(err=>console.log(err));
    }

    removePurchasecart=(id,size,date)=>{
        axios.post('http://localhost:5000/removepurchasecart',{id:id,size:size,date:date})
        .then(res=>{
            if(res.data==='success')
                window.location.reload();
        })
        .catch(err=>console.log(err));
    }

    addtoStock=(index,items)=>{
        axios.post('http://localhost:5000/addtostock',items)
        .then(res=>{
            if(res.data==='success'){
                window.location.reload();
            }
        })
        .catch(err=>console.log(err));
    }

    render() { 
        return ( <div className='container-fluid'>
            <div className="row">
                <div className="col-md-12">
                    <h5 className="text-center text-primary mt-2">Order Details</h5>
                    <input type="text" className='col-md-4 form-control m-2' placeholder='Search By Name' onChange={this.orderSearch}/>
                    <table className='table'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Product Size</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Supplier Name</th>
                                <th>Order Date</th>
                                <th>Purchase</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cart.map((items,index)=>(
                                <tr key={index}>
                                    <th>{items.product_id}</th>
                                <td>{items.product_name}</td>
                                <td>{items.product_size}</td>
                                <td>{items.quantity}</td>
                                <td>{items.amount}</td>
                                <td>{items.supplier_name}</td>
                                <td>{new Date(items.date_of_order).toLocaleDateString()}</td>
                                <td>
                                    <div className="row">
                                        <div className="col-sm-6">
                                    <input type="button" 
                                    className='btn btn-sm btn-success'
                                     value="Purchase"
                                     onClick={()=>this.addtoStock(index,items)}
                                     />
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="button" 
                                            className='btn btn-sm btn-danger'
                                              onClick={()=>this.removePurchasecart(items.product_id,items.product_size,items.date_of_order)}
                                              value="Remove"/>
                                        </div>
                                    </div>
                                </td>
                                </tr>
                                ))
                            }
                            <tr>
                                <th colSpan='4' className='text-right'>Total Amount</th>
                                <th>
                                    {
                                        this.state.amount.reduce((a,b)=>a+b,0)
                                    }
                                </th>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
            
        </div> );
    }
}
 
export default PurchaseOrder;