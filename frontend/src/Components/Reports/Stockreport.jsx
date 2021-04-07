import React, { Component } from 'react'
import axios from 'axios';
import jsPDF from 'jspdf';
import "jspdf-autotable";
export default class Stockreport extends Component {
    state = {
        report: []
    }
    componentDidMount = () => {
        axios.get('http://localhost:5000/stockreport')
            .then(res => (this.setState({ report: res.data })))
            .catch(err => console.log(err));
    }
    exportPDF=()=>{
        const unit='pt';
        const size='A3';
        const orientation='portrait';
        const marginLeft=380;
        const doc=new jsPDF(orientation,unit,size);
        doc.setFontSize(15);
        const title="Stock Report";
        const headers=[["ProductID","ProductName","ProductWeight","InStock","PerQuantity","TotalAmount","Date of Purchase","SupplierName"]];
        const data=this.state.report.map(p=>[p.product_id,p.product_name,p.product_size,p.quantity,p.per_quantity,p.amount,new Date(p.date_of_purchase).toDateString(),p.supplier_name]);
        let content={
            startY:50,
            head:headers,
            body:data
        };
        doc.text(title,marginLeft,40);
        doc.autoTable(content);
        doc.save("stockreport.pdf");
    }
    getProduct=(e)=>{
        let name=e.target.value;
        axios.post('http://localhost:5000/stockreportsearch',{name:name})
        .then(res=>this.setState({report:res.data}))
        .catch(err=>console.log(err));
    }
    render() {
        return (
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="text-center text-primary mt-3 mb-3">Stock Report</h4>
                        <div className="form-group">
                            <input type="text"
                            className='form-control col-md-4'
                            placeholder="Search By Name"
                            onChange={this.getProduct}
                            />
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ProductID</th>
                                    <th>ProductName</th>
                                    <th>ProductWeight</th>
                                    <th>InStock</th>
                                    <th>PerQuantity</th>
                                    <th>TotalAmount</th>
                                    <th>Date of Purchase</th>
                                    <th>SupplierName</th>
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
                                            <td>{p.per_quantity}</td>
                                            <td>{p.amount}</td>
                                            <td>{new Date(p.date_of_purchase).toDateString()}</td>
                                            <td>{p.supplier_name}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="text-center mt-2">
                            <button onClick={this.exportPDF} className='btn btn-md btn-danger'>Download Stock Report(.pdf)</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
