import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addGroup } from '../../Services/adminServices'
import { AuthContext } from '../../Context/AuthContext';

function ActGroupModal({ setGrupos }) {
  const { businessId } = useContext(AuthContext)
  const [show, setShow] = useState(false);
  const [nombreGrupo, setNombreGrupo] = useState('')
  const [isDefault, setIsDefault] = useState(false);
  const [autoplay, setAutoplay] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeNombre = (event) => {
    event.preventDefault();
    setNombreGrupo(event.target.value)
  }

  const onChangeDefault = (event) => {
    event.preventDefault()
    setIsDefault(event.target.value)
  }

  const onChangeAutoplay = (event) => {
    event.preventDefault()
    setAutoplay(event.target.value)
  }

  const onSubmit = () => {
    addGroup(nombreGrupo, isDefault, autoplay, businessId)
      .then(response => {
        setGrupos(prevArray => [...prevArray, response.data.gruposStored])
      })
      .catch(error => {
        setErrMsg(error)
      })
    handleClose()
  }

  return (
    <>
      <Button variant="outline-secondary" size="md" onClick={handleShow}>
        Actualizar grupo
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualiza el grupo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="actGrupo"
              label="Nombre del grupo"
              className="mb-3"
              value={nombreGrupo}
            >
              <Form.Control type="text" onChange={onChangeNombre} />
            </FloatingLabel>
            <p>Es el grupo default?</p>
            <div className="col-md-12 text-center">
              <Form.Check
                inline
                label="Si"
                name="defaultAct"
                type='radio'
                id={'defualtYesAct'}
                value={true}
                onChange={onChangeDefault}
              />
              <Form.Check
                inline
                label="No"
                name="defaultAct"
                type='radio'
                value={false}
                id={`defaultNoAct`}
                onChange={onChangeDefault}
              />
            </div>
            <p>Tiene autoplay?</p>
            <div className="col-md-12 text-center">
              <Form.Check
                inline
                label="Si"
                name="autoplayAct"
                type='radio'
                id={'autoplayYesAct'}
                value={true}
                onChange={onChangeAutoplay}
              />
              <Form.Check
                inline
                label="No"
                name="autoplayAct"
                type='radio'
                value={false}
                id={`autoplayNoAct`}
                onChange={onChangeAutoplay}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="outline-success" onClick={onSubmit}>
            Añade el grupo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ActGroupModal;