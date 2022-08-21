import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addGroup } from '../../Services/adminServices'
import { AuthContext } from '../../Context/AuthContext';

function AddGroupModal({ setGrupos }) {
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
        Agregar grupo
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añade Grupos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingInput"
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
                name="default"
                type='radio'
                id={'defualtYes'}
                value={true}
                onChange={onChangeDefault}
              />
              <Form.Check
                inline
                label="No"
                name="default"
                type='radio'
                value={false}
                id={`defaultNo`}
                onChange={onChangeDefault}
              />
            </div>
            <p>Tiene autoplay?</p>
            <div className="col-md-12 text-center">
              <Form.Check
                inline
                label="Si"
                name="autoplay"
                type='radio'
                id={'autoplayYes'}
                value={true}
                onChange={onChangeAutoplay}
              />
              <Form.Check
                inline
                label="No"
                name="autoplay"
                type='radio'
                value={false}
                id={`autoplayNo`}
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

export default AddGroupModal;