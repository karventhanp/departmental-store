import Axios from 'axios';
import React, { Component } from 'react'
class FixAmount extends Component {
    state = {
        data: [],
        modify: [],
        pid: '',
        psize: '',
        pamount: '',
        isUpdated: [],
        errors: []
    }
    componentDidMount = () => {
        Axios.get('http://localhost:5000/fixamount')
            .then(res => { this.setState({ data: res.data }) })
            .catch(err => console.log(err));
    }
    handleChange = (e, id, size) => {
        const value = e.target.value;
        this.setState({
            pid: id,
            psize: size,
            pamount: value
        });
    }

    handleSubmit = (e, i) => {
        e.preventDefault();
        const { pid, psize, pamount } = this.state;
        let modify = [...this.state.modify];
        const obj = { pid: pid, psize: psize, pamount: pamount };
        modify[i] = obj;
        this.setState({
            modify
        });
        const amount = modify[i].pamount;
        if (amount === "") {
            let errors = [...this.state.errors];
            errors[i] = "Fill the amount !";
            this.setState({ errors });
            return;
        }
        else {
            const details = {
                pid: pid,
                psize: psize,
                pamount: pamount
            }
            Axios.post('http://localhost:5000/updateamount', details)
                .then(res => {
                    if (res.status === 200) {
                        let isUpdated = [...this.state.isUpdated];
                        isUpdated[i] = <div className='text-success'>Amount Update Successfully !</div>
                        this.setState({ isUpdated });
                    }
                    else {
                        let isUpdated = [...this.state.isUpdated];
                        isUpdated[i] = <div className='text-danger'>Some error occured !</div>
                        this.setState({ isUpdated });
                    }
                })
                .catch(err => console.log(err));
        }
        this.setState({
            modify: [],
            pid: '',
            psize: '',
            pamount: '',
            isUpdated: [],
            errors: []
        })
    }

    searchByName = (e) => {
        const value = e.target.value;
        Axios.post('http://localhost:5000/fixamountsearch',{name:value})
        .then(res=>{this.setState({data:res.data})})
        .catch(err=>console.log(err));
        /*
        let data = this.state.data;
        data = data.filter(user => {
            return user.product_name.toLowerCase() === value;
        });
        if (data.length === 0) {
            if (value === "")
                window.location.reload();
        }
        else {
            this.setState({ data });
        }
        */
    }
    render() {

        return (<div className='container'>
            <div className="row">
                <div className="col-md-12 text-center">
                    <input type="text"
                        className='col-md-4 form-control mt-3'
                        placeholder='Search Product Name'
                        onChange={this.searchByName}
                    />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <table className='table table-bordered'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Product Size</th>
                                <th>Amount</th>
                                <th>Fix Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.map((p, i) => (
                                    <tr key={i}>
                                        <th>{p.product_id}</th>
                                        <td>{p.product_name}</td>
                                        <td>{p.size}</td>
                                        <td>
                                            <input type="text"
                                                className='form-control'
                                                name='amount'
                                                placeholder={p.amount}
                                                onChange={(e) => this.handleChange(e, p.product_id, p.size)}
                                            />
                                            <small className="text-danger text-center mt-1">{this.state.errors[i]}</small>
                                            <small className='text-center'>{this.state.isUpdated[i]}</small>
                                        </td>
                                        <td>
                                            <input type="button" className='btn btn-sm btn-warning' onClick={(e) => this.handleSubmit(e, i)} value='Fix Amount' />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
    }
}

export default FixAmount;