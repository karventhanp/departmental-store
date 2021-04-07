import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import icon from './Images/icon.png';
class Navbar extends Component {
    state = {
        isLoggedin: false
    }
    componentDidMount = () => {
        const isLoggedin = localStorage.getItem('isLoggedin');
        if (isLoggedin === 'true')
            this.setState({ isLoggedin: true });
        else
            this.setState({ isLoggedin: false });
    }
    handleLogout=()=>{
        window.location.reload();
    }
    render() {
        const { isLoggedin } = this.state;
        const font = {
            fontWeight: '500'
        }
        return (<div style={font}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span><img src={icon} alt="icon" width='70%' /></span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to='/' className='nav-link'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/supplier' className='nav-link'>SupplierDetails</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/purchase' className='nav-link'>PurchaseDetails</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/stock' className='nav-link'>StockDetails</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/sales' className='nav-link'>Sales&Billing</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/cart' className='nav-link'>CartDetails</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/return' className='nav-link'>Purchase&SalesReturn</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/account' className='nav-link'>AccountMaintenance</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/reports' className='nav-link'>Reports</Link>
                        </li>
                        <li className="nav-item pl-5">
                            {
                                isLoggedin===true ?
                                    <Link to='/logout' className='nav-link' onClick={this.handleLogout}>Admin Logout</Link>
                                    :
                                    <Link to='/login' className='nav-link'>Admin Login</Link>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </div>);
    }
}

export default Navbar;