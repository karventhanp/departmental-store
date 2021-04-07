import React, { Component } from 'react'
import axios from 'axios';
import jsPDF from 'jspdf';
import "jspdf-autotable";
export default class Customerreport extends Component {
    state = {
        report: []
    }
    componentDidMount = () => {
        axios.get('http://localhost:5000/customerreport')
            .then(res => this.setState({ report: res.data }))
            .catch(err => console.log(err));
    }

    exportPDF=()=>{
        const unit='pt';
        const size='A4';
        const orientation='portrait';
        const marginLeft=250;
        const doc=new jsPDF(orientation,unit,size);
        doc.setFontSize(15);
        const title="Customer Report";
        const headers=[["Customer ID","Customer Name","Customer Phno"]];
        const data=this.state.report.map(p=>[p.cus_id,p.cus_name,p.cus_phno]);
        let content={
            startY:50,
            head:headers,
            body:data
        };
        doc.text(title,marginLeft,40);
        doc.autoTable(content);
        doc.save("customerreport.pdf");
    }

    getCustomer=(e)=>{
        let name=e.target.value;
        axios.post('http://localhost:5000/customerreportsearch',{name:name})
        .then(res=>this.setState({report:res.data}))
        .catch(err=>console.log(err));
    }

    render() {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="text-center text-primary mt-2 m-3">Customer Report</h4>
                        <div className="form-group">
                            <input type="text"
                            className='form-control col-md-4'
                            placeholder='Search By Name'
                            onChange={this.getCustomer}
                            />
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Customer ID</th>
                                    <th>Customer Name</th>
                                    <th>Customer Phno</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.report.map((c, i) => (
                                        <tr key={i}>
                                            <th>{c.cus_id}</th>
                                            <td>{c.cus_name}</td>
                                            <td>{c.cus_phno}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="text-center mt-3">
                            <button onClick={this.exportPDF} className='btn btn-md btn-danger'>Download Customer Report(.pdf)</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
