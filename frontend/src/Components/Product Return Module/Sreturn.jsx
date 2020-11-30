import Axios from 'axios';
import React, { Component } from 'react'
import style from '../Css/sale.module.css';
export default class Sreturn extends Component {
    state = {
        name: '',
        phno: '',
        cname: '',
        cnum: '',
        isGetted: '',
        data: [],
        expire:[],
        errors: {}
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, phno } = this.state;
        if (name === '') {
            this.setState({ errors: { nameerr: 'Customer name required !' } });
            return;
        }
        else if (phno === '') {
            this.setState({ errors: { phnoerr: 'Customer Phno required !' } });
            return;
        }
        else {
            Axios.post('http://localhost:5000/getsalesdata', { name: name, phno: phno })
                .then(res => {
                    if (res.data.length === 0) {
                        this.setState({ isGetted: 'empty' })
                    }
                    else {
                        let cname = res.data[0].cus_name;
                        let cnum = res.data[0].cus_phno;
                        this.setState({
                            data: res.data,
                            isGetted: '',
                            cname,
                            cnum
                        })

                    }
                })
                .catch(err => console.log(err));

        }
        this.setState({
            name: '',
            phno: '',
            errors: {}
        })
    }

    returnProduct=(d,index)=>{

        let pdate=new Date(d.date)
        let tdate=new Date()
        pdate=new Date(pdate.setDate(pdate.getDate()+7))
        let expire=[...this.state.expire];
        if(tdate>pdate){
            expire[index]=<div className='text-danger'>Date Expired !</div>
            this.setState({expire});
        }
        else{
        Axios.post('http://localhost:5000/salesreturn',d)
        .then(res=>{
            if(res.data==='success')
            window.location.reload();
        })
        .catch(err=>console.log(err));
        }
    }

    render() {
        const { name, phno } = this.state;
        const { nameerr, phnoerr } = this.state.errors
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="text-center mt-2 mb-2">
                            <h4 className="text-primary">Sales Return</h4>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <input type="text"
                                    name='name'
                                    className={`form-control ${nameerr ? style.error : null}`}
                                    value={name}
                                    onChange={this.handleChange}
                                    placeholder='Customer Name'
                                />
                                <small className="text-danger">{nameerr}</small>
                            </div>
                            <div className={`form-group `}>
                                <input type="text"
                                    name='phno'
                                    className={`form-control ${phnoerr ? style.error : null}`}
                                    value={phno}
                                    onChange={this.handleChange}
                                    placeholder='Customer Phno'
                                />
                                <small className="text-danger">{phnoerr}</small>
                            </div>
                            <div className="text-center">
                                <input type="submit"
                                    className='btn btn-md btn-success'
                                    value='Get'
                                />
                            </div>

                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                {
                    this.state.isGetted === 'empty' ? <div className='text-center text-danger'>No more data</div> :
                        <div>
                            <div className="row mt-1">
                                <div className="col-md-4"><h5 className='text-primary'>Customer Name : {this.state.cname}</h5></div>
                                <div className="col-md-4"><h5 className='text-primary'>Customer Phno : {this.state.cnum}</h5></div>
                            </div>
                            
                            <table className='table table-bordered'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th>Name</th>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Amount</th>
                                        <th>Purchase Date</th>
                                        <th>Return</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.data.map((d, i) => (
                                            <tr key={i}>
                                                <td>{d.product_name}</td>
                                        <td>{d.product_size}</td>
                                        <td>{d.quantity}</td>
                                        <td>{d.amount}</td>
                                        <td>{new Date(d.date).toLocaleDateString()}</td>
                                        <td>
                                            <input type="button"
                                            className='btn btn-sm btn-warning'
                                            value='Return'
                                            onClick={()=>this.returnProduct(d,i)}
                                            />
                                            <small>{this.state.expire[i]}</small>
                                        </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            </div>
                }


            </div>
        )
    }
}
