import React, { Component } from 'react'
import axios from 'axios';
import jsPDF from 'jspdf';
import "jspdf-autotable";
export default class Productreport extends Component {
    state={
        report:[]
    }
    componentDidMount=()=>{
        axios.get('http://localhost:5000/productreport')
        .then(res=>this.setState({report:res.data}))
        .catch(err=>console.log(err));
    }
    exportPDF=()=>{
        const unit='pt';
        const size='A4';
        const orientation='portrait';
        const marginLeft=250;
        const doc=new jsPDF(orientation,unit,size);
        doc.setFontSize(15);
        const title="Product Report";
        const headers=[["ProductID","ProductName","Category","ProductWeight","Amount","ExpiryDate"]];
        const data=this.state.report.map(p=>[p.product_id,p.product_name,p.product_type,p.size,p.amount,p.expiry_date]);
        let content={
            startY:50,
            head:headers,
            body:data
        };
        doc.text(title,marginLeft,40);
        doc.autoTable(content);
        doc.save("productreport.pdf");
    }

    getProduct=(e)=>{
        let name=e.target.value;
        axios.post('http://localhost:5000/fixamountsearch',{name:name})
        .then(res=>{this.setState({report:res.data})})
        .catch(err=>console.log(err));
    }
    render() {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="text-center text-primary mb-3">Product Report</h4>
                        <div className="form-group">
                            <input type="text"
                            className='form-control col-md-4'
                            placeholder='Search By Name'
                            onChange={this.getProduct}
                            />
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>ProductID</th>
                                    <th>ProductName</th>
                                    <th>Category</th>
                                    <th>ProductWeight</th>
                                    <th>Amount</th>
                                    <th>Expiry Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.report.map((p,i)=>(
                                        <tr key={i}>
                                            <th>{p.product_id}</th>
                                    <td>{p.product_name}</td>
                                    <td>{p.product_type}</td>
                                    <td>{p.size}</td>
                                    <td>{p.amount}</td>
                                    <td>{p.expiry_date}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="text-center mt-2">
                            <button onClick={this.exportPDF} className='btn btn-md btn-danger'>Download Product Report(.pdf)</button>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
