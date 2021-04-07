import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import st from '../Css/report.module.css';
export default class Reports extends Component {
    render() {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 text-center mt-5">
                        <ul className="list-group">
                            <li className='list-group-item'><Link className={`nav-link ${st.l}`} to='/productreport'>Product Report</Link></li>
                            <li className='list-group-item'><Link className={`nav-link ${st.l}`} to='/purchasereport'>Purchase Report</Link></li>
                            <li className='list-group-item'><Link className={`nav-link ${st.l}`} to='/stockreport'>Stock Report</Link></li>
                            <li className='list-group-item'><Link className={`nav-link ${st.l}`} to='/salesreport'>Sales Report</Link></li>
                            <li className='list-group-item'><Link className={`nav-link ${st.l}`} to='/returnreport'>Returned Products Report</Link></li>
                            <li className='list-group-item'><Link className={`nav-link ${st.l}`} to='/customerreport'>Customer Report</Link></li>
                            <li className='list-group-item'><Link className={`nav-link ${st.l}`} to='/employeereport'>Employee Report</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        )
    }
}
