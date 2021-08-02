import React, { useState } from 'react'
import { Form , Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import frame from '../Images/frame.png'
import logo from '../Images/logo.svg'
import eye from '../Images/eye.svg'

function Login(props) {
  const history = useHistory()
  const [showPass, setShowPass] = useState(false)
  const [userNotFound, setUserNotFound] = useState(false)

  const checkUserData = async (user) => {
    const res = await fetch('http://localhost:3000/users')
    const data = await res.json()
    console.log(user);
    const filtered = data.filter(item => item.email === user.email).filter(item => item.password === user.password)
    if (filtered.length > 0) {
      return filtered
    }
    else {
      return false
    }
  }

  const checkLogin = async (e) => {
    e.preventDefault()
    console.log(e.target);
    const formData = new FormData(e.target)
    const formDataObj = Object.fromEntries(formData.entries())
    const valid = await checkUserData(formDataObj)
    console.log(valid);
    if(valid) {
      props.checkAuth(true)
      props.setUserName(valid[0].name)
      history.push('/workshops')
    }
    else{
      setUserNotFound(true)
    }
    e.target.reset();
  }
  return (
    <div className="Login">
      <img src={logo} alt="" className="logo" />
      <img src={frame} alt="" className="frame" />
      <div className="prijava">
        <p>Prijavi se</p>
        <p>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        {userNotFound && <p className="notFound">Korisnik nije u databazi. Provjerite podatke i pokusajte ponovo.</p>}
        <Form onSubmit={checkLogin}>
          <Form.Group controlId="email">
            <Form.Label>Email adresa</Form.Label>
            <Form.Control required type="email" placeholder="Unesite svoju email adresu" name="email"/>
          </Form.Group>
          <Form.Group className="password" controlId="password">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control required type={showPass ? "text" : "password"} placeholder="Unesite lozinku (min. 8 znakova)" name="password"/>
            <img src={eye} alt="show password" onClick={()=>setShowPass(!showPass)}/>
          </Form.Group>
          <Button type="submit">Prijavi se</Button>
        </Form>
      </div>
      {/* email <input type="email" name="" id="" />
      password <input type="password" name="" id="" />
      <button onClick={()=>history.push("/workshops")}>Login</button> */}
    </div>
  )
}

export default Login
