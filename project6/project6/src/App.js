import './App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CustomNavigation from './custom-elements/custom-navigation';

export default function App() {
  return <>
    <Container fluid style={{ padding: '10px' }}>
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

    <Container className="text-center table" fluid style={{ padding: '0px' }}>
      <CustomNavigation />
    </Container>
  </>;
}