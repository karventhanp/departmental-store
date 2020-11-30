import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import style from '../Css/stock.module.css';
class Stock extends Component {
    state = {  
        stock:[],
        size:[],
        quantity:[],
        per_quantity:[],
        amount:[],
        date:[],
        expiry:[],
        condition:[]
    }
    componentDidMount=()=>{
        Axios.get('http://localhost:5000/getstock')
        .then(res=>{this.setState({stock:res.data})})
        .catch(err=>console.log(err));
    }

    getSize=(id)=>{
        Axios.post('http://localhost:5000/getstocksize',{pid:id})
        .then(res=>{
            this.setState({size:res.data})})
    .catch(err=>console.log(err));
    }

    getData=(i,ii,id)=>{
        const value=i.target.value;
        const selectedIndex=i.target.options.selectedIndex;
        const sizeq=i.target.options[selectedIndex].getAttribute('data-key');
        if(value==='none'){

        }
        else{
        const dindex=ii;
        let size=[...this.state.size];
        let quantity=[...this.state.quantity];
        let per_quantity=[...this.state.per_quantity];
        let amount=[...this.state.amount];
        let date=[...this.state.date];
        quantity[dindex]=size[value].quantity;
        per_quantity[dindex]=size[value].per_quantity;
        amount[dindex]=size[value].amount;
        date[dindex]=size[value].date_of_purchase;
        this.setState({quantity,amount,date,per_quantity});
        Axios.post('http://localhost:5000/getdate',{pid:id})
        .then(res=>{
            let expiry=[...this.state.expiry];
            expiry[dindex]=res.data[0].expiry_date;
            const number=res.data[0].expiry_date.replace(/\D/g,'');
            const month=res.data[0].expiry_date.replace(/[0-9]/g,'');  
            const firstletter=month.charAt(1);
            this.setState({expiry});
            let date1;
            if(sizeq==='Number of items'){
                date1=new Date(date[dindex]);
            }
            else{
            const pdate=this.state.size.find(iid=>iid.product_id===id && iid.product_size===sizeq)
            date1=new Date(pdate.date_of_purchase); 
            }
            let number1;
            if(firstletter==='m'){
                number1=number*30;
            }
            else if(firstletter==='y'){
                number1=number*365;
            }
            else if(firstletter==='d'){
                number1=number*1;
            }
            else if(firstletter==='w'){
                number1=number*7;
            }
            const fdate=new Date(date1.setDate(date1.getDate()+number1));
            let condition=[...this.state.condition];
            const tdate=new Date();
            if(tdate>fdate){
                condition[dindex]=<div className='text-danger'>Product Expired !</div>
            }
            else{
                condition[dindex]=<div className='text-success'>Good Condition</div>
            }
            this.setState({condition});

        })
        .catch(err=>console.log(err));
        }

    }

    resetSize=()=>{
        this.setState({size:[]});
    }

    searchstockProduct=(e)=>{
        const name=e.target.value;
        Axios.post('http://localhost:5000/searchstockproduct',{name:name})
        .then(res=>{this.setState({stock:res.data})})
        .catch(err=>console.log(err));
    }

    render() { 
        return ( <div className={`container-fluid ${style.bg}`}>
            <div className="row pt-2">
                <div className="col-md-12">
                    <input type="text"
                    className='form-control col-md-4'
                    placeholder='Search By Name'
                    onChange={this.searchstockProduct}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mt-2">
                    <table className='table'>
                        <thead className={style.thead}>
                            <tr>
                                <th>ProductID</th>
                                <th>ProductName</th>
                                <th>ProductSize
                                    <label className='badge badge-md badge-warning ml-3' onClick={this.resetSize}>Reset</label>
                                </th>
                                <th>InStock</th>
                                <th>Amount</th>
                                <th>Per Quantity</th>
                                <th>Date of Purchase</th>
                                <th>Expiry Condition</th>
                                <th>SupplierName</th>
                                <th>More</th>
                            </tr>
                        </thead>
                        <tbody className={style.tbody}>
                            {
                                this.state.stock.map((s,index)=>(
                                    <tr key={index} className={style.tr}>
                                        <th>{s.product_id}</th>
                                <td>{s.product_name}</td>
                                <td>
                                    <select name="size" className='form-control' onChange={(index1)=>this.getData(index1,index,s.product_id)}
                                    onClick={()=>this.getSize(s.product_id)}>
                                        <option value="none">Select Size</option>
                                        {
                                            this.state.size.map((s,index1)=>(
                                            <option value={index1}
                                            data-key={s.product_size}
                                            key={index1}>{s.product_size} "{new Date(s.date_of_purchase).toDateString()}"</option>
                                            ))
                                        }
                                    </select>
                                </td>
                                    <td>{this.state.quantity[index]}</td>
                                    <td>{this.state.amount[index]}</td>
                                    <td>{this.state.per_quantity[index]}</td>
                                    <td>{this.state.date[index] ? new Date(this.state.date[index]).toDateString(): ''}</td>
                                    <td>{this.state.condition[index]}</td>
                                <td>{s.supplier_name}</td>
                                <td>
                                    <Link to='/stockmore' className='nav-link btn btn-sm btn-success'
                                    onClick={()=>this.props.getStockMoreId(s.product_id,s.product_name)}
                                    >More</Link>
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
 
export default Stock;