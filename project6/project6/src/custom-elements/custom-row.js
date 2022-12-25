import { Row, Col, Button } from 'react-bootstrap';
import AddUpdateStudent from '../model/studentAddUpdate';

export default function CustomRow({ data }) {
    const depts = {
        "1": "Bilgisayar Müh.",
        "2": "Elektrik-Elektronik Müh.",
        "3": "Endüstri Müh.",
        "4": "İnşaat Müh.",
    };
    return <>
        <Row>
            <Col>{data.firstname} {data.lastname}</Col>
            <Col className='number'>{data.number}</Col>
            <Col className='dept'>{depts[data.departmant]}</Col>
            <Col>
                <Button type="button" data-toggle="modal" data-target={`#studentDelete-${data.tid}`} variety="danger">Sil</Button>
                <AddUpdateStudent detail={null} tid={data.tid} child={<p style={{ margin: '0px' }} >Düzenle</p>} />
                <AddUpdateStudent detail={true} tid={data.tid} child={<p style={{ margin: '0px' }} >Detay</p>} />
            </Col>
        </Row>
    </>
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
