import React, { Component } from 'react';
import Axios from 'axios';
class StockMore extends Component {
    state = {
        stock:[],
        isDeleted:''
      }

    componentDidMount=()=>{
        Axios.post('http://localhost:5000/getstockmore',{id:this.props.passStockMoreId})
        .then(res=>{this.setState({stock:res.data})})
        .catch(err=>console.log(err));
    };

    removeProduct=(p)=>{
        Axios.post('http://localhost:5000/removestockproduct',{d:p})
        .then(res=>{
            if(res.data==='success'){
                const isDeleted=<div className='text-success'>Successfully Deleted</div>
                this.setState({isDeleted});
            }
            else{
                const isDeleted=<div className='text-danger'>Some error occured!</div>
                this.setState({isDeleted});
            }
        });
    }

    render() { 
        return ( <div className='container'>
            <div className="row">
                <div className="col-md-12">
    <h5 className="text-center text-primary mt-1">{this.props.passStockMoreName}</h5>
    <table className='table table-bordered'>
        <thead className='thead-dark'>
            <tr>
                <th>Product Size</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Per Quantity</th>
                <th>Date of Purchase</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody>
            {
                this.state.stock.map((p,i)=>(
                    <tr key={i}>
                        <td>{p.product_size}</td>
                <td>{p.quantity}</td>
                <td>{p.amount}</td>
                <td>{p.per_quantity}</td>
                <td>{new Date(p.date_of_purchase).toDateString()}</td>
                <td>
                    <input type="submit" value='Remove' className='btn btn-sm btn-danger'
                    onClick={()=>this.removeProduct(p)}
                    />
                </td>
                    </tr>
                ))
            }
        </tbody>
    </table>
        <small className="text-center">{this.state.isDeleted}</small>
                </div>
            </div>
        </div> );
    }
}
 
export default StockMore;