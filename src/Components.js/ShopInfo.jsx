import React, { useState , useEffect } from 'react'
import { Form , Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import brush from '../Images/brush.png'
import frontend from '../Images/frontend.svg'
import marketing from '../Images/marketing.svg'
import backend from '../Images/backend.svg'

function ShopInfo(props) {
  const [workshop, setWorkshop] = useState()
  const [similar, setSimilar] = useState()
  const [speaker, setSpeaker] = useState()
  const [loaded, setLoaded] = useState(null)
  const [number, setNumber] = useState(1)
  useEffect(() => {
    getWorkShop()
  }, [])
  const getWorkShop = async () => {
    try {
      const result = await fetch(`http://localhost:3000/workshops`)
      const res = await result.json()
      const workshop = res.filter(item => item.id === props.workshop)[0]
      const similar = res.filter(item => item.category === workshop.category && workshop.id !== item.id)
      setSimilar(similar);
      setWorkshop(workshop);
      setLoaded(true)
      const userResult = await fetch(`http://localhost:3000/users`)
      const userRes = await userResult.json()
      const user = userRes.filter(item => workshop.userId === item.id)[0]
      setSpeaker(user.name);
    }
    catch (e) {
      throw e
    }
  }
  const convertDate = (str) => {
    let temp1 = Date.parse(str)
    let temp2 = new Date(temp1)
    let time = temp2.toLocaleTimeString('en-GB')
    let date = temp2.toLocaleDateString()
    date = date.split("/")
    date = date[1]+"."+date[0]+"."+date[2]+"."
    time = time.split(":")
    time = time[0]+":"+time[1]+"h"
    return <div className="datum"><p>{date}</p><p className="sat">{time}</p></div>;
  }
  // console.log(props.workshop);
  console.log(number);
  const addToBasket = (e) => {
    console.log(e);
    for (let i = 0; i < number; i++) {
      props.addToBasket(e.target.id)     
      
    }
    // props.addToBasket(e.target.id, number)     
  }
  return (
    <div className="ShopInfo">
      
      {loaded && <div className="mainPart">
        <div className="goback">
          <p><Link to={`/workshops`}>Natrag</Link></p>
        </div>
        <div className="workCard">
          <div className="workImg">
            <img src={workshop.imageUrl} alt="" width="100%"/>
          </div>
          <div className="workText">
            <div className="workTextLeft">
              <img src={brush} alt="" />
              <p className="workDate">{convertDate(workshop.date)}</p>
              <p className="workTitle" onClick={()=>props.getWorkshop(workshop.id)}>{workshop.title}</p>
              <p className="speaker">WITH <span>{speaker}</span></p>
              <p className="workContent">{workshop.desc}</p>
            </div>
            <div className="workTextRight">
              <p>Buy Your Ticket</p>
              <p className="workPrice">{workshop.price},00<span>EUR</span></p>
              <div className="kupovina">
                <Form.Select className="select" id="inlineFormCustomSelect" onChange={(e)=>setNumber(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Form.Select>
                <Button id={workshop.id} onClick={(e)=>addToBasket(e)}>Dodaj u košaricu</Button>
              </div>              
              <p>Subtotal: <span>{workshop.price*number},00 EUR</span></p>
            </div>
          </div>
        </div></div>}
      {loaded && 
      <div className="similar">
        <p>Similar Workshops</p>
        <div className="cards">
        {similar.map(w => {return <div className="workCard">
          <div className="workImg">
          <img src={w.imageUrl} alt="" width="100%"/>
          </div>
          <div className="workText">
            <p className="workDate">{convertDate(w.date)}</p>
            <p className="workTitle" onClick={()=>props.getWorkshop(w.id)}><Link to={`/workshops/${w.title}`}>{w.title}</Link></p>
            <div className="price">  
              <p className="workPrice">{w.price},00<span>EUR</span></p>
              <Button id={w.id} onClick={(e)=>props.addToBasket(e.target.id)}>Dodaj u košaricu</Button>
            </div>
          </div>
        </div>})}
        </div>
          
      </div>}
    </div>
  )
}

export default ShopInfo
