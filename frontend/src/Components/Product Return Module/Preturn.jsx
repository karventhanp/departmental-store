import Axios from 'axios'
import React, { Component } from 'react'

export default class Preturn extends Component {
    state={
        data:[],
        error:[]
    }

    componentDidMount=()=>{
        Axios.get('http://localhost:5000/getpurchasedata')
        .then(res=>{this.setState({data:res.data})})
        .catch(err=>console.log(err));
    }

    searchName=(e)=>{
        const name=e.target.value;
        Axios.post('http://localhost:5000/searchpurchasedata',{name})
        .then(res=>{this.setState({data:res.data})})
        .catch(err=>console.log(err));
    }

    returnProduct=(item,index)=>{
        let pdate=item.date_of_purchase;
        let tdate=new Date();
        pdate=new Date(pdate).toLocaleDateString('sv-SE');
        tdate=new Date(tdate).toLocaleDateString('sv-SE');
        let error=[...this.state.error]
        if(tdate>pdate){
            error[index]=<div className='text-danger'>Date Expired !</div>
        }
        else{
            Axios.post('http://localhost:5000/purchasereturn',item)
            .then(res=>{
                if(res.data==='success')
                window.location.reload();
                else{
                    error[index]=<div className='text-danger'>Some error occured !</div>
                    this.setState({error});
                }
            })
            .catch(err=>console.log(err));
        }
        this.setState({error});
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-center mt-2">
                            <h4 className="text-primary">Purchase Return</h4>
                        </div>
                        <div className="text-center mt-3">
                            <input type="text"
                            className='form-control col-md-4'
                            placeholder='Search By Name'
                            onChange={this.searchName}
                            />
                        </div>
                        <table className='table table-bordered mt-3'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                    <th>Supplier Name</th>
                                    <th>Date of Purchase</th>
                                    <th>Return</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.map((p,i)=>(
                                        <tr key={i}>
                                            <th>{p.product_id}</th>
                                    <td>{p.product_name}</td>
                                    <td>{p.product_size}</td>
                                    <td>{p.quantity}</td>
                                    <td>{p.amount}</td>
                                    <td>{p.supplier_name}</td>
                                    <td>{new Date(p.date_of_purchase).toLocaleDateString()}</td>
                                    <td>
                                        <input type="button"
                                        value='Return'
                                        className='btn btn-sm btn-warning'
                                        onClick={()=>this.returnProduct(p,i)}
                                        />
                                        <small>{this.state.error[i]}</small>
                                    </td>
                                    

                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
                
            </div>
        )
    }
}
