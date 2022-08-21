import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { delGroup, delRecursoById } from '../../Services/adminServices'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function DelGroupModal({ index, setGrupos, grupos }) {
    const [show, setShow] = useState(false);

    var id = grupos[index]._id

    const handleAccept = () => {
        delGroup(id)
            .then(response => {
                setGrupos(prevArray => (prevArray.filter(function (object) {
                    return object._id !== response.data.delGrupo._id
                })))
                delRecursoById(id)
            })
            .finally(
                setShow(false)
            )
    };
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false)

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}>
                Borrar grupo
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Row>
                        <Col />
                        <Col md="auto">¿Estás seguro que quieres borrar este grupo?</Col>
                        <Col />
                    </Row>
                    <Row style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Col>
                            <Button style={{ marginLeft: '80px' }} variant="outline-secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Col>
                        <Col>
                            <Button style={{ marginRight: '80px' }} variant="outline-danger" onClick={handleAccept}>
                                Borrar
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DelGroupModal;