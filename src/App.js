import React , { useState } from 'react';
import { BrowserRouter , Route , Switch , Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import Navi from './Components.js/Navi';
import Login from './Components.js/Login';
import Workshops from './Components.js/Workshops';
import ShopInfo from './Components.js/ShopInfo';
import Footer from './Components.js/Footer';

function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState();
  const [basket, setBasket] = useState([]);
  const [showCheckOut, setShowCheckout] = useState(false);
  const [workshop, setWorkshop] = useState(false);
  const checkAuth = (auth) => {
    if (auth) {
      setAuth(true);
    }
    else {
      setAuth(false);
    }
  }
  const addToBasket = (e) => {
    setBasket(basket => [...basket, Number(e)])
  }

  const removeFromBasket = (arr) => {
    setBasket(arr)
  }
  const clearBasket = () => {
    setBasket([])
  }

  const setUserName = (user) => {
    let name = user.split(' ');
    setUser(name[0]);
  } 
  const showModal = () => {
    setShowCheckout(!showCheckOut);
  }
  const getWorkshop = (item) => {
    setWorkshop(item);
  }
  console.log(basket);
  return (
    <div className="App">
      <BrowserRouter>
        {auth && <Navi basket={basket} removeFromBasket={removeFromBasket} user={user} showModal={showModal}/>}
        <Switch>
          <Route exact path="/login"><Login checkAuth={checkAuth} auth={auth} setUserName={setUserName}/></Route>
          <Route exact path="/workshops" component={()=><Workshops auth={auth} clearBasket={clearBasket} addToBasket={addToBasket} showCheckOut={showCheckOut} showModal={showModal} getWorkshop={getWorkshop}/>}/>
          <Route exact path="/workshops/:postName"><ShopInfo workshop={workshop} addToBasket={addToBasket}/></Route>
          <Route render={() => <Redirect to={{pathname: "/workshops"}} />} />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
