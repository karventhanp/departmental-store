import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class Account extends Component {
    render() {
        return (
            <div className='container'>
                <div className="row text-center mt-3">
                    <div className="col-md-6">
                    <Link className='btn btn-md btn-primary' to='/employee'>Employee Data</Link>
                    </div>
                    <div className="col-md-6">
                        <Link className='btn btn-md btn-success' to='/expenses'>Other Expenses</Link>
                    </div>
                </div>                
            </div>
        )
    }
}
