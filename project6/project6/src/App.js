import './App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CustomNavigation from './custom-elements/custom-navigation';
import { BsFillPersonPlusFill } from 'react-icons/bs';

export default function App() {
  return <>
    <Container fluid>
      <Row my="3">
        <Col md="auto">
          <img id="esogu-logo" src="esogu-logo.png" alt="Esogü Logo" />
        </Col>
        <Col my="4">
          <p className="bold title">Eskişehir Osmangazi Üniversitesi</p>
          <p>Öğrenci Yönetim Sistemi</p>
        </Col>
        <Col className="exit">
          <div m="0">Merhaba, John Doe</div>
          <div><Button variant="secondary">Çıkış Yap</Button></div>
        </Col>
      </Row>
    </Container>

    <Container className="second-bar" fluid>
      <div className="title bold">Öğrenci Listesi</div>
      <Button variant="primary" data-toggle="modal" data-target="#studentAdd">
        <BsFillPersonPlusFill />
      </Button>
      <add-update-student />
    </Container>

    <Container className="text-center table" fluid>
      <Row className="table-header">
        <Col>İsim Soyisim</Col>
        <Col className="number">Öğrenci Numarası</Col>
        <Col className="dept">Bölüm</Col>
        <Col>Yetkiler</Col>
      </Row>
      <CustomNavigation />
    </Container>
  </>;
}