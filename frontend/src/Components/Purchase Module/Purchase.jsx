import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class Purchase extends Component {
    state = {
        productlist: [],
        productsize: [],
        producttype: [],
        added:[],
        psize: '',
        isAdded: '',
        pquantity: '',
        errors: {}

    }
    componentDidMount = () => {
        axios.get('http://localhost:5000/purchase')
            .then(res => {
                this.setState({ productlist: res.data });
            })
            .catch(err => { console.log(err) });
        this.setState({ isAdded: '' });

    };
    getSize = (id) => {
        axios.post('http://localhost:5000/getsize', { pid: id })
            .then(res => {
                this.setState({ productsize: res.data });
            })
            .catch(err => console.log(err));
    }
    getProductType = () => {
        axios.get('http://localhost:5000/getproducttype')
            .then(res => { this.setState({ producttype: res.data }) })
            .catch(err => console.log(err));
    }
    sortProduct = (e) => {
        if (e.target.value === 'none')
            window.location.reload();
        axios.post('http://localhost:5000/sortproduct', { type: e.target.value })
            .then(res => { this.setState({ productlist: res.data }) })
            .catch(err => console.log(err));
    }

    searchProduct = (e) => {
        axios.post('http://localhost:5000/searchproduct', { name: e.target.value })
            .then(res => { this.setState({ productlist: res.data }) })
            .catch(err => console.log(err));
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    addtoCart = (id, name, sname,index) => {
        const { psize, pquantity } = this.state;
        const data = {
            pid: id,
            pname: name,
            psize: psize,
            pquantity: pquantity,
            sname: sname
        }
        axios.post('http://localhost:5000/addtocart', data)
            .then(res => {
                let added=[...this.state.added];
                if (res.data === "") {
                    this.setState({ isAdded: "Select catagory and Quantity" });
                }
                else if(res.data==='ok'){
                    added[index]=<div className='text-success'>Item Added</div>
                }
                else{
                    added[index]=<div className='text-danger'>Error !</div>
                }
                this.setState({added});
            })
            .catch(err => console.log(err));

        this.setState({
            psize: '',
            pquantity: '',
            isAdded: ''
        });
    }

    removeProduct=(id)=>{
        axios.post('http://localhost:5000/removeproduct',{pid:id})
        .then(res=>{
            if(res.status===200)
            window.location.reload();
        })
        .catch(err=>console.log(err));
    } 

    render() {
        return (
            <div className='container-fluid'>
                <div className="row text-center mt-3">
                    <div className="col-md-3">
                        <input type="text" name='search' onChange={this.searchProduct} className='form-control' placeholder='Search By Name' />
                    </div>
                    <div className="col-md-3">
                        <select className={`form-control`} onMouseEnter={this.getProductType} onChange={this.sortProduct}>
                            <option value='none'>Sort By</option>
                            {
                                this.state.producttype.map((type, index) =>
                                    <option value={type.product_type} key={index}>
                                        {type.product_type}
                                    </option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col-md-3">
                        <Link to='/fixamount' className='btn btn-md btn-primary'>Fix Amount</Link>
                    </div>
                    <div className="col-md-3">
                        <Link to='/purchaseorder' className='btn btn-md btn-success'>Order Details</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className='table mt-2'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Product Size</th>
                                    <th>Quantity</th>
                                    <th>Supplier Name</th>
                                    <th>Purchase</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.productlist.map((products,i) =>
                                    <tr key={products.product_id}>
                                        <td>{products.product_id}</td>
                                        <td>{products.product_name}</td>
                                        <td onClick={() => this.getSize(products.product_id)}>
                                            <select name="psize" className={`form-control`} onChange={this.handleChange}>
                                                <option value="none">Select Size</option>
                                                {
                                                    this.state.productsize.map((size, index) =>
                                                        <option value={size.size} key={index}>{size.size}</option>

                                                    )
                                                }
                                            </select>
                                        </td>
                                        <td><input
                                            type="text"
                                            name="pquantity"
                                            className={`form-control`}
                                            placeholder='Quantity of the product'
                                            onChange={this.handleChange}
                                        />
                                        </td>
                                        <td>{products.supplier_name}</td>
                                        <td>
                                            <div className="row">
                                                <div className="col-md-4">
                                                <input type="submit" className='btn btn-sm btn-success' onClick={() => this.addtoCart(products.product_id, products.product_name, products.supplier_name,i)} value='Add to cart' />
                                            <small>{this.state.added[i]}</small>
                                                </div>
                                                <div className="col-md-4">
                                                    <Link to='/purchaseedit' className='btn btn-sm btn-warning' onClick={()=>this.props.getProductId(products.product_id)}>Edit</Link>
                                                </div>
                                                <div className="col-md-4">
                                                    <input type="button" onClick={()=>this.removeProduct(products.product_id)}className='btn btn-sm btn-danger' value='Remove'/>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <h6 className="text-danger text-center">{this.state.isAdded}</h6>
                    </div>
                </div>
                <div className="text-center">
                    <Link to='/addproducts' className='btn btn-primary btn-md mb-2'>Add Products</Link>
                </div>

            </div>
        )
    }
}
