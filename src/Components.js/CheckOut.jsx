import React, { useState } from 'react'
import { Modal , Button , Form , Row , Col } from 'react-bootstrap'
import close from '../Images/close.svg'

function CheckOut(props) {
  const [showTY, setShowTY] = useState(false);
  const backToShop = () => {
    props.showModal()
    props.clearBasket()
  }

  // const dialogClassName= {classes.myModalStyle} as Modal attribute
  return (
    <Modal show={props.showCheckOut} animation={false}>
      <Modal.Body>
        <div className="CheckOut">
          <div>
            {showTY ? <p>Thank you!</p> : <p>Checkout</p>}
            <p>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.</p>
            {!showTY ? <img src={close} alt="close" onClick={()=>props.showModal()}/> : ""}
          </div>
          {!showTY ? <Form onSubmit={()=>setShowTY(true)}>
            <Form.Group controlId="ime">
              <Form.Label>Ime</Form.Label>
              <Form.Control required type="text" placeholder="Unesite svoju ime ovdje" name="firstName"/>
            </Form.Group>
            <Form.Group controlId="prezime">
              <Form.Label>Prezime</Form.Label>
              <Form.Control required type="text" placeholder="Unesite svoju prezime ovdje" name="lastName"/>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email adresa</Form.Label>
                <Form.Control required type="email" placeholder="Unesite svoju email adresu ovdje" name="email"/>
            </Form.Group>
            <Row className="g-2">
              <Col md>
                <Form.Label>Datum rodenja</Form.Label>
                <Form.Control required type="date" name="dob"/>
              </Col>
              <Col md>
                <Form.Label>Spol</Form.Label>
                <Form.Select aria-label="Floating label select example">
                  <option value="other">Drugo</option>
                  <option value="female">Zensko</option>
                  <option value="male">Musko</option>
                </Form.Select>
              </Col>
            </Row>
            <Form.Group controlId="adresa">
              <Form.Label>Adresa</Form.Label>
              <Form.Control required type="text" placeholder="Unesite svoju adresu ovdje" name="address"/>
            </Form.Group>
            <Form.Group controlId="postanski">
              <Form.Label>Postanski broj</Form.Label>
              <Form.Control required type="number" placeholder="Unesite svoju postanski broj ovdje" name="zip"/>
            </Form.Group>
            <Form.Group controlId="agree">
              <Form.Check required inline aria-label="agree" />
              <Form.Label >Slazem se</Form.Label>
            </Form.Group>
            <Button type="submit">Prijavi se</Button>
          </Form> : <Button onClick={()=>backToShop()}>Natrag na Shop</Button>}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default CheckOut
