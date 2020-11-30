import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Supplier from './Components/Supplier Module/Supplier';
import SupplierEdit from './Components/Supplier Module/SupplierEdit';
import SupplierAdd from './Components/Supplier Module/SupplierAdd';
import Purchase from './Components/Purchase Module/Purchase';
import PurchaseAdd from './Components/Purchase Module/PurchaseAdd';
import PurchaseOrder from './Components/Purchase Module/PurchaseOrder';
import PurchaseEdit from './Components/Purchase Module/PurchaseEdit';
import FixAmount from './Components/Purchase Module/FixAmount';
import Stock from './Components/Stock Module/Stock';
import StockMore from './Components/Stock Module/StockMore';
import Sales from './Components/Sale and Billing Module/Sales';
import Billing from './Components/Sale and Billing Module/Billing';
import Cart from './Components/Cart Details Module/Cart';
import Productreturn from './Components/Product Return Module/Productreturn';
import Preturn from './Components/Product Return Module/Preturn';
import Sreturn from './Components/Product Return Module/Sreturn';
import Account from './Components/Account Module/Account';
import Employee from './Components/Account Module/Employee';
import Expenses from './Components/Account Module/Expenses';
import Login from './Components/Login';
import Logout from './Components/Logout';
class App extends Component {
  state = {
    supplier: {},
    purchase_pid: '',
    stockmore_id: '',
    stockmore_name: '',
    isLoggedin: false
  }
  componentDidMount = () => {
    const a = localStorage.getItem('isLoggedin');
    if (a === 'true') {
      this.setState({ isLoggedin: true })
    } else {
      this.setState({ isLoggedin: false });
    }
  }

  supplierData = (data) => {
    this.setState({ supplier: data });
  }

  getProductId = (id) => {
    this.setState({ purchase_pid: id });
  }

  getStockMoreId = (id, name) => {
    this.setState({ stockmore_id: id, stockmore_name: name });
  }
  render() {
    const { isLoggedin } = this.state;
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route path='/' exact><Home /></Route>
            <Route path='/supplier'>
              {
                isLoggedin ? <Supplier passSupplierdata={this.supplierData} /> : <Redirect to='/login' />
              }
            </Route>
            <Route path='/supplieredit'>
              {
                isLoggedin ? <SupplierEdit supplierData={this.state.supplier} /> : <Redirect to='/login' />
              }
            </Route>
            <Route path='/supplieradd'>
              {
                isLoggedin ? <SupplierAdd /> : <Redirect to='/login' />
              }
            </Route>
            <Route path='/purchase'>
              {
                isLoggedin ? <Purchase getProductId={this.getProductId} /> : <Redirect to='/login' />
              }              
            </Route>
            <Route path='/addproducts'>
              {
                isLoggedin ? <PurchaseAdd /> : <Redirect to='/login' />
              }
            </Route>
            <Route path='/purchaseorder'>
              {
                isLoggedin ? <PurchaseOrder /> : <Redirect to='/login' />
              }
              </Route>
            <Route path='/purchaseedit'>
              {
                isLoggedin ? <PurchaseEdit productId={this.state.purchase_pid} /> :<Redirect to='/login' />
              }              
            </Route>
            <Route path='/fixamount'>
              {
                isLoggedin ? <FixAmount /> : <Redirect to='/login' />
              }
              </Route>
            <Route path='/stock'>
              {
                isLoggedin ? <Stock getStockMoreId={this.getStockMoreId} /> : <Redirect to='/login' />
              }              
            </Route>
            <Route path='/stockmore'>
              {
                isLoggedin ? <StockMore
                              passStockMoreId={this.state.stockmore_id}
                              passStockMoreName={this.state.stockmore_name}
                              />                                              : <Redirect to='/login' />
              }              
            </Route>
            <Route path='/sales'><Sales /></Route>
            <Route path='/billing'><Billing /></Route>
            <Route path='/cart'><Cart /></Route>
            <Route path='/return'><Productreturn /></Route>
            <Route path='/preturn'><Preturn /></Route>
            <Route path='/sreturn'><Sreturn /></Route>
            <Route path='/account'>
              {
                isLoggedin ? <Account /> : <Redirect to='/login' />
              }
              </Route>
            <Route path='/employee'>
              {
                isLoggedin ? <Employee /> : <Redirect to='/login' />
              }
              </Route>
            <Route path='/expenses'>
              {
                isLoggedin ? <Expenses /> : <Redirect to='/login' />
              }
              </Route>
            <Route path='/login'>
              {
                isLoggedin ? <Redirect exact to='/' /> : <Login />
              }
            </Route>
            <Route path='/logout'>
              {
                isLoggedin ? <Logout /> : <Redirect to='/login' />
              }
            </Route>
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;