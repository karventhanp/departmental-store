import React, { Component } from 'react';
import axios from 'axios';
import style from '../Css/purchase.module.css';
class PurchaseEdit extends Component {
    state = {
        data: [],
        type: [],
        pid:'',
        pname: '',
        title: '',
        ptype: '',
        pexpiry: '',
        size0: '',
        amount0: '',
        size1: '',
        amount1: '',
        size2: '',
        amount2: '',
        size3: '',
        amount3: '',
        size4: '',
        amount4: '',
        errors: {}
    }
    componentDidMount = () => {
        axios.post('http://localhost:5000/productedit', { pid: this.props.productId })
            .then(res => (this.setState({
                data: res.data,
                pid:res.data[0].product_id,
                pname: res.data[0].product_name,
                title: res.data[0].product_name,
                ptype: res.data[0].product_type,
                pexpiry: res.data[0].expiry_date,
            })))
            .catch(err => console.log(err));
    }

    getProductType = () => {
        axios.get('http://localhost:5000/getproducttype')
            .then(res => { this.setState({ type: res.data }) })
            .catch(err => { console.log(err) });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { pid,pname, ptype, pexpiry, size0, amount0, size1, amount1, size2, amount2, size3, amount3, size4, amount4 } = this.state;
        if (pname === "") {
            this.setState({ errors: { pnameerr: "Product name required !" } });
            return
        }
        else if (ptype === '') {
            this.setState({ errors: { ptypeerr: "Product type required!" } });
            return
        }
        else if (pexpiry === '') {
            this.setState({ errors: { pexpiryerr: "Product expiry required !" } });
            return
        }
        else if (this.state.data.length === 1) {
            if (size0 === '')
                return
            else if (amount0 === '')
                return
            else {
                axios.post('http://localhost:5000/updateproduct', {
                    pid:pid,
                     pname: pname,
                     ptype:ptype,
                     pexpiry:pexpiry,
                     size0:size0,
                     amount0:amount0                    
                    })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }
        }
        else if (this.state.data.length === 2) {
            if (size1 === '')
                return
            else if (amount1 === '')
                return
            else {
                axios.post('http://localhost:5000/updateproduct', { 
                    pid:pid,
                    pname: pname,
                    ptype:ptype,
                    pexpiry:pexpiry,
                    size0:size0,
                    amount0:amount0 ,
                    size1:size1,
                    amount1:amount1        
            })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }
        }
        else if (this.state.data.length === 3) {
            if (size1 === '')
                return
            else if (amount1 === '')
                return
            else if (size2 === '')
                return
            else if (amount2 === '')
                return
            else {
                axios.post('http://localhost:5000/updateproduct', {
                    pid:pid,                    
                    pname: pname,
                    ptype:ptype,
                    pexpiry:pexpiry,
                    size0:size0,
                    amount0:amount0 ,
                    size1:size1,
                    amount1:amount1,
                    size2:size2,
                    amount2:amount2 
            })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }
        }
        else if (this.state.data.length === 4) {
            if (size1 === '')
                return
            else if (amount1 === '')
                return
            else if (size2 === '')
                return
            else if (amount2 === '')
                return
            else if (size3 === '')
                return
            else if (amount3 === '')
                return
            else {
                axios.post('http://localhost:5000/updateproduct', {
                    pid:pid,
                    pname: pname,
                    ptype:ptype,
                    pexpiry:pexpiry,
                    size0:size0,
                    amount0:amount0 ,
                    size1:size1,
                    amount1:amount1,
                    size2:size2,
                    amount2:amount2,
                    size3:size3,
                    amount3:amount3
                 })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }
        }
        else if (this.state.data.length === 5) {
            if (size1 === '')
                return
            else if (amount1 === '')
                return
            else if (size2 === '')
                return
            else if (amount2 === '')
                return
            else if (size3 === '')
                return
            else if (amount3 === '')
                return
            else if (size4 === '')
                return
            else if (amount4 === '')
                return
            else {
                axios.post('http://localhost:5000/updateproduct', { 
                    pid:pid,
                    pname: pname,
                    ptype:ptype,
                    pexpiry:pexpiry,
                    size0:size0,
                    amount0:amount0 ,
                    size1:size1,
                    amount1:amount1,
                    size2:size2,
                    amount2:amount2,
                    size3:size3,
                    amount3:amount3,
                    size4:size4,
                    amount4:amount4
                 })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }
        }
        this.setState({
            pname: '',
            title: '',
            ptype: '',
            pexpiry: '',
            size0: '',
            amount0: '',
            size1: '',
            amount1: '',
            size2: '',
            amount2: '',
            size3: '',
            amount3: '',
            size4: '',
            amount4: '',
            errors: {}
        });
    }
    render() {
        const { pname, ptype, pexpiry, title } = this.state;
        const { pnameerr, ptypeerr, pexpiryerr } = this.state.errors;
        return (<div className='container'>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <h5 className="text-primary text-center mt-2 mb-2">Edit Details of {title.charAt(0).toUpperCase() + title.slice(1)}</h5>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text"
                                className={`form-control ${pnameerr ? style.error : null}`}
                                name='pname'
                                value={pname}
                                onChange={this.handleChange}
                            />
                            <small className="text-danger">{pnameerr}</small>
                        </div>
                        <div className="form-group">
                            <select name="ptype" className={`form-control ${ptypeerr ? style.error : null}`} onChange={this.handleChange} onMouseEnter={this.getProductType}>
                                <option value={ptype}>{ptype}</option>
                                {
                                    this.state.type.map((ty, index) => (
                                        <option value={ty.product_type} key={index}>{ty.product_type}</option>
                                    ))
                                }
                            </select>
                            <small className="text-danger">{ptypeerr}</small>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                name='pexpiry'
                                className={`form-control ${pexpiryerr ? style.error : null}`}
                                value={pexpiry}
                                onChange={this.handleChange}
                            />
                            <small className="text-danger">{pexpiryerr}</small>
                        </div>
                        {
                            this.state.data.map((pro, index) => (
                                <div key={index}>
                                    <div className="form-group">
                                        <input type="text"
                                            name={'size' + index}
                                            className={`form-control`}
                                            onChange={this.handleChange}
                                        />
                                        <small className="text-primary" >* Pre-value : {pro.size}</small>
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                            name={'amount' + index}
                                            className='form-control'
                                            onChange={this.handleChange}
                                        />
                                        <small className="text-primary">* Pre-value : {pro.amount}</small>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="text-center mb-2">
                            <input type="submit" value='Update' className='btn btn-md btn-warning' />
                        </div>
                    </form>
                </div>
                <div className="col-md-2"></div>
            </div>

        </div>);
    }
}

export default PurchaseEdit;