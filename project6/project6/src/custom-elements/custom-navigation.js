import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { fetchAsync } from '../async/students'
import CustomRow from './custom-row';
import './custom-navigation.css'

export default function CustomNavigation() {
    const [state, setState] = useState({
        children: [],
        currentPage: 1,
        pageLimit: 10,
        pageCount: 1,
        bottom: 0,
        top: 0
    });

    const updateIndices = ({ list, limit, current }) => {
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
        }))
    }


    useEffect(() => {
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
        initialize();
    }, [])

    return <Container fluid>
        <div className='elements'>
            {state.children.slice(state.bottom, state.top + 1).map((e, idx) => <CustomRow key={idx} data={e} />)}
        </div>
        <Row className="table-footer">
            <Col className="pageNumber">
                <p>
                    <span className="bold">{state.children.length}</span> öğrenciden
                    <span className="bold"> {state.bottom}-{state.top}</span> arası gösteriliyor
                </p>
            </Col>
            <Col className="paginationNumbers">
                {Array.from({ length: state.pageCount }).map((_, idx) => {
                    return <div key={idx}
                        className={`paginationNumber ${state.currentPage === idx + 1 ? 'active' : ''}`}
                        onClick={() => updateIndices({ current: idx + 1 })}>
                        {idx + 1}</div>
                })}
            </Col>
            <Col className="pageCounter">
                {[5, 8, 10].map((e, idx) => {
                    return <div key={idx} onClick={() => updateIndices({ limit: e })}>{e}</div>
                })}
            </Col>
        </Row>
    </Container>;
}