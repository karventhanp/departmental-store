import React, { Component } from 'react'
import style from '../Css/sale.module.css';
import axios from 'axios';
export default class Expenses extends Component {
    state = {
        ec: '',
        tr: '',
        month: [],
        isSaved: '',
        lastUpdated: '',
        errors: {},
        pcost: [],
        scost: [],
        ecost: [],
        tcost: []
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/lastupdate')
            .then(res => {
                let lastUpdated = res.data[0].date
                this.setState({ lastUpdated });
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:5000/pcost')
            .then(res => {
                this.setState({
                    pcost: res.data.map((a) => a.amount)
                })
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:5000/scost')
            .then(res => {
                this.setState({
                    scost: res.data.map((a) => a.total)
                })
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:5000/acost')
            .then(res => {
                this.setState({
                    ecost: res.data.map(a => a.electrical),
                    tcost: res.data.map(a => a.transport)
                })
            })
            .catch(err => console.log(err));



    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { ec, tr } = this.state;
        if (ec === '0') {
            this.setState({ errors: { ecerr: 'Value = 0' } });
            return;
        }
        else if (tr === '0') {
            this.setState({ errors: { trerr: 'Value = 0' } });
            return;
        }
        else if (ec === '' && tr === '') {
            this.setState({ errors: { ecerr: 'Empty field', trerr: 'Empty field' } });
            return;
        }
        else {
            axios.post('http://localhost:5000/saveaccount', { ec: ec, tr: tr })
                .then(res => {
                    let isSaved = this.state.isSaved;
                    if (res.status === 200) {
                        isSaved = <div className='text-success'>Success</div>
                    }
                    else {
                        isSaved = <div className='text-danger'>Some error occured !</div>
                    }
                    this.setState({ isSaved });
                })
                .catch(err => console.log(err));
        }
        this.setState({
            ec: '',
            tr: '',
            isSaved: '',
            errors: {}
        })
    }

    getMonth = () => {
        axios.get('http://localhost:5000/getmonth')
            .then(res => { this.setState({ month: res.data }) })
            .catch(err => console.log(err));
    }

    getmonthData = (e) => {
        const value = e.target.value;
        axios.post('http://localhost:5000/getmonthdata', { id: value })
            .then(res => { this.setState({ monthdata: res.data }) })
            .catch(err => console.log(err));

    }
    render() {
        let a=this.state.pcost.reduce((a,b)=>a+b,0);
        let b=this.state.scost.reduce((a,b)=>a+b,0);
        let c=this.state.ecost.reduce((a,b)=>a+b,0);
        let d=this.state.tcost.reduce((a,b)=>a+b,0);
        const totalcost=a+b+c+d;
        const { ec, tr, lastUpdated } = this.state;
        const { ecerr, trerr } = this.state.errors
        return (
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-md-4">
                        <h5 className="text-center text-primary mt-2">Save Details</h5>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text"
                                    name='ec'
                                    value={ec}
                                    placeholder='Enter Electric cost for current month'
                                    className={`form-control ${ecerr ? style.error : null}`}
                                    onChange={this.handleChange}
                                />
                                <small className="text-success">Last Updated Electrical cost on : {new Date(lastUpdated).toDateString()}</small><br />
                                <small className="text-danger">{ecerr}</small>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    name='tr'
                                    value={tr}
                                    placeholder='Enter Transport Cost'
                                    className={`form-control ${trerr ? style.error : null}`}
                                    onChange={this.handleChange}
                                />
                                <small className="text-danger">{trerr}</small>
                            </div>
                            <div className="text-center">
                                <input type="submit"
                                    value='Save'
                                    className='btn btn-md btn-success'
                                />
                            </div>
                            <div className="text-center">
                                <h6>{this.state.isSaved}</h6>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4 mt-2">
                        <h5 className="text-primary text-center">View Account Data</h5>
                        <select name="month" className='form-control' onMouseEnter={this.getMonth} onChange={this.getmonthData}>
                            <option value="">Select Month</option>
                            {
                                this.state.month.map((m, i) => (
                                    <option value={m.id} key={i}>{m.month}</option>
                                ))
                            }
                        </select>
                        {
                            this.state.monthdata ?
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Electrical Cost</th>
                                            <th>Transport Cost</th>
                                            <th>Last AddedOn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.monthdata.map((m, i) => (
                                                <tr key={i}>
                                                    <td>{m.electrical}</td>
                                                    <td>{m.transport}</td>
                                                    <td>{new Date(m.date).toDateString()}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                </table>
                                : null
                        }
                    </div>
                    <div className="col-md-4 mt-2">
                        <h5 className="text-primary text-center">Profit and Analysis</h5>
                        <div className="row">
                            <div className="col-md-6 text-right">
                                <label className='badge badge-primary p-2'>Total Purchase Cost</label>
                            </div>
                            <div className="col-md-6 text-left">
                                <label className='badge badge-success p-2 ml-2'>{a}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 text-right">
                                <label className='badge badge-primary p-2'>Total Sales Cost</label>
                            </div>
                            <div className="col-md-6 text-left">
                                <label className='badge badge-success p-2 ml-2'>{b}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 text-right">
                                <label className='badge badge-primary p-2'>Total Electricity Cost</label>
                            </div>
                            <div className="col-md-6 text-left">
                                <label className='badge badge-success p-2 ml-2'>{c}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 text-right">
                                <label className='badge badge-primary p-2'>Total Transport Cost</label>
                            </div>
                            <div className="col-md-6 text-left">
                                <label className='badge badge-success p-2 ml-2'>{d}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 text-right">
                                <label className='badge badge-danger p-2'>Grand Total</label>
                            </div>
                            <div className="col-md-6 text-left">
                                <label className='badge badge-warning p-2 ml-2'>{totalcost}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
