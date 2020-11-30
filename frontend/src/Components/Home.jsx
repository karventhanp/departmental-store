import React, { Component } from 'react';
import bg from './Images/bg.jpg';
class Home extends Component {
    state = {  }
    render() { 
        const img={
            width:'98vw',
            height:'81vh'
        }
        return ( <div className='container-fluid mt-1'>
            <div className="row">
                <div className="col-md-12">
                    <div className="text-center">
                    <h3 className="text-white p-2 bg-primary">Sri Bharathi Department Store</h3>
                    </div>
                    <img src={bg} alt="background" style={img}/>
                </div>
            </div>
        </div> );
    }
}
 
export default Home;