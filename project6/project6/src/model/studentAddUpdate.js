import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import "./modal.css"

function FormGroup(props) {
    return <Form.Group as={Col} md="6">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
            type={props.type}
            onChange={e => props.onClick(e)}
            isInvalid={props.error}
        />
        <Form.Control.Feedback type='invalid'>{props.error}</Form.Control.Feedback>
    </Form.Group>
}

export default function AddUpdateStudent({ detail, tid, child }) {
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
            /// action
        }
    }

    const findFormErrors = () => {
        const { ogrNo, isim, soyisim, dep, dogumTarihi, dogumYeri } = form
        const newErrors = {}

        if (!ogrNo || ogrNo === '' || ogrNo.length < 3) newErrors.ogrNo = ' 3 harf '
        else if (ogrNo.length > 12) newErrors.ogrNo = 'yaz yaz anana kadar yolun var'

        if (!isim || isim === '' || isim.length < 3) newErrors.isim = ' 3 harf '
        else if (isim.length > 12) newErrors.isim = 'yuh mk'

        if (!soyisim || soyisim === '' || soyisim.length < 3) newErrors.soyisim = ' 3 harf '
        else if (soyisim.length > 12) newErrors.soyisim = 'yuh mk'

        if (!dep || dep === '') newErrors.dep = 'select a food!'

        if (!dogumTarihi || dogumTarihi === '') newErrors.dogumTarihi = ' 3 harf '
        else if (dogumTarihi.length > 12) newErrors.dogumTarihi = 'yuh mk'

        if (!dogumYeri || dogumYeri === '' || dogumYeri.length < 3) newErrors.dogumYeri = ' 3 harf '
        else if (dogumYeri.length > 12) newErrors.dogumYeri = 'yuh mk'

        return newErrors
    }

    useEffect(() => {
        if (detail !== null && tid !== null) {
            setNewId("studentDetail-" + tid)
            setTitle("Öğrenci Detay Bilgileri")
        } else if (tid !== null) {
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
        <Button variant="primary" data-toggle="modal" data-target={"#" + { newId }} onClick={() => setShow(true)}>
            {child}
        </Button>
        <Modal show={show} onHide={() => setShow(false)} id={newId}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="needs-validation" noValidate>
                    <Row>
                        <FormGroup type="text"
                            label="İsim"
                            error={errors.isim}
                            onClick={e => setField('isim', e.target.value)} />
                        <FormGroup type="text"
                            label="Soyisim"
                            error={errors.soyisim}
                            onClick={e => setField('soyisim', e.target.value)} />
                    </Row>

                    <Row>
                        <FormGroup type="number"
                            label="Öğrenci Numarası"
                            error={errors.ogrNo}
                            onClick={e => setField('ogrNo', e.target.value)} />

                        <Form.Group as={Col} md="6">
                            <Form.Label>Bölüm</Form.Label>
                            <Form.Control
                                as='Select'
                                onChange={e => setField('dep', e.target.value)}
                                isInvalid={!!errors.dep}
                            >
                                <option value=''>Bölüm Seçiniz</option>
                                <option value='bm'>Bilgisayar Müh.</option>
                                <option value='eem'>Elektrik-Elektronik Müh.</option>
                                <option value='em'>Endüstri Müh.</option>
                                <option value='im'>İnşaat Müh.</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.dep}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row>
                        <FormGroup type="text"
                            label="Doğum Yeri"
                            error={errors.dogumYeri}
                            onClick={e => setField('dogumYeri', e.target.value)} />
                        <FormGroup type="date"
                            label="Doğum Tarihi"
                            error={errors.dogumTarihi}
                            onClick={e => setField('dogumTarihi', e.target.value)} />
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