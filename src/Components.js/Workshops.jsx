import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import CheckOut from './CheckOut'
import { Link } from 'react-router-dom'

function Workshops(props) {
  const [cat, setCat] = useState({
    sve: true,
    dizajn: false,
    frontend: false,
    backend: false,
    marketing: false
  })
  const [workShops, setWorkShops] = useState(null)
  const [loaded, setLoaded] = useState(null)
  useEffect(() => {
    // console.log("nesto");
    getWorkShops()
  }, [])
  useEffect(() => {
    // console.log("cat");
    getWorkShops()
  }, [cat])
  const getWorkShops = async () => {
    try {
      const result = await fetch(`http://localhost:3000/workshops`)
      const res = await result.json()
      if (cat.dizajn) {
        const design = res.filter(w => w.category === 'design')
        setWorkShops(design)
      }
      else if (cat.frontend) {
        const frontend = res.filter(w => w.category === 'frontend')
        setWorkShops(frontend)
      }
      else if (cat.backend) {
        const backend = res.filter(w => w.category === 'backend')
        setWorkShops(backend)
      }
      else if (cat.marketing) {
        const marketing = res.filter(w => w.category === 'marketing')
        setWorkShops(marketing)
      }
      else {
        setWorkShops(res)
      }
      setLoaded(true)
    }
    catch (e) {
      setLoaded(false)
      throw e
      console.log(e);
    }
  }
  // console.log(workShops);
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
  convertDate("2020-01-26T13:51:50.417-07:00");
  const handleSide = (e) => {
    const id = e.target.id
    if (id === "dizajn") {
      setCat({sve: false,dizajn: true,frontend: false,backend: false,marketing: false})      
    }
    else if (id === "frontend") {
      setCat({sve: false,dizajn: false,frontend: true,backend: false,marketing: false})
    }
    else if (id === "backend") {
      setCat({sve: false,dizajn: false,frontend: false,backend: true,marketing: false})
    }
    else if (id === "marketing") {
      setCat({sve: false,dizajn: false,frontend: false,backend: false,marketing: true})
    }
    else {
      setCat({sve: true,dizajn: false,frontend: false,backend: false,marketing: false})
    }
  }

  if(!props.auth){
    return <Redirect to="/login" />
  }
  const makeDom = () => {
    return (
    <div className="workshops">
      <p>Workshops</p>
      <p>Displayed: <span>{workShops.length}</span></p>   
      <div className="mainList">
        {workShops.map(w => {return <div className="workCard">
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
    </div>)
  }
  return (
    <div className="Workshops">
      <div className="sideNav">
        <p>Filtriraj po temi:</p>
        <p id="sve" onClick={handleSide} style={{textDecoration: cat.sve && "underline", color: cat.sve && "#0097CC"}}>Sve teme</p>
        <p id="dizajn" onClick={handleSide} style={{textDecoration: cat.dizajn && "underline", color: cat.dizajn && "#0097CC"}}>Dizajn</p>
        <p id="frontend" onClick={handleSide} style={{textDecoration: cat.frontend && "underline", color: cat.frontend && "#0097CC"}}>Frontend</p>
        <p id="backend" onClick={handleSide} style={{textDecoration: cat.backend && "underline", color: cat.backend && "#0097CC"}}>Backend</p>
        <p id="marketing" onClick={handleSide} style={{textDecoration: cat.marketing && "underline", color: cat.marketing && "#0097CC"}}>Marketing</p>
      </div>
      {loaded && makeDom()}
      {props.showCheckOut && <CheckOut showCheckOut={props.showCheckOut} showModal={props.showModal} clearBasket={props.clearBasket}/>}
    </div>
    
  )
}

export default Workshops

