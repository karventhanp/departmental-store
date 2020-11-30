import React, { Component } from 'react'
import style from './Css/sale.module.css';
import axios from 'axios';
export default class Login extends Component {
    state = {
        name: '',
        pass: '',
        isLoggedin:'',
        errors: {}
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, pass } = this.state;
        if (name === '') {
            this.setState({ errors: { nameerr: 'Admin name required !' } });
            return;
        }
        else if (pass === '') {
            this.setState({ errors: { passerr: 'Admin password required !' } });
            return;
        }
        else {
            axios.post('http://localhost:5000/login',{name:name,pass:pass})
            .then(res=>{
                let isLoggedin=this.state.isLoggedin;
            if(res.data==='accepted'){
                isLoggedin=<div className='text-success mt-2'>Success !</div>
                localStorage.setItem('isLoggedin',true);
                window.location.reload();
            }
            else{
                isLoggedin=<div className='text-danger mt-2'>Check Given name and password !</div>
                localStorage.setItem('isLoggedin',false);
            }
            this.setState({isLoggedin});
            })
            .catch(err=>console.log(err));
        }
        this.setState({
            name: '',
            pass: '',
            errors: {}
        })
    }
    render() {
        const { name, pass } = this.state;
        const { nameerr, passerr } = this.state.errors;
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 mt-3">
                        <form onSubmit={this.handleSubmit}>
                            <h5 className="text-center text-primary">Login to Continue</h5>
                            <div className="form-group">
                                <input type="text"
                                    name='name'
                                    className={`form-control ${nameerr ? style.error : null}`}
                                    placeholder='Admin name'
                                    value={name}
                                    onChange={this.handleChange}
                                />
                                <small className="text-danger">{nameerr}</small>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    name='pass'
                                    className={`form-control ${passerr ? style.error : null}`}
                                    placeholder='Admin Password'
                                    value={pass}
                                    onChange={this.handleChange}
                                />
                                <small className="text-danger">{passerr}</small>
                            </div>
                            <div className="text-center">
                                <input type="submit"
                                    value="Login"
                                    className='btn btn-md btn-success'
                                />
                            </div>
        <h5 className="text-center">{this.state.isLoggedin}</h5>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        )
    }
}
