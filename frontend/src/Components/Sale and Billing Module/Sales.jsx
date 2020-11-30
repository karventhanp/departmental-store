import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
class Sales extends Component {
    state = {  
        sales:[],
        size:[],
        quantity1:'',
        per_quantity:'',
        value1:'',
        date1:'',
        qerr:[]
    }
    componentDidMount=()=>{
        axios.get('http://localhost:5000/sales')
        .then(res=>{this.setState({sales:res.data})})
        .catch(err=>console.log(err));
    }

    searchstockProduct=(e)=>{
        const name=e.target.value;
        axios.post('http://localhost:5000/searchstockproduct',{name:name})
        .then(res=>{this.setState({sales:res.data})})
        .catch(err=>console.log(err));
    }

    getSize=(id)=>{
        axios.post('http://localhost:5000/getstocksize',{pid:id})
        .then(res=>{
            this.setState({size:res.data})})
        .catch(err=>console.log(err));
    }

    getData=(e,id,index)=>{
        const value=e.target.value;
        if(value==='n'){

        }       
        else{
        this.setState({value1:value});
        const selectedIndex=e.target.options.selectedIndex;
        const da=e.target.options[selectedIndex].getAttribute('data-key');
        const gq=e.target.options[selectedIndex].getAttribute('access');
        
        this.setState({date1:da,per_quantity:gq});        
        }
    }

    handleChange=(e)=>{
        this.setState({quantity1:e.target.value});
    }

    handleSubmit=(e,index,id,name)=>{
       const {quantity1,value1,date1,per_quantity}=this.state;  
       let qerr=[...this.state.qerr];
       if(quantity1===""){
           qerr[index]='Empty field !';
           this.setState({qerr});
       }
       else if(value1===""){
           qerr[index]='Select Size !';
           this.setState({qerr,quantity1:''});
       }
       else{
        axios.post('http://localhost:5000/checkquantity',{id:id,size:value1,date:date1})
        .then(res=>{
            if(quantity1>res.data[0].quantity){
                qerr[index]='Not available in Stock !';
                this.setState({qerr});
            }
            else{
                const d={
                    pid:id,
                    psize:value1,
                    pquantity:quantity1,
                    pname:name,
                    date:date1,
                    per_quantity:per_quantity
                }
                axios.post('http://localhost:5000/addtosalescart',d)
                .then(res=>{
                    console.log(res.data);
                    if(res.status===200){
                        qerr[index]=<div className='text-success'>Added to Billing</div>
                        this.setState({qerr,value1:''});
                    }
                })
                .catch(err=>console.log(err));
            }
        })
        .catch(err=>console.log(err));
    }
    }

    render() { 
        return ( <div className='container-fluid'>
            <div className="row mt-2">
                <div className="col-md-3">
                    <input type="text" 
                    className='form-control'
                     placeholder='Search By Name'
                     onChange={this.searchstockProduct}
                     />
                </div>
                <div className="col-md-3">
                    <Link to='/billing' className='nav-link btn btn-md btn-primary col-md-6'>Billing</Link>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-12">
                        <table className='table'>
                            <thead className='thead-dark'>
                                <tr>
                                        <th>ID</th>
                                        <th>Product Name</th>
                                        <th>Product Size</th>
                                        <th>Quantity</th>
                                        <th>Add to Billing</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.sales.map((s,index)=>(
                                        <tr key={index}>
                                            <th>{s.product_id}</th>
                                    <td>{s.product_name}</td>
                                    <td>
                                        <select name="size" className='form-control' 
                                        onClick={()=>this.getSize(s.product_id)}
                                        onChange={(e)=>this.getData(e,s.product_id,index)}
                                        >
                                            <option value="n">Select Size</option>
                                            {
                                                this.state.size.map((size,i)=>(
                                                <option value={size.product_size} 
                                                data-key={size.date_of_purchase}
                                                access={size.per_quantity}
                                                key={i}>{size.product_size} "{new Date(size.date_of_purchase).toDateString()}"</option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" className='form-control'
                                        onChange={this.handleChange}
                                        
                                        />
                                        <small className='text-danger'>{this.state.qerr[index]}</small>
                                    </td>
                                    <td>
                                        <input type="button" value='Add to Billing'className='btn btn-sm btn-success'
                                        onClick={(e)=>this.handleSubmit(e,index,s.product_id,s.product_name)}
                                        />
                                    </td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                </div>
            </div>
        </div> );
    }
}
 
export default Sales;