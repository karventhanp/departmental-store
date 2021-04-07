import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import "jspdf-autotable";
export default class Purchasereport extends Component {
    state = {
        month: [],
        year: [],
        month1: '',
        year1: '',
        report: [],
        error: ''
    }

    getMonth = () => {
        axios.get('http://localhost:5000/preportmonth')
            .then(res => this.setState({ month: res.data }))
            .catch(err => console.log(err));
    }
    getYear = () => {
        axios.get('http://localhost:5000/preportyear')
            .then(res => this.setState({ year: res.data }))
            .catch(err => console.log(err));
    }

    getData1 = (e) => {
        this.setState({ month1: e.target.value });
    }

    getData2 = (e) => {
        this.setState({ year1: e.target.value });
    }

    accessAllowed = () => {
        const { month1, year1 } = this.state;
        axios.post('http://localhost:5000/preport', { month: month1, year: year1 })
            .then(res => this.setState({ report: res.data }))
            .catch(err => console.log(err));
    }

    exportPDF = () => {
        if (this.state.report.length === 0) {
            let error = <h5 className="text-center text-danger mt-3">Empty Table</h5>
            this.setState({ error });
        }
        else {
            const unit = 'pt';
            const size = 'A3';
            const orientation = 'portrait';
            const marginLeft = 380;
            const doc = new jsPDF(orientation, unit, size);
            doc.setFontSize(15);
            const title = "Purchase Report";
            const headers = [["ProductID", "ProductName", "ProductWeight", "Quantity", "Amount", "SupplierName", "Date of Purchase"]];
            const data = this.state.report.map(p => [p.product_id, p.product_name, p.product_size, p.quantity, p.amount, p.supplier_name, new Date(p.date_of_purchase).toDateString()]);
            let content = {
                startY: 50,
                head: headers,
                body: data
            };
            doc.text(title, marginLeft, 40);
            doc.autoTable(content);
            doc.save("purchasereport.pdf");

            this.setState({ error: '' })
        }

    }

    render() {
        const { month1, year1 } = this.state;
        if (month1 !== '' && year1 !== '') {
            this.accessAllowed();
            this.setState({ month1: '', year1: '' })
        }
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="text-center text-primary mt-3 mb-3">Purchase Report</h4>
                        <div className="row">
                            <div className="form-group">
                                <select name="month" className='form-control' onClick={this.getMonth} onChange={this.getData1}>
                                    <option value="none">Select Month</option>
                                    {
                                        this.state.month.map((m, i) => (
                                            <option value={m.month} key={i}>{m.month}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <select name="year" className='form-control ml-5' onClick={this.getYear} onChange={this.getData2}>
                                    <option value="none">Select Year</option>
                                    {
                                        this.state.year.map((y, i) => (
                                            <option value={y.year} key={i}>{y.year}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ProductID</th>
                                    <th>ProductName</th>
                                    <th>ProductWeight</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                    <th>SupplierName</th>
                                    <th>Date of Purchase</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.report.map((p, i) => (
                                        <tr key={i}>
                                            <th>{p.product_id}</th>
                                            <td>{p.product_name}</td>
                                            <td>{p.product_size}</td>
                                            <td>{p.quantity}</td>
                                            <td>{p.amount}</td>
                                            <td>{p.supplier_name}</td>
                                            <td>{new Date(p.date_of_purchase).toDateString()}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="text-center mt-3">
                            <button className='btn btn-md btn-danger' onClick={this.exportPDF}>Download Purchase Report(.pdf)</button>
                        </div>
                        {this.state.error}

                    </div>
                </div>

            </div>
        )
    }
}
