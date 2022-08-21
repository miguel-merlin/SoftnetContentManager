import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Softnet from '../../Assets/imgs/Logo Softnet_PNG.png'

const FormRecoverPassword = ({email, onChangeEmail, onClick}) => {
    return (
        <>
            <Container>
                <Row>
                    <Col />
                    <Col>
                        <img
                            alt="Logo Softnet"
                            src={Softnet}
                            width="140"
                            height="50" />
                    </Col>
                </Row>
                <Row>
                    <Col />
                    <Col>
                        <h2>Recupera tu contraseña</h2>
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col />
                    <Col>
                        <Form>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control type="email" onChange={onChangeEmail} value={email} />
                            </FloatingLabel>
                        </Form>
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col />
                    <Col>
                        <Button onClick={onClick}>Recuperar Contraseña</Button>
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col />
                    <Col>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/">Regresa a inicio de sesion</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col />
                </Row>
            </Container>
        </>
    )
}

export default FormRecoverPassword;