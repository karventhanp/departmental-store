import React, { Component } from 'react';
import styles from '../Css/supplier.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Supplier extends Component {
    constructor() {
        super();
        this.state = {
            supplier: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/supplier')
            .then(res => {
                this.setState({ supplier: res.data });
            });
    };
    deleteSupplier = (id) => {
        console.log("Supplier ID :", id);
        axios.delete(`http://localhost:5000/deletesupplier/${id}`)
            .then(res => {
                if(res.status===200)
                    window.location.reload();
            })
            .catch(err => console.log(err));
    };
    render() {
        return (
            <div>
                <div className={`container mt-1 ${styles.container}`}>
                    <div className="row">
                        <div className="col-md-12">
                            {this.state.supplier.length===0 ? <div className='text-center text-danger mb-2'>No more data</div> :
                                <table className='table'>
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th>ID</th>
                                            <th>Supplier Name</th>
                                            <th>Supplier Products</th>
                                            <th>Email ID</th>
                                            <th>Contact</th>
                                            <th>Modify</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.supplier.map(supplier =>
                                                <tr key={supplier.supplier_id} className={styles.tr}>
                                                    <td>{supplier.supplier_id}</td>
                                                    <td>{supplier.supplier_name}</td>
                                                    <td>{supplier.supplier_products}</td>
                                                    <td>{supplier.email}</td>
                                                    <td>{supplier.contact}</td>
                                                    <td>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <Link to='/supplieredit' onClick={() => this.props.passSupplierdata(supplier)} className='btn btn-sm btn-warning'>Edit</Link>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <button className='btn btn-sm btn-danger' onClick={() => this.deleteSupplier(supplier.supplier_id)}>Delete</button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                    <div className="row text-center mb-2">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <Link to='/supplieradd' className='btn btn-md btn-primary'>AddSupplier</Link>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </div>);
    }
}

export default Supplier;