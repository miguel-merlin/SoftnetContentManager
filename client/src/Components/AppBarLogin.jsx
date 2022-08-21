import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Softnet from '../Assets/imgs/Logo Softnet_PNG.png';

const AppBarLogin = () => {
    return(
        <>
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand>
                    <img
                    alt='Softnet'
                    src={Softnet}
                    width="140"
                    height="50"
                    className='d-inline-block align-top'
                    />
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text as={'h5'}>
                        Softnet Content Manager
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
}
export default AppBarLogin;