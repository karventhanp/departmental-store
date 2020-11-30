import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class Productreturn extends Component {
    render() {
        return (
            <div className='container'>
                <div className="row mt-5 text-center">
                    <div className="col-md-6">
                        <Link  to='/preturn' className='btn btn-md btn-primary'>Purchase Return</Link>
                    </div>
                    <div className="col-md-6">
                        <Link to='/sreturn' className='btn btn-md btn-success'>Sales Return</Link>
                    </div>
                </div>
                
            </div>
        )
    }
}
