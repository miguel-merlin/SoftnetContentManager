import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const TableUser = ({ arrayGrupos }) => {
    const navigate = useNavigate()
    const navigateCarousel = (id) => {
        navigate(`/Carousel/${id}`)
    }

    console.log(arrayGrupos)

    return (
        <>
            <Container>
                <Row>
                    <Table striped>
                        <thead>
                            <tr>
                                <th><h6>Grupos disponibles</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrayGrupos.map(function (groups, index) {
                                var id = arrayGrupos[index]._id
                                console.log(groups)
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Row>
                                                <Col sm={10}>
                                                    {groups.grupoName}
                                                </Col>
                                                <Col sm={2}>
                                                    <Button onClick={() => { navigateCarousel(id) }}>Visualizar</Button>
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

export default TableUser;