import React, { Component } from 'react';
import style from '../Css/sale.module.css';
import axios from 'axios';
class Billing extends Component {
    state = {
        items: [],
        amount: [],
        cname: '',
        isDeleted: [],
        cnum: '',
        mode: '',
        efee: '',
        errors: {},
        isAdded: ''
    }
    componentDidMount = () => {
        axios.get('http://localhost:5000/billing')
            .then(res => {
                this.setState({
                    items: res.data,
                    amount: res.data.map(amo => amo.product_amount)
                })
            })
            .catch(err => console.log(err));
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { cname, cnum, mode, efee } = this.state;
        if (cname === '') {
            this.setState({ errors: { cnameerr: "Enter customer name !" } });
            return
        }
        else if (cnum === "") {
            this.setState({ errors: { cnumerr: "Enter customer phno !" } });
            return
        }
        else if (mode === '') {
            this.setState({ errors: { modeerr: "Select mode of sale 1" } });
            return
        }
        else if (efee === '') {
            this.setState({ errors: { aerr: "If you have not pay any extra fees enter 0 !" } });
            return;
        }
        else {
            const total = this.state.amount.reduce((a, b) => a + b, 0);
            const d = {
                name: cname,
                number: cnum,
                mode: mode,
                total: total,
                efee: efee
            }
            axios.post('http://localhost:5000/payment', d)
                .then(res => {
                    let isAdded;
                    if (res.status === 200) {
                        if (res.data === 'empty') {
                            isAdded = <div className='text-danger'>Buy items and Sale !</div>
                        }
                        else {
                            isAdded = <div className='text-success'>Success</div>
                            this.setState({ items: [], amount: [] })
                        }
                    }
                    else {
                        isAdded = <div className='text-danger'>Some error occured !</div>
                    }
                    this.setState({ isAdded });
                })
                .catch(err => console.log(err));
        }
        this.setState({
            cname: '',
            cnum: '',
            mode: '',
            efee: 0,
            errors: {}
        });
    }

    removeSalescart = (items, index) => {
        axios.delete(`http://localhost:5000/deletesalescart/${items.id}`)
            .then(res => {
                let isDeleted = [...this.state.isDeleted];
                if (res.data === 'success') {
                    isDeleted[index] = <div className='text-success'>Removed</div>
                }
                else {
                    isDeleted[index] = <div className='text-danger'>Error !</div>
                }
                this.setState({ isDeleted });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { cname, cnum, mode, efee } = this.state;
        const { cnameerr, cnumerr, modeerr, aerr } = this.state.errors;
        return (<div className='container'>
            <div className="row mt-3">
                <div className="col-md-12">
                    <form>
                        <div className="form-group">
                            <input type="text"
                                name="cname"
                                placeholder='Customer Name'
                                className={`form-control ${cnameerr ? style.error : null}`}
                                value={cname}
                                onChange={this.handleChange}
                            />
                            <small className="text-danger">{cnameerr}</small>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                name='cnum'
                                placeholder='Customer Phno'
                                className={`form-control ${cnumerr ? style.error : null}`}
                                value={cnum}
                                onChange={this.handleChange}
                            />
                            <small className="text-danger">{cnumerr}</small>
                        </div>
                        <div className="form-group">
                            <select name="mode" className={`form-control ${modeerr ? style.error : null}`}
                                onChange={this.handleChange}
                                value={mode}>
                                <option value="">Select Mode </option>
                                <option value="manualorder">Manual Order</option>
                                <option value="whatsapporder">Whatsapp Order</option>
                                <option value="homedelivery">Home Delivery</option>
                            </select>
                            <small className="text-danger">{modeerr}</small>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                placeholder='Extra Fees'
                                name='efee'
                                className={`form-control ${aerr ? style.error : null}`}
                                value={efee}
                                onChange={this.handleChange}
                            />
                            <small className='text-danger'>{aerr}</small>
                        </div>
                    </form>

                    <table className='table table-bordered mt-3'>
                        <thead>
                            <tr>
                                <th>ItemName</th>
                                <th>ItemSize</th>
                                <th>ItemQuantity</th>
                                <th>ItemAmount</th>
                                <th>PerQuantity</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.map((b, i) => (
                                    <tr key={i}>
                                        <td>{b.product_name}</td>
                                        <td>{b.product_size}</td>
                                        <td>{b.product_quantity}</td>
                                        <td>{b.product_amount}</td>
                                        <td>{b.per_quantity}</td>
                                        <td>
                                            <input type="button" value='Remove'
                                                className='btn btn-sm btn-danger'
                                                onClick={() => this.removeSalescart(b, i)}
                                            />
                                            <small>{this.state.isDeleted[i]}</small>
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <th colSpan='3' className='text-right'>TotalAmount</th>
                                <th>{
                                    efee === '' ? this.state.amount.reduce((a, b) => a + b, 0) : this.state.amount.reduce((a, b) => a + b, 0) + parseInt(efee)
                                }</th>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        <input type="button" value='Sale' className='btn btn-md btn-success' onClick={this.handleSubmit} />
                        <h6 className="mt-2">{this.state.isAdded}</h6>
                    </div>
                </div>
            </div>

        </div>);
    }
}

export default Billing;