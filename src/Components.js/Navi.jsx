import React, { useState, useEffect } from 'react'
import logo from '../Images/logo.svg'
import kosarica from '../Images/kosarica.svg'
import kosaricaFull from '../Images/kosarica-full.svg'
import korisnik from '../Images/korisnik.svg'
import close from '../Images/close.svg'
import trash from '../Images/trash.svg'
import { LinkContainer } from 'react-router-bootstrap'
import { Form , Button } from 'react-bootstrap'

function Navi(props) {
  const [showSide, setShowSide] = useState(false)
  const [basket, setBasket] = useState()
  const makeBasket = async () => {
    try {
      const result = await fetch(`http://localhost:3000/workshops`)
      const res = await result.json()
      const mapped = props.basket.map(prop => res.find(item => item.id === prop))
      const filtered = res.filter(item => props.basket.includes(item.id))
      setBasket(mapped)
    }
    catch (e) {
      throw e
    }
  }
  useEffect(() => {
    makeBasket()
  }, [props])
  const showSideBar = (e) => {
    setShowSide(!showSide)
  }
  const findDuplicates = (id) => {
    let count = 0
    for (let item of basket){
      if(id === item.id){
        count++
      }
    }
    return count;
  }
  const removeItem = (e) => {
    console.log(e.target.id);
    console.log(basket.findIndex(obj => obj.id == e.target.id));
    let temp = [...props.basket]
    temp.splice(basket.findIndex(obj => obj.id == e.target.id), 1)
    console.log(temp);
    props.removeFromBasket(temp)
  }
  return (
    <nav> 
            {/* const filtered = res.filter(item => props.basket.includes(item.id)) */}

      <LinkContainer to="/home"><img src={logo} alt="" /></LinkContainer>
      {showSide && <div className="sideBar">
      <img src={close} id="sideBarClose" alt="" onClick={(e)=>showSideBar(e)}/>
        {basket && basket.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i).map(item=>
          <div className="basketCard">
            <img src={item.imageUrl} alt="" />
            <div className="basketText">
              <p>{item.title}</p><img src={trash} alt="" id={item.id} onClick={(e)=>removeItem(e)}/>
              <div className="basketPrice">
                <Form.Select className="select" id="inlineFormCustomSelect">
                  <option value={findDuplicates(item.id)}>{findDuplicates(item.id)}</option>
                </Form.Select>
                <p>{item.price*findDuplicates(item.id)},00<span>EUR</span></p>
              </div>
            </div>
          </div>
        )}
        {props.basket.length !== 0 && <>
        <p className="sub">SUBTOTAL</p>
        <p className="total">{basket.reduce((total, obj) => total + obj.price, 0)},00<span>EUR</span></p>
        <Button onClick={()=>props.showModal()}>Checkout</Button>
        </>}
      </div>}
      <div className="nav-desno">
        <div className="korisnik">
          <img src={korisnik} alt="" />
          <p>{props.user}</p>
        </div>
        <div className="kosarica" onClick={(e)=>showSideBar(e)}>
          {props.basket.length !== 0 && <img className="full" src={kosaricaFull} alt="" />}
          <img src={kosarica} alt="" />
          {props.basket.length === 0 ? <p>Košarica je prazna</p> : props.basket.length === 1 ?<p>{props.basket.length} Workshop</p> : <p>{props.basket.length} Workshops</p>}
          
        </div>
      </div>
    </nav>
  )
}

export default Navi
