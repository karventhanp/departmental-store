import Axios from 'axios';
import React, { Component } from 'react'
class Cart extends Component {
    state = { 
        cart:[],
        isDeleted:[]
     }
     componentDidMount=()=>{
         Axios.get('http://localhost:5000/getcartsystem')
         .then(res=>{this.setState({cart:res.data})})
         .catch(err=>console.log(err));
     }

     remove=(item,index)=>{
         Axios.delete(`http://localhost:5000/removecartsystem/${item.id}`)
         .then(res=>{
             let isDeleted=[...this.state.isDeleted];
             if(res.data==='success'){
                 isDeleted[index]=<div className='text-success'>Removed</div>
             }
             else{
                isDeleted[index]=<div className='text-danger'>Some error occured!</div>
             }
             this.setState({isDeleted});
         })
         console.log(item);

     }

    render() { 
        return ( <div className='container'>
            <div className="row">
                <div className="col-md-12">
                    <h6 className="text-primary mt-2 text-center">Cart System</h6>
                    <table className='table'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>CustomerName</th>
                                <th>CustomerPhno</th>
                                <th>Points</th>
                                <th>LastUpdated</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cart.map((it,i)=>(
                                    <tr key={i}>
                                        <td>{it.cus_name}</td>
                                <td>{it.cus_phno}</td>
                                <td>{it.points}</td>
                                <td>{new Date(it.date).toLocaleDateString('sv-SE')}</td>
                                <td>
                                    <input type="button" className='btn btn-sm btn-danger' value='Remove'
                                    onClick={()=>this.remove(it,i)}
                                    />
                                    <small>{this.state.isDeleted[i]}</small>
                                </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            </div>

        </div> );
    }
}
 
export default Cart;