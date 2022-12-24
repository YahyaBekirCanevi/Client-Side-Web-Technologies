import { Row, Col, Button } from 'react-bootstrap';

export default function CustomRow({ data }) {
    const depts = {
        "1": "Bilgisayar Müh.",
        "2": "Elektrik-Elektronik Müh.",
        "3": "Endüstri Müh.",
        "4": "İnşaat Müh.",
    };
    return <Row>
        <Col>{data.firstname} {data.lastname}</Col>
        <Col number>{data.number}</Col>
        <Col dept>{depts[data.departmant]}</Col>
        <Col>
            <Row>
                <Col my="2" mx="2" md="auto"><Button type="button" data-toggle="modal" data-target={`#studentDelete-${data.tid}`} variety="danger">Sil</Button></Col>
                <Col my="2" mx="0" md="auto"><Button type="button" data-toggle="modal" data-target={`#studentUpdate-${data.tid}`} variety="primary">Düzenle</Button></Col>
                <Col my="2" mx="2" md="auto"><Button type="button" data-toggle="modal" data-target={`#studentDetail-${data.tid}`} variety="success">Detay</Button></Col>
            </Row>
        </Col>
    </Row>;
}

var x = window.matchMedia("(max-width: 992px)")
x.addEventListener("change", () => {
    const dept = document.querySelectorAll(".table .dept")
    dept.forEach(e => {
        e.style.display = !x.matches ? "flex" : "none"
    });
})

var y = window.matchMedia("(max-width: 768px)")
y.addEventListener("change", () => {
    const number = document.querySelectorAll(".table .number")
    number.forEach(e => {
        e.style.display = !y.matches ? "flex" : "none"
    });
})
