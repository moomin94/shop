import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import Detail from './pages/Detail.js';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

function App() {
  let [shoes, setShoes] = useState(data);
  let [count, setCount] = useState(2);
  let [lodingAlert, setLoadingAlert] = useState(false);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand onClick={() => { navigate('/') }}>ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Link to="/" className="homeBtn">Home</Link>
            <Link to="/detail">Detail</Link> */}
            {/* <Nav.Link onClick={() => { navigate('-1') }}>Home</Nav.Link>  : 뒤로 가기 버튼*/}
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg" style={{ backgroundImage: 'url(' + bg + ')', marginBottom: '20px' }}></div>
            <Container>
              <Button variant="primary" onClick={() => {
                let copy = [...shoes];
                let result = copy.sort((a, b) => {
                  let x = a.title.toLowerCase();
                  let y = b.title.toLowerCase();
                  return (x < y ? -1 : x > y ? 1 : 0);
                });
                setShoes(result);
              }}>ABC순 정렬</Button>{' '}
              <Row>
                {
                  shoes.map(function (item, index) {
                    return (
                      <Card shoes={item} key={index}></Card>
                    )
                  })
                }
              </Row>
            </Container>
            {
              lodingAlert ? <Button variant="danger">로딩중</Button> : null
            }
            {
              count == 4 ? null : <Button variant="light" onClick={() => {
                setLoadingAlert(true);
                setCount(count + 1);
                axios.get('https://codingapple1.github.io/shop/data' + count + '.json')
                  .then((결과) => { setShoes([...shoes, ...결과.data]); setLoadingAlert(false); })
                  .catch(() => { console.log('실패함'); setLoadingAlert(false); })
              }}>더보기</Button>
            }

          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>

        {/* 일명 404 페이지
        <Route path="*" element={
          <div>없는 페이지에요</div>
        } /> */}
      </Routes>

    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
    <Col md={4} className="d-flex flex-column align-items-center my-4">
      <Link to={"/detail/" + props.shoes.id}>
        <img src={"https://codingapple1.github.io/shop/shoes" + (props.shoes.id + 1) + ".jpg"} alt="상품이미지" width="80%" />
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content}</p>
      </Link>
    </Col>
  )
}

export default App;
