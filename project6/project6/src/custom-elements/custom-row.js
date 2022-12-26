import { Row, Col } from 'react-bootstrap';
import AddUpdateStudent from '../model/studentAddUpdate';
import DeleteStudent from '../model/studentDelete';

export default function CustomRow({ data, view }) {
    const depts = {
        "1": "Bilgisayar Müh.",
        "2": "Elektrik-Elektronik Müh.",
        "3": "Endüstri Müh.",
        "4": "İnşaat Müh.",
    };
    return view === "card" ?
        <Col>
            <p className='bold'>{data.firstname} {data.lastname}</p>
            <p className='number'>{data.number}</p>
            <p className='dept'>{depts[data.departmant]}</p>
            <Row>
                <DeleteStudent tid={data.tid} firstname={data.firstname} lastname={data.lastname} />
                <AddUpdateStudent detail={false} tid={data.tid} child={<p style={{ margin: '0px' }} >Düzenle</p>} />
                <AddUpdateStudent variant='success' detail={true} tid={data.tid} child={<p style={{ margin: '0px' }} >Detay</p>} />
            </Row>
        </Col> :
        <Row>
            <Col>{data.firstname} {data.lastname}</Col>
            <Col className='number'>{data.number}</Col>
            <Col className='dept'>{depts[data.departmant]}</Col>
            <Col>
                <DeleteStudent tid={data.tid} firstname={data.firstname} lastname={data.lastname} />
                <AddUpdateStudent detail={false} tid={data.tid} child={<p style={{ margin: '0px' }} >Düzenle</p>} />
                <AddUpdateStudent variant='success' detail={true} tid={data.tid} child={<p style={{ margin: '0px' }} >Detay</p>} />
            </Col>
        </Row>
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
