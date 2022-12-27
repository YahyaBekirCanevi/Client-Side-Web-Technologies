import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";
import fetchAsync from '../async/students';

import "./modal.css"

export default function DeleteStudent({ tid, firstname, lastname, onSubmit, view }) {
    const [show, setShow] = useState(false);

    async function deleteById(id) {
        await fetchAsync('http://localhost:8000/students/' + id, 'DELETE', null)
        onSubmit()

        setShow(false)
    }

    return <>
        <Button onClick={() => setShow(true)} type="button"
            variant={(view === "card" ? 'outline-' : '') + "danger"}>
            {view === "card" ? <BsTrash /> : <>Sil</>}
        </Button>
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title id="studentDelete">Öğrenci Sil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className='bold'>{firstname} {lastname}</span> isimli öğrenciyi siliyorsunuz. Bu işlem geri alınamaz.
                Devam etmek istediğinize emin misiniz?
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" variant="secondary" data-dismiss="modal" onClick={() => setShow(false)}>Kapat</Button>
                <Button type='submit' onClick={() => deleteById(tid)}>Sil</Button>
            </Modal.Footer>
        </Modal>
    </>
}