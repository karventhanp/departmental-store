import React, { Component } from 'react';
import style from '../Css/sale.module.css';
import axios from 'axios';
export default class Employee extends Component {

    state = {
        name: '',
        phno: '',
        emp:[],
        total:0,
        empdata:'',
        vname:'',
        vphno:'',
        address: '',
        errors: {},
        isAdded: '',
        work:'',
        oneday:''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, phno, address } = this.state;
        if (name === '') {
            this.setState({ errors: { nameerr: "Name required !" } });
            return;
        }
        else if (phno === '') {
            this.setState({ errors: { phnoerr: 'Contact no required !' } });
            return;
        }
        else if (address === '') {
            this.setState({ errors: { adderr: 'Address required !' } });
            return;
        }
        else {

            axios.post('http://localhost:5000/addemployee', { name: name, phno: phno, address: address })
                .then(res => {
                    let isAdded = this.state.isAdded;
                    if (res.status === 200) {
                        isAdded = <div className='text-success'>Employee added</div>
                    }
                    else {
                        isAdded = <div className='text-danger'>Some error occured !</div>
                    }
                    this.setState({ isAdded });
                })
                .catch(err => console.log(err));
        }
        this.setState({
            name: '',
            phno: '',
            address: '',
            errors: {},

        })
    }

    handleChange1=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

handleSubmit1=(e)=>{
    e.preventDefault();
    const {vname,vphno}=this.state;
    if(vname===''){
        this.setState({errors:{vnameerr:'Enter customer name'}});
        return;
    }
    else if(vphno===''){
        this.setState({errors:{vphnoerr:'Enter customer phno'}});
        return;
    }
    else{
        axios.post('http://localhost:5000/viewemployee',{name:vname,phno:vphno})
        .then(res=>{
            if(res.data.length===0){
                this.setState({empdata:'empty'});
            }
            else{
            this.setState({emp:res.data,empdata:''})
                
            }
        })
        .catch(err=>console.log(err));
    }
    this.setState({
        vname:'',
        vphno:'',
        errors:{}
    })
}


handleChange2=(e)=>{
    this.setState({[e.target.name]:e.target.value});
}

handleSubmit2=(e)=>{
    e.preventDefault();
    const {work,oneday}=this.state;
    if(work===''){
        this.setState({errors:{workerr:'Enter total working days'}});
        return;
    }
    else if(oneday===''){
        this.setState({errors:{onedayerr:'Enter one day salary'}});
        return;
    }
    else{
        let total=this.state.total;
        total=parseFloat(work)*parseFloat(oneday);
        this.setState({total});
    }
}
    render() {
        const { name, phno, address,vname,vphno,work,oneday,total } = this.state;
        const { nameerr, phnoerr, adderr,vnameerr,vphnoerr,workerr,onedayerr } = this.state.errors;
        return (
            <div className='container-fluid'>
                <div className="row mt-2">
                    <div className="col-md-4">
                        <h5 className="text-center text-primary">Add Employee</h5>
                        <form>
                            <div className="form-group">
                                <input type="text"
                                    name='name'
                                    className={`form-control ${nameerr ? style.error : null}`}
                                    value={name}
                                    onChange={this.handleChange}
                                    placeholder='Employee name'
                                />
                                <small className="text-danger">{nameerr}</small>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    name='phno'
                                    className={`form-control ${phnoerr ? style.error : null}`}
                                    value={phno}
                                    onChange={this.handleChange}
                                    placeholder='Employee contact no'
                                />
                                <small className="text-danger">{phnoerr}</small>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    name='address'
                                    className={`form-control ${adderr ? style.error : null}`}
                                    value={address}
                                    onChange={this.handleChange}
                                    placeholder='Employee address'
                                />
                                <small className="text-danger">{adderr}</small>
                            </div>
                            <div className="text-center">
                                <input type="submit"
                                    onClick={this.handleSubmit}
                                    className='btn btn-md btn-success'
                                    value='save'
                                />
                            </div>
        <h6 className="text-center">{this.state.isAdded}</h6>
                        </form>
                    </div>
                    <div className="col-md-4">
                        <h5 className="text-center text-primary">View Employee Data</h5>
                        <form onSubmit={this.handleSubmit1}>
                            <div className="form-group">
                                <input type="text"
                                name='vname'
                                className={`form-control ${vnameerr ? style.error : null}`}
                                placeholder='Employee name'
                                value={vname}
                                onChange={this.handleChange1}
                                />
                                <small className='text-danger'>{vnameerr}</small>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                name='vphno'
                                className={`form-control ${vphnoerr ? style.error : null}`}
                                placeholder='Employee Phno'
                                value={vphno}
                                onChange={this.handleChange1}
                                />
                                <small className='text-danger'>{vphnoerr}</small>
                            </div>
                            <div className="text-center">
                                <input type="submit"
                                value='View'
                                className='btn btn-md btn-success'
                                />
                            </div>
                        </form>
                        {
                            this.state.empdata==='empty' ? <h6 className='text-center text-danger'>No more data</h6> :
                            <table className='table mt-2'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phno</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.emp.map((e,i)=>(
                                            <tr key={i}>
                                                <td>{e.emp_name}</td>
                                        <td>{e.emp_phno}</td>
                                        <td>{e.emp_address}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                    <div className="col-md-4">
                        <h5 className="text-center text-primary">Calculate Salary</h5>
                        <form onSubmit={this.handleSubmit2}>
                            <div className="form-group">
                                <input type="text"
                                name='work'
                                placeholder='Enter total working day'
                                value={work}
                                onChange={this.handleChange2}
                                className={`form-control ${workerr ? style.error : null}`}
                                />
                                <small className="text-danger">{workerr}</small>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                name='oneday'
                                placeholder='Enter one day salary'
                                value={oneday}
                                onChange={this.handleChange2}
                                className={`form-control ${ onedayerr ? style.error : null}`}
                                />
                                <small className='text-danger'>{onedayerr}</small>
                            </div>
                            <div className="text-center">
                                <input type="submit"
                                value='Generate'
                                className='btn btn-md btn-success'
                                />
                            </div>
                    <h4 className="text-primary">Total Salary : {total}</h4>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}
