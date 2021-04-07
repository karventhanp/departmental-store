import React, { Component } from 'react'
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default class Employeereport extends Component {
    state = {
        report: []
    }
    componentDidMount = () => {
        axios.get('http://localhost:5000/employeereport')
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
        const title="Employee Report";
        const headers=[["Employee ID","Employee Name","Employee Phno","Employee Address"]];
        const data=this.state.report.map(p=>[p.emp_id,p.emp_name,p.emp_phno,p.emp_address]);
        let content={
            startY:50,
            head:headers,
            body:data
        };
        doc.text(title,marginLeft,40);
        doc.autoTable(content);
        doc.save("employeereport.pdf");
    }

    getEmployeename=(e)=>{
        let name=e.target.value;
        axios.post('http://localhost:5000/employeereportsearch',{name:name})
        .then(res=>this.setState({report:res.data}))
        .catch(err=>console.log(err));
    }

    render() {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="text-center text-primary mt-3 mb-3">Employee Report</h4>
                        <div className="form-group">
                            <input type="text"
                            placeholder='Search By Name'
                            className='form-control col-md-4'
                            onChange={this.getEmployeename}
                            />
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Employee Name</th>
                                    <th>Employee Phno</th>
                                    <th>Employee Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.report.map((e, i) => (
                                        <tr key={i}>
                                            <th>{e.emp_id}</th>
                                            <td>{e.emp_name}</td>
                                            <td>{e.emp_phno}</td>
                                            <td>{e.emp_address}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="text-center mt-3">
                            <button className='btn btn-md btn-danger' onClick={this.exportPDF}>Download Employee Report(.pdf)</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
