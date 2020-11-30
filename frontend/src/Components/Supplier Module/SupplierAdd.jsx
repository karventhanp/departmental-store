import React, { Component } from 'react';
import style from '../Css/supplier.module.css';
import axios from 'axios';
class SupplierAdd extends Component {
    state = {
        name: '',
        products: '',
        email: '',
        contact: '',
        isAdded: "",
        errors: {}
    }
    componentDidMount = () => {
        this.setState({ isAdded: '' });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value.toLowerCase()
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, products, email, contact } = this.state;
        if (name === "") {
            this.setState({ errors: { nameerror: "Name is required!" } });
            return;
        }
        else if (products === "") {
            this.setState({ errors: { productserror: "Products are required!" } });
            return;
        }
        else if (email === "") {
            this.setState({ errors: { emailerror: "Email is required!" } });
            return;
        }
        else if (contact === "") {
            this.setState({ errors: { contacterror: "Contact number is required!" } });
            return;
        }
        else {
            const { name, products, email, contact } = this.state;
            axios.post('http://localhost:5000/addsupplier', { name, products, email, contact })
                .then(res => {
                    if(res.status===200)
                    this.setState({isAdded:<div className='text-success'>Supplier Added Successfully</div>},console.log(res)) 
                    else
                    this.setState({isAdded:<div className='text-danger'>Some error occured!!!</div>},console.log(res)) 
                })
                .catch(err => (console.log(err)));
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
        const { nameerror, productserror, emailerror, contacterror } = this.state.errors;
        return (<div>
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h4 className="text-primary text-center">Fill the Form</h4>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text"
                                    className={`form-control ${nameerror ? style.error : null}`}
                                    name='name'
                                    placeholder='Enter Supplier Name'
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                />
                                <small className="text-danger">{nameerror}</small>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    className={`form-control ${productserror ? style.error : null}`}
                                    placeholder='Enter Supplier Products'
                                    name='products'
                                    onChange={this.handleChange}
                                    value={this.state.products}
                                />
                                <small className="text-danger">{productserror}</small>
                            </div>
                            <div className="form-group">
                                <input type="email"
                                    className={`form-control ${emailerror ? style.error : null}`}
                                    placeholder='Enter Supplier Email ID'
                                    name='email'
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                />
                                <small className="text-danger">{emailerror}</small>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    className={`form-control ${contacterror ? style.error : null}`}
                                    placeholder='Enter Supplier Contact No'
                                    name='contact'
                                    onChange={this.handleChange}
                                    value={this.state.contact}
                                />
                                <small className="text-danger">{contacterror}</small>
                            </div>
                            <div className="text-center">
                                <input type="submit" className='btn btn-md btn-primary' value='Add' />
                            </div>
                            <h6 className="mt-2 text-center">{ this.state.isAdded }</h6>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>);
    }
}

export default SupplierAdd;