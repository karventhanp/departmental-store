import React, { Component } from 'react';
import axios from 'axios';
import style from '../Css/supplier.module.css';
class SupplierEdit extends Component {
    state = {
        id: '',
        name: '',
        products: '',
        email: '',
        contact: '',
        isUpdated: '',
        errors: {}
    }
    componentDidMount = () => {
        const { supplier_id, supplier_name, supplier_products, email, contact } = this.props.supplierData;
        this.setState({
            id: supplier_id,
            name: supplier_name,
            products: supplier_products,
            email: email,
            contact: contact
        });
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, products, email, contact } = this.state;
        if (name === "") {
            this.setState({ errors: { nameerr: "Name cannot be empty" } });
            return;
        }
        else if (products === "") {
            this.setState({ errors: { productserr: "Products cannot be empty" } });
            return;
        }
        else if (email === "") {
            this.setState({ errors: { emailerr: "Email cannot be empty" } });
            return;
        }
        else if (contact === "") {
            this.setState({ errors: { contacterr: "Contact number cannot be empty" } });
            return;
        }
        else {
            axios.put("http://localhost:5000/updatesupplier", { data: this.state })
                .then(res => {
                    if (res.status === 200)
                        this.setState({ isUpdated: <div className='text-success'>Updated Successfully</div> })
                    else
                        this.setState({ isUpdated: <div className='text-danger'>Some erro occured</div> })
                })
                .catch(err => console.log(err));
        }
        this.setState({
            name: '',
            products: '',
            email: '',
            contact: '',
            errors: {}
        });
    }
    render() {
        const { nameerr, productserr, emailerr, contacterr } = this.state.errors;
        return (<div>
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h4 className="text-primary text-center">Edit Suppliers</h4>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text"
                                    name='name'
                                    className={`form-control ${nameerr ? style.error : null}`}
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                                <small className='text-danger'>{nameerr}</small>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    className={`form-control ${productserr ? style.error : null} `}
                                    name='products' value={this.state.products}
                                    onChange={this.handleChange}
                                />
                                <small className='text-danger'>{productserr}</small>
                            </div>
                            <div className="form-group">
                                <input type="email"
                                    className={`form-control ${emailerr ? style.error : null}`}
                                    name='email' value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <small className='text-danger'>{emailerr}</small>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    className={`form-control ${contacterr ? style.error : null}`}
                                    name='contact' value={this.state.contact}
                                    onChange={this.handleChange}
                                />
                                <small className='text-danger'>{contacterr}</small>
                            </div>
                            <div className="text-center">
                                <input type="submit" value='Update' className='btn btn-md btn-warning' />
                            </div>
                            <h6 className="text-center mt-2">{this.state.isUpdated}</h6>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>);
    }
}

export default SupplierEdit;