import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const AppBarDashboard = () => {
    const { fullLogo, setIsLoggedIn, setRole, setRunCheck } = useContext(AuthContext)

    const onClick = () => {
        setRole('')
        setRunCheck(true)
        setIsLoggedIn(false)
    }

    return (
        <>
            <Navbar bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand>
                        <img
                            alt='Business Logo'
                            src={fullLogo}
                            width="140"
                            height="50"
                            className='d-inline-block align-top'
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className='justify-content-end'>
                        <Navbar.Text as={Link} to="/" onClick={onClick}>
                            LOGOUT
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default AppBarDashboard;