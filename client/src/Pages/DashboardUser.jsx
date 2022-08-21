import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AppBarDashboard from "../Components/AppBarDashboard";
import TableUser from '../Components/DashboardUser/TableUser';
import { AuthContext } from "../Context/AuthContext";
import { fetchData, checkDefault } from '../Services/userServices';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DashboardUser = () => {
    const { isLoggedIn, businessId, firstName, runCheck } = useContext(AuthContext)
    const [errMsg, setErrMsg] = useState('')
    const [grupos, setGrupos] = useState([]);
    const [defaultGroup, setDefaultGroup] = useState(false)
    const [id, SetId] = useState('');

    useEffect(() => {
        fetchData(businessId)
            .then(response => {
                console.log(response)
                let len = response.data.grupos.length
                for (let i = 0; i < len; i++) {
                    setGrupos(prevArray => [...prevArray, response.data.grupos[i]])
                }
            })
            .catch(error => {
                setErrMsg(error)
            })

        if (runCheck) {
            checkDefault(businessId)
                .then(response => {
                    console.log(response)
                    console.log(response.data.length)
                    if (response.data.length !== 0) {
                        setDefaultGroup(true)
                        SetId(response.data[0]._id)
                        return
                    }

                })
        }
    }, [businessId, runCheck])

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    {defaultGroup ? (
                        <div>
                            <Navigate to={`/Carousel/${id}`} />
                        </div>
                    ) : (
                        <div>
                            <AppBarDashboard />
                            <Container style={{ marginTop: '40px' }}>
                                <Row> <h3>Bienvenido, {firstName}</h3> </Row>
                                <Row style={{ marginTop: '20px' }}>
                                    <Col sm={1} />
                                    <Col sm={10}>
                                        <TableUser arrayGrupos={grupos} />
                                    </Col>
                                    <Col sm={1} />
                                </Row>
                            </Container>
                        </div>
                    )}
                </div>
            ) : (
                <Navigate replace to="/Login" />
            )}
        </div>
    )
}

export default DashboardUser;