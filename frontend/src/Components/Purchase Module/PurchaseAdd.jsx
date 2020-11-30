import React, { Component } from 'react';
import axios from 'axios';
import style from '../Css/purchase.module.css';
class PurchaseAdd extends Component {
    state = {
        category: [],
        textbox: [
            { id: 0, sname: 'size2', splaceholder: 'Product size 2', small: 'For example: half [kg packet,liter packet,medium size,etc..]', aname: 'amount2', aplaceholder: 'Product size 2 amount' },
            { id: 1, sname: 'size3', splaceholder: 'Product size 3', small: 'For example: one [kg packet,liter packet,medium size,etc..]', aname: 'amount3', aplaceholder: 'Product size 3 amount' },
            { id: 2, sname: 'size4', splaceholder: 'Product size 4', small: 'For example: two [kg packet,liter packet,medium size,etc..]', aname: 'amount4', aplaceholder: 'Product size 4 amount' },
            { id: 3, sname: 'size5', splaceholder: 'Product size 5', small: 'For example: five [kg packet,liter packet,medium size,etc..]', aname: 'amount5', aplaceholder: 'Product size 5 amount' },
        ],
        textbox1: [],
        textboxcount: 0,
        pname: '',
        cat: '',
        expiry:'',
        size1: '',
        amount1: '',
        size2: '',
        amount2: '',
        size3: '',
        amount3: '',
        size4: '',
        amount4: '',
        size5: '',
        amount5: '',
        errors: {},
        isAdded:''
    }
    componentDidMount = () => {
        axios.get('http://localhost:5000/selectcategory')
            .then(res => {
                this.setState({ category: res.data }, console.log(res.data));
            })
            .catch(err => console.log(err));

    }
    addTextbox = () => {
        this.setState({
            textbox1: [...this.state.textbox1, this.state.textbox[this.state.textboxcount]],
            textboxcount: this.state.textboxcount + 1
        });
    }
    removeTextbox = (index) => {
        const { textboxcount } = this.state;
        var a = [...this.state.textbox1];
        a.splice(index, 1);
        this.setState({ textbox1: a, textboxcount: textboxcount - 1 });

    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value.toLowerCase() })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { textboxcount, pname, cat,expiry, size1, amount1, size2, amount2, size3, amount3, size4, amount4, size5, amount5 } = this.state;
        if (pname === "") {
            this.setState({ errors: { pnameerr: "Product name is required!" } });
            return
        }
        if (cat === "") {
            this.setState({ errors: { caterr: "Select category of the product!" } });
            return
        }
        if(expiry===''){
            this.setState({errors:{expiryerr:"Enter expiry date!"}});
            return
        }
        if (textboxcount === 0) {
            if (size1 === "") {
                this.setState({ errors: { size1err: "Enter the product size1!" } });
                return
            }
            else if (amount1 === "") {
                this.setState({ errors: { amount1err: "Enter the amount of the product!" } });
                return
            }
            else{
                axios.post('http://localhost:5000/addproducts',{pname,cat,expiry,size1,amount1})
                .then(res=>{
                    if(res.status===200)
                    this.setState({isAdded:<div className='text-success'>Product Added Successfully</div>},console.log(res)) 
                    else
                    this.setState({isAdded:<div className='text-danger'>Some error occured!!!</div>},console.log(res)) 
                })
                .catch(err=>console.log(err));
            }
        }
        if (textboxcount === 1) {
            if (size1 === "") {
                this.setState({ errors: { size1err: "Enter the product size1!" } });
                return
            }
            else if (amount1 === "") {
                this.setState({ errors: { amount1err: "Enter the amount of the product!" } });
                return
            }
            else if (size2 === "") {
                this.setState({ errors: { size2err: "Enter the product size2!" } });
                return
            }
            else if (amount2 === "") {
                this.setState({ errors: { amount2err: "Enter the amount of the product!" } });
                return
            }
            else{
                axios.post('http://localhost:5000/addproducts',{pname,cat,expiry,size1,amount1,size2,amount2})
                .then(res=>{
                    if(res.status===200)
                    this.setState({isAdded:<div className='text-success'>Product Added Successfully</div>},console.log(res)) 
                    else
                    this.setState({isAdded:<div className='text-danger'>Some error occured!!!</div>},console.log(res)) 
                })
                .catch(err=>console.log(err));
            }
        }
        if (textboxcount === 2) {
            if (size1 === "") {
                this.setState({ errors: { size1err: "Enter the product size1!" } });
                return
            }
            else if (amount1 === "") {
                this.setState({ errors: { amount1err: "Enter the amount of the product!" } });
                return
            }
            else if (size2 === "") {
                this.setState({ errors: { size2err: "Enter the product size2!" } });
                return
            }
            else if (amount2 === "") {
                this.setState({ errors: { amount2err: "Enter the amount of the product!" } });
                return
            }
            else if (size3 === "") {
                this.setState({ errors: { size3err: "Enter the product size3!" } });
                return
            }
            else if (amount3 === "") {
                this.setState({ errors: { amount3err: "Enter the amount of the product!" } });
                return
            }
            else{
                axios.post('http://localhost:5000/addproducts',{pname,cat,expiry,size1,amount1,size2,amount2,size3,amount3})
                .then(res=>{
                    if(res.status===200)
                    this.setState({isAdded:<div className='text-success'>Product Added Successfully</div>},console.log(res)) 
                    else
                    this.setState({isAdded:<div className='text-danger'>Some error occured!!!</div>},console.log(res)) 
                })
                .catch(err=>console.log(err));
            }
        }
        if (textboxcount === 3) {
            if (size1 === "") {
                this.setState({ errors: { size1err: "Enter the product size1!" } });
                return
            }
            else if (amount1 === "") {
                this.setState({ errors: { amount1err: "Enter the amount of the product!" } });
                return
            }
            else if (size2 === "") {
                this.setState({ errors: { size2err: "Enter the product size2!" } });
                return
            }
            else if (amount2 === "") {
                this.setState({ errors: { amount2err: "Enter the amount of the product!" } });
                return
            }
            else if (size3 === "") {
                this.setState({ errors: { size3err: "Enter the product size3!" } });
                return
            }
            else if (amount3 === "") {
                this.setState({ errors: { amount3err: "Enter the amount of the product!" } });
                return
            }
            else if (size4 === "") {
                this.setState({ errors: { size4err: "Enter the product size4!" } });
                return
            }
            else if (amount4 === "") {
                this.setState({ errors: { amount4err: "Enter the amount of the product!" } });
                return
            }
            else{
                axios.post('http://localhost:5000/addproducts',{pname,cat,expiry,size1,amount1,size2,amount2,size3,amount3,size4,amount4})
                .then(res=>{
                    if(res.status===200)
                    this.setState({isAdded:<div className='text-success'>Product Added Successfully</div>},console.log(res)) 
                    else
                    this.setState({isAdded:<div className='text-danger'>Some error occured!!!</div>},console.log(res)) 
                })
                .catch(err=>console.log(err));
            }
        }
        if (textboxcount === 4) {
            if (size1 === "") {
                this.setState({ errors: { size1err: "Enter the product size1!" } });
                return
            }
            else if (amount1 === "") {
                this.setState({ errors: { amount1err: "Enter the amount of the product!" } });
                return
            }
            else if (size2 === "") {
                this.setState({ errors: { size2err: "Enter the product size2!" } });
                return
            }
            else if (amount2 === "") {
                this.setState({ errors: { amount2err: "Enter the amount of the product!" } });
                return
            }
            else if (size3 === "") {
                this.setState({ errors: { size3err: "Enter the product size3!" } });
                return
            }
            else if (amount3 === "") {
                this.setState({ errors: { amount3err: "Enter the amount of the product!" } });
                return
            }
            else if (size4 === "") {
                this.setState({ errors: { size4err: "Enter the product size4!" } });
                return
            }
            else if (amount4 === "") {
                this.setState({ errors: { amount4err: "Enter the amount of the product!" } });
                return
            }
            else if (size5 === "") {
                this.setState({ errors: { size5err: "Enter the product size5!" } });
                return
            }
            else if (amount5 === "") {
                this.setState({ errors: { amount5err: "Enter the amount of the product!" } });
                return
            }
            else{
                axios.post('http://localhost:5000/addproducts',{pname,cat,expiry,size1,amount1,size2,amount2,size3,amount3,size4,amount4,size5,amount5})
                .then(res=>{
                    if(res.status===200)
                    this.setState({isAdded:<div className='text-success'>Product Added Successfully</div>},console.log(res)) 
                    else
                    this.setState({isAdded:<div className='text-danger'>Some error occured!!!</div>},console.log(res)) 
                })
                .catch(err=>console.log(err));
            }
        }
        console.log(this.state);
        console.log(this.state.errors);
        this.setState({
            pname: '',
            cat: '',
            expiry:'',
            size1: '',
            amount1: '',
            size2: '',
            amount2: '',
            size3: '',
            amount3: '',
            size4: '',
            amount4: '',
            size5: '',
            amount5: '',
            errors: {}

        });
    }
    render() {
        const { pnameerr, caterr, size1err, amount1err,expiryerr} = this.state.errors;
        const {textboxcount}=this.state;
        return (<div className='container'>
            <div className="row mt-2">
                <div className="col-md-12 text-center">
                    <h5 className="text-primary">Fill the form</h5>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text"
                                onChange={this.handleChange}
                                className={`form-control ${ pnameerr ? style.error : null}`}
                                placeholder='Product_name'
                                name='pname' />
                            <small className='text-danger'>{pnameerr}</small>
                        </div>
                        <div className="form-group">
                            <select name="cat" className={`form-control ${caterr ? style.error :null}`} onChange={this.handleChange}>
                                <option value="none">Select Category</option>
                                {
                                    this.state.category.map(cat => (
                                        <option value={cat.product_type} key={cat.id}>{cat.product_type}</option>
                                    ))
                                }
                            </select>
                            <small className="text-danger">{caterr}</small>
                        </div>
                        <div className="form-group">
                            <input type="text"
                             name='expiry'
                              className={`form-control ${expiryerr ? style.error: null}`}
                               onChange={this.handleChange}
                               placeholder='Enter expiry date of that product'
                               />
                               <small className="text-muted form-text">* For example : 6 months,1 year</small>
                            <small className="text-danger">{expiryerr}</small>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                onChange={this.handleChange}
                                name='size1'
                                placeholder='Product size1'
                                className={`form-control ${size1err ? style.error : null}`} />
                            <small className='text-muted form-text'>* For example : quarter [ kg packet,liter packet,small size,pack of 10 items,etc..]</small>
                            <small className="text-danger">{size1err}</small>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                onChange={this.handleChange}
                                name='amount1'
                                placeholder='Product size1 amount'
                                className={`form-control ${ amount1err ? style.error : null}`} />
                                <small className="text-danger">{amount1err}</small>
                        </div>
                        {
                            this.state.textbox1.map((textbox, index) => (
                                <div key={index}>
                                    <div className="form-group">
                                        <input type="text"
                                            onChange={this.handleChange}
                                            name={textbox.sname}
                                            placeholder={textbox.splaceholder}
                                            className={`form-control`} />
                                        <small className='text-muted form-text'>* {textbox.small}</small>
                                    </div>
                                    <div className="form-group">
                                        <input type="text
                                        " onChange={this.handleChange}
                                            name={textbox.aname}
                                            placeholder={textbox.aplaceholder}
                                            className='form-control' />
                                    </div>
                                    <input type="button" className='btn btn-sm btn-danger mb-2' value='Remove' name='remove' onClick={() => this.removeTextbox(index)} />
                                </div>
                            ))
                        }
                        <div className="form-group">
                            <input type='button' id='addbox' className={`btn btn-sm btn-warning m-2`} onClick={this.addTextbox} value='Add TextBox' disabled={textboxcount >= 4 ? true : false} />
                        </div>
                        <div className="text-center">
                            <input type="submit" className='btn btn-md btn-success' value="Save Product" />
                        </div>
                    <h6 className='text-center m-1'>{this.state.isAdded}</h6>

                    </form>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>);
    }
}

export default PurchaseAdd;