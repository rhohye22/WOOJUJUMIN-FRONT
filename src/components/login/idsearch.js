import React, {useState} from "react";
import axios from "axios";
import { Button, Container, FloatingLabel, Form, Row, Col } from 'react-bootstrap';

function IdSearch() {
    const [email, setEmail] = useState('');

    const idInfo = async() => {
        await axios
            .get("http://118.67.132.98:3000/idsearch", { params: { 'email': email } })
            .then(function(res) {
                //console.log(res);
            if (res.data === null || res.data === "") {
                alert("입력하신 이메일과 일치하는 계정이 없습니다.");
                setEmail("");
            } else {
                alert(res.data.nickname+'님의 아이디는 ' + res.data.id + '입니다.');
                document.location.href = '/login';
            }
            })
            .catch(function(err) {
            alert(err);
            alert("아이디 찾기");
            });
    }

    return(
        <Container fluid>
            <Form>
            <h1>아이디 찾기</h1>
            <Row className="justify-content-md-center">
                <Col md={3}>
            <FloatingLabel
                controlId="floatingInput"
                label="이메일"
            >
                <Form.Control type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FloatingLabel>
            </Col>
            </Row>
            {/* <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 입력"
            />
            <br/><br/> */}<br/>
            <Button variant="primary" onClick={() => idInfo()}>아이디 찾기</Button>
            </Form>
        </Container>
    );
}

export default IdSearch;