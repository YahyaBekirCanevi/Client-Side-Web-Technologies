import { Row, Col, Card } from 'react-bootstrap';
import AddUpdateStudent from '../model/studentAddUpdate';
import DeleteStudent from '../model/studentDelete';
import { BsPen, BsInfoCircle } from "react-icons/bs";
import '../App.css'

export default function CustomRow({ data, view, onSubmit }) {
    const depts = {
        "1": "Bilgisayar Müh.",
        "2": "Elektrik-Elektronik Müh.",
        "3": "Endüstri Müh.",
        "4": "İnşaat Müh.",
    };
    const deleteButton = <DeleteStudent tid={data.tid} firstname={data.firstname} lastname={data.lastname} onSubmit={onSubmit} view={view} />
    const updateButton = <AddUpdateStudent
        variant={(view === "card" ? 'outline-' : '') + 'primary'}
        detail={false} tid={data.tid}
        child={view === "card" ? <BsPen /> : <p style={{ margin: '0px' }} >Düzenle</p>}
        onSubmit={onSubmit} />
    const detailButton = <AddUpdateStudent
        variant={(view === "card" ? 'outline-' : '') + 'success'}
        detail={true} tid={data.tid}
        child={view === "card" ? <BsInfoCircle /> : <p style={{ margin: '0px' }} >Detay</p>} />

    return view === "card" ?
        <Card className='customcard'>
            <Col>
                <p className='bold'>{data.firstname} {data.lastname}</p>
                <p className='number'>{data.number}</p>
                <p className='dept'>{depts[data.departmant]}</p>
                <Row xs="auto">
                    <Col>{deleteButton}</Col>
                    <Col>{updateButton}</Col>
                    <Col>{detailButton}</Col>
                </Row>
            </Col>
        </Card> :
        <Row>
            <Col>{data.firstname} {data.lastname}</Col>
            <Col className='number'>{data.number}</Col>
            <Col className='dept'>{depts[data.departmant]}</Col>
            <Col>
                {deleteButton}
                {updateButton}
                {detailButton}
            </Col>
        </Row>
}

var x = window.matchMedia("(max-width: 992px)")
x.addEventListener("change", () => {
    var cardView = document.querySelectorAll('.elements:has(.customcard)');
    const dept = document.querySelectorAll(".table .dept")
    dept.forEach(e => {
        e.style.display = !x.matches || cardView.length > 0 ? "flex" : "none"
    });
})

var y = window.matchMedia("(max-width: 768px)")
y.addEventListener("change", () => {
    var cardView = document.querySelectorAll('.elements:has(.customcard)');
    const number = document.querySelectorAll(".table .number")
    number.forEach(e => {
        e.style.display = !y.matches || cardView.length > 0 ? "flex" : "none"
    });
})
