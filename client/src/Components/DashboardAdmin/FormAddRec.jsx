import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form'
import AddIcon from '../../Assets/imgs/Add.png'
import { AuthContext } from '../../Context/AuthContext';
import { addRecurso } from '../../Services/adminServices';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const FormAddRec = ({ id, setImages }) => {
    const { businessId } = useContext(AuthContext)
    const [show, setShow] = useState(false)
    const [tiempoTransicion, setTiempoTransicion] = useState(5)
    const [selectedFile, setSelectedFile] = useState([])

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const onChangeTiempo = (event) => {
        setTiempoTransicion(event.target.value)
    }

    const onChangeFiles = (event) => {
        setSelectedFile(event.target.files)
    }

    const handleSubmit = () => {
        addRecurso(selectedFile, tiempoTransicion, id, businessId)
            .then(response => {
                for (let i = 0; i < response.data.listRecursos.length; i++) {
                    setImages(prevArray => [...prevArray, response.data.listRecursos[i]])
                }
            })
            .finally(
                handleClose()
            )
    }

    return (
        <div>
            {show ? (
                <div>
                    <Form.Group className="mb-3">
                        <Form.Label>Selecciona una imagen</Form.Label>
                        <Form.Control type="file" onInput={onChangeFiles} multiple name="file-uploader" id="file-uploader" />
                        <br/>
                        <Form.Label >Tiempo Transicion (segundos)</Form.Label>
                        <Form.Control
                            type="number"
                            id="inputTiempo"
                            onChange={onChangeTiempo}
                        />
                    </Form.Group>
                    <Row style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Col>
                            <Button style={{}} variant="outline-danger" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Col>
                        <Col>
                            <Button style={{}} variant="outline-success" onClick={handleSubmit}>
                                Guardar
                            </Button>
                        </Col>
                    </Row>
                </div>
            ) : (
                <div>
                    <img src={AddIcon} alt="Add Icon" onClick={handleShow} height={'30'} width={'30'} style={{display: 'block', marginLeft:'auto', marginRight:'auto'}}/>
                </div>
            )}
        </div>
    )
}

export default FormAddRec;