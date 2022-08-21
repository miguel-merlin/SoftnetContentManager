import React, { useState, useContext, useEffect } from 'react';
import AppBarDashboard from "../Components/AppBarDashboard";
import TableAdmin from '../Components/DashboardAdmin/TableAdmin';
import AddGroupModal from '../Components/DashboardAdmin/AddGroupModal'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext'
import { fetchData, } from '../Services/adminServices';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const DashboardAdmin = () => {
    const { isLoggedIn, businessId, firstName } = useContext(AuthContext)
    const [errMsg, setErrMsg] = useState('');
    const [grupos, setGrupos] = useState([]);

    useEffect(() => {
        fetchData(businessId)
            .then(result => {
                console.log(result)
                let len = result.data.grupos.length
                for (let i = 0; i < len; i++) {
                    setGrupos(prevArray => [...prevArray, result.data.grupos[i]])
                }
            })
            .catch(error => {
                console.log(error)
            }
            )
    }, [businessId])

    return (
        <>
            {isLoggedIn ? (
                <>
                    <AppBarDashboard />
                    <Container style={{ marginTop: '40px' }}>
                        <Row> <h3>Bienvenido, {firstName}</h3> </Row>
                        <Row>
                            <Col sm={10} />
                            <Col sm={2}>
                                <AddGroupModal setGrupos={setGrupos} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Col sm={1}/>
                            <Col sm={10}>
                                <TableAdmin arrayGroups={grupos} setGrupos={setGrupos} />
                            </Col>
                            <Col sm={1}/> 
                        </Row>
                    </Container>
                </>
            ) : (
                <Navigate replace to="/" />
            )}
        </>
    )
}

export default DashboardAdmin;