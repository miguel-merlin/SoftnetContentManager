import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Softnet from '../../Assets/imgs/Logo Softnet_PNG.png'

const FormLogin = ({ onChangeEmail, onChangePassword, onClick, email, password, loading }) => {
    return (
        <>
            <Container style={{ marginTop: '20px', paddingTop: '30px', paddingBottom: '30px' }}>
                <Row style={{ marginBottom: '15px' }}>
                    <Col />
                    <Col>
                        <img
                            alt="Logo Softnet"
                            src={Softnet}
                            width="280"
                            height="100"
                            style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                        />
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col />
                    <Col>
                        <h2 style={{ textAlign: "center" }}>Inicio de sesion</h2>
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
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" onChange={onChangePassword} value={password} />
                            </FloatingLabel>
                        </Form>
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col />
                    <Col style={{ marginTop: '20px', textAlign: 'center' }}>
                        <div className='d-grid gap-2'>
                            <Button onClick={onClick} variant="secondary" disabled={loading}>{loading ? 'Cargando...' : 'Login'}</Button>
                        </div>
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col />
                    <Col>
                        <Row>
                            <Col />
                            <Col md="auto">
                                <Nav>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="/RecoverPassword" >Olvidaste tu contraseña?</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col/>
                        </Row>
                    </Col>
                    <Col />
                </Row>
            </Container>
        </>
    )
}

export default FormLogin;