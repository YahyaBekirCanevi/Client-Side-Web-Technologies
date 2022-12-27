import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import fetchAsync from '../async/students';
import "../App.css"

function FormGroup(props) {
    return <Form.Group as={Col} md="6">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
            type={props.type}
            onChange={e => props.onChange(e)}
            isInvalid={props.error}
            value={props.value}
        />
        <Form.Control.Feedback type='invalid'>{props.error}</Form.Control.Feedback>
    </Form.Group>
}

export default function AddUpdateStudent({ detail, tid, child, variant = 'primary', onSubmit }) {
    const [show, setShow] = useState(false)
    const [newId, setNewId] = useState("")
    const [title, setTitle] = useState("")
    const [buttonName, setButtonName] = useState("")
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})

    const setField = (field, value) => {
        setForm(p => ({
            ...p,
            [field]: value
        }))

        if (!!errors[field]) setErrors(p => ({
            ...p,
            [field]: null
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            const { fname, lname, num, dept, pob, dob } = form
            if (tid === -1 || tid === null) {
                console.log('New Student')
                let data = {
                    "fname": fname,
                    "lname": lname,
                    "num": num,
                    "dept": dept,
                    "pob": pob,
                    "dob": dob
                }
                fetchAsync('http://localhost:8000/students', 'POST', data)
                    .then((response) => {
                        console.log('New Student', response.status)
                    })
            } else {
                console.log('Update Student')
                let data = {
                    "id": tid,
                    "fname": fname,
                    "lname": lname,
                    "num": num,
                    "dept": dept,
                    "pob": pob,
                    "dob": dob,
                }
                fetchAsync('http://localhost:8000/students/' + tid, 'PUT', data)
                    .then((response) => {
                        console.log('Update Student', response.status)
                    })
            }
            onSubmit()
            setShow(false)
        }
    }

    const findFormErrors = () => {
        const { fname, lname, num, dept, pob, dob } = form
        const newErrors = {}

        if (!num || num === '' || num.length < 3) newErrors.num = 'En az 3 hane giriniz'
        if (!fname || fname === '' || fname.length < 3) newErrors.fname = 'En az 3 harf giriniz'
        if (!lname || lname === '' || lname.length < 3) newErrors.lname = 'En az 3 harf giriniz'
        if (!dept || dept === '' || dept === 'Bölüm Seçiniz' || dept === '0') newErrors.dept = 'Bölüm Seçiniz'
        if (!dob || dob === '') newErrors.dob = 'En az 3 harf giriniz'
        if (!pob || pob === '' || pob.length < 3) newErrors.pob = 'En az 3 hane giriniz'

        return newErrors
    }

    async function init() {
        setShow(true)
        await fetchAsync('http://localhost:8000/students/' + tid, 'GET', null)
            .then(async (response) => {
                let res = await response.json()
                setForm({
                    fname: res.fname,
                    lname: res.lname,
                    num: res.num,
                    dept: res.dept,
                    pob: res.pob,
                    dob: res.dob,
                })
            })
    }

    useEffect(() => {
        if (detail !== null && detail && tid !== null && tid !== -1) {
            setNewId("studentDetail-" + tid)
            setTitle("Öğrenci Detay Bilgileri")
        } else if (tid !== null && tid !== -1) {
            setNewId("studentUpdate-" + tid)
            setTitle("Güncellenecek Öğrenci Bilgileri")
            setButtonName("Güncelle")
        } else {
            setNewId("studentAdd")
            setTitle("Eklenecek Öğrenci Bilgileri")
            setButtonName("Ekle")
        }
    }, [])

    return <>
        <Button variant={variant} onClick={init}>{child}</Button>
        <Modal show={show} onHide={() => setShow(false)} id={newId}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="needs-validation" noValidate>
                    <Row>
                        <FormGroup type="text"
                            label="İsim"
                            error={errors.fname}
                            value={form.fname}
                            onChange={e => setField('fname', e.target.value)} />
                        <FormGroup type="text"
                            label="Soyisim"
                            error={errors.lname}
                            value={form.lname}
                            onChange={e => setField('lname', e.target.value)} />
                    </Row>

                    <Row>
                        <FormGroup type="number"
                            label="Öğrenci Numarası"
                            error={errors.num}
                            value={form.num}
                            onChange={e => setField('num', e.target.value)} />

                        <Form.Group as={Col} md="6">
                            <Form.Label>Bölüm</Form.Label>
                            <Form.Control
                                as={Form.Select}
                                value={form.dept}
                                onChange={e => setField('dept', e.target.value)}
                                isInvalid={!!errors.dept}>
                                <option value=''>Bölüm Seçiniz</option>
                                <option value='1'>Bilgisayar Müh.</option>
                                <option value='2'>Elektrik-Elektronik Müh.</option>
                                <option value='3'>Endüstri Müh.</option>
                                <option value='4'>İnşaat Müh.</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.dept}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row>
                        <FormGroup type="text"
                            label="Doğum Yeri"
                            error={errors.pob}
                            value={form.pob}
                            onChange={e => setField('pob', e.target.value)} />
                        <FormGroup type="date"
                            label="Doğum Tarihi"
                            error={errors.dob}
                            value={form.dob}
                            onChange={e => setField('dob', e.target.value)} />
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" variant="secondary" data-dismiss="modal" onClick={() => setShow(false)}>Kapat</Button>
                {buttonName === "" ? '' : <Button type='submit' onClick={handleSubmit}>{buttonName}</Button>}
            </Modal.Footer>
        </Modal>
    </>
}