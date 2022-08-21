import Table from 'react-bootstrap/Table'
import DropDownTable from './DropDownTable'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useNavigate } from 'react-router-dom'

const TableAdmin = ({ arrayGroups, setGrupos }) => {
    const navigate = useNavigate();
    const navigateCarousel = (id) => {
        navigate(`/Carousel/${id}`)
    }

    return (
        <>
            <Container>
                <Row>
                    <Table striped>
                        <thead>
                            <tr>
                                <th><h6>Grupos Disponibles</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrayGroups.map(function (groups, index) {
                                var id = arrayGroups[index]._id;
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Row>
                                                <Col sm={10}>
                                                    {groups.grupoName}
                                                </Col>
                                                <Col sm={2}>
                                                    <ButtonGroup>
                                                        <Button style={{marginRight: '1px'}} variant='primary' onClick={() => { navigateCarousel(id) }}>Visualizar</Button>
                                                        <DropDownTable index={index} grupos={arrayGroups} setGrupos={setGrupos} />
                                                    </ButtonGroup>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    )
}

export default TableAdmin;