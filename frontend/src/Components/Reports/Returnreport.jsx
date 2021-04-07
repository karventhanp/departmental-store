import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import "jspdf-autotable";

export default class Returnreport extends Component {
    state = {
        report: []
    }
    componentDidMount = () => {
        axios.get('http://localhost:5000/returnreport')
            .then(res => this.setState({ report: res.data }))
            .catch(err => console.log(err));
    }

    exportPDF=()=>{
        const unit = 'pt';
            const size = 'A3';
            const orientation = 'portrait';
            const marginLeft = 380;
            const doc = new jsPDF(orientation, unit, size);
            doc.setFontSize(15);
            const title = "Returned Products Report";
            const headers = [["ProductID", "ProductName", "ProductWeight", "Quantity", "Amount","Return Mode","Return Date","SupplierName or CustomerName","Phone NUmber"]];
            const data = this.state.report.map(p => [p.pid, p.pname, p.psize, p.pquantity, p.pamount,p.return_type,new Date(p.date).toLocaleDateString(),p.name,p.phno]);
            let content = {
                startY: 50,
                head: headers,
                body: data
            };
            doc.text(title, marginLeft, 40);
            doc.autoTable(content);
            doc.save("returnproductsreport.pdf");

    }
    render() {
        return (
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="text-center text-primary mt-3 mb-3">Returned Products Report</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ProductID</th>
                                    <th>ProductName</th>
                                    <th>ProductWeight</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                    <th>Return Mode</th>
                                    <th>Return Date</th>
                                    <th>Supplier or Customer Name</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.report.map((p, i) => (
                                        <tr key={i}>
                                            <th>{p.pid}</th>
                                            <td>{p.pname}</td>
                                            <td>{p.psize}</td>
                                            <td>{p.pquantity}</td>
                                            <td>{p.pamount}</td>
                                            <td>{p.return_type}</td>
                                            <td>{new Date(p.date).toLocaleDateString()}</td>
                                            <td>{p.name}</td>
                                            <td>{p.phno}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="text-center mt-3">
                            <button className='btn btn-md btn-danger' onClick={this.exportPDF}>Download ReturnProducts Report(.pdf)</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
