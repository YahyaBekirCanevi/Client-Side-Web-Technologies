import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import AddUpdateStudent from '../model/studentAddUpdate';
import fetchAsync from '../async/students'
import CustomRow from './custom-row';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import './custom-navigation.css'

export default function CustomNavigation() {
    const [state, setState] = useState({
        children: [],
        currentPage: 1,
        pageLimit: 10,
        pageCount: 1,
        bottom: 0,
        top: 0,
        view: "row"
    });

    const updateIndices = ({ list, limit, current, view }) => {
        let _list = list === undefined ? state.children : list
        let _limit = limit === undefined ? state.pageLimit : limit
        let _currentPage = current === undefined ? state.currentPage : current
        let _pageCount = Math.ceil(_list.length / _limit)
        _currentPage = _currentPage > _pageCount ? _pageCount : _currentPage

        let _bottom = (_currentPage - 1) * _limit + 1
        _bottom = _list.length < _bottom ? _list.length : _bottom

        let _top = _currentPage * _limit
        _top = _list.length < _top ? _list.length : _top

        setState(p => ({
            ...p,
            top: _top,
            bottom: _bottom,
            children: _list,
            pageLimit: _limit,
            pageCount: _pageCount,
            currentPage: _currentPage,
            view: view ?? state.view,
        }))
    }
    async function initialize() {
        let list = []
        await fetchAsync('http://localhost:8000/students', 'GET', null)
            .then(async (response) => {
                let res = await response.json()
                res.map(el => {
                    let data = {
                        "tid": el.id,
                        "firstname": el.fname,
                        "lastname": el.lname,
                        "number": el.num,
                        "departmant": el.dept,
                        "placeOfBirth": el.pob,
                        "dateOfBirth": el.dob,
                    }
                    list = [...list, data]
                })
            })
        updateIndices({ list: list })
    }
    function onSwitch() {
        updateIndices({ view: state.view === "card" ? "row" : "card" })
    }

    useEffect(() => {
        initialize();
    }, [state.children.length])

    return <Container fluid style={{ padding: '0px' }}>
        <Row mx='2'>
            <Col className="bold" style={{ textAlign: "start", fontSize: "20px", paddingLeft: '12px' }}>Öğrenci Listesi</Col>
            <Col md="auto">
                <Button variant='primary' type='button'><Form.Switch
                    reverse
                    id="custom-switch"
                    label="Table View"
                    onClick={onSwitch}
                    value={state.view === "card"}
                /></Button>
                <AddUpdateStudent variant='primary' detail={null} tid={-1} child={<BsFillPersonPlusFill />} onSubmit={initialize} />
            </Col>
        </Row>

        {state.view === "card" ? <></> : <Row className="table-header">
            <Col>İsim Soyisim</Col>
            <Col className="number">Öğrenci Numarası</Col>
            <Col className="dept">Bölüm</Col>
            <Col>Yetkiler</Col>
        </Row>}

        <div className='elements'>
            {state.children.slice(state.bottom - 1, state.top).map((e, idx) => <CustomRow view={state.view} key={idx} data={e} onSubmit={initialize} />)}
        </div>

        <Row className="table-footer">
            <Col className="pageNumber">
                <span className="bold">{state.children.length}</span> öğrenciden
                <span className="bold"> {state.bottom}-{state.top}</span> arası gösteriliyor
            </Col>
            <Col className="paginationNumbers" md="auto">
                {Array.from({ length: state.pageCount }).map((_, idx) => {
                    return <div key={idx}
                        className={`${(state.currentPage === idx + 1) ? 'active' : ''}`}
                        onClick={() => updateIndices({ current: idx + 1 })}>
                        {idx + 1}</div>
                })}
            </Col>
            <Col className="pageCounter">
                {[5, 8, 10].map((e, idx) => {
                    return <div key={idx}
                        className={`${(state.pageLimit === e) ? 'active' : ''}`}
                        onClick={() => updateIndices({ limit: e })}>
                        {e}</div>
                })}
            </Col>
        </Row>
    </Container >
}