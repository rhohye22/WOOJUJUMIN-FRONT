import {useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {Modal, Button, Form, Container} from 'react-bootstrap'

// show 모달창이 켜져있는 경우
const MsgDetailModal = ({show, onHide, sendId, targetId, title, message}) => {   

  let history = useNavigate();
  const [msgModal, setMsgModal] = useState(false);
  const [id, setId] = useState('');







  return (
    <Modal
    show={show}
    onHide={onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >



    <Container>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        메시지 확인
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>받는 사람</Form.Label>
        <Form.Control value={sendId} readOnly  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>보내는 사람</Form.Label>
        <Form.Control readOnly value={targetId}></Form.Control>
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>제목</Form.Label>
        <Form.Control  readOnly value={title} ></Form.Control>
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>내용</Form.Label>
        <Form.Control as="textarea" rows={3}  readOnly value={message} />
      </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
  
      <Button className="msgButton" onClick={onHide}>Close</Button>
    </Modal.Footer>
    </Container>
  </Modal>
  )
}

export default MsgDetailModal