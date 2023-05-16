import {useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {Modal, Button, Form, Container} from 'react-bootstrap'
import axios from 'axios';
// show 모달창이 켜져있는 경우
const MsgSendModal = ({show, onHide, sendId, targetId}) => {   

  let history = useNavigate();

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [sId, setSId] = useState('');
  const [tId, setTId] = useState('');

  const contentChange = (e) => setContent(e.target.value); 
  const titleChange = (e) => setTitle(e.target.value); 
  

//console.log(targetId);
//console.log(content);


useEffect(() => {
  setSId(sendId);
  setTId(targetId);
},[sendId, targetId]);

const writeMsg = () => {
  if(content === undefined || content.trim() === ''){
      alert('내용을 입력해 주십시오');
      setContent('');
      return;
  } 
  else if(title === undefined || title.trim() === ''){
    alert('제목을 입력해 주십시오');
    setTitle('');
      return;

  }

  axios.get("http://118.67.132.98:3000/msgWrite",
              { params:{ "targetId":tId, "sendId":sId, "title":title, "message":content } })
       .then(res => {
          console.log(res.data);
          if(res.data === "YES"){
              alert("전송 성공");
            
          }else{
              alert("전송 실패");
          }
       })
       .catch(function(err){
          alert(err);
       })   
}



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
        메시지 보내기
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>받는 사람</Form.Label>
        <Form.Control value={targetId} readOnly  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>보내는 사람</Form.Label>
        <Form.Control readOnly value={sendId}></Form.Control>
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>제목</Form.Label>
        <Form.Control onChange={titleChange} ></Form.Control>
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>내용</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={contentChange} />
      </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button className="msgButton" variant="primary" type="button" onClick={()=>{writeMsg(); onHide();}}>
        전송
      </Button>
      <Button className="msgButton" onClick={onHide}>Close</Button>
    </Modal.Footer>
    </Container>
  </Modal>
  )
}

export default MsgSendModal