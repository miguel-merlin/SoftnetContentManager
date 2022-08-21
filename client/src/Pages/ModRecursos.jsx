import ModRecursosModal from "../Components/DashboardAdmin/ModRecursosModal";
import { useParams } from "react-router-dom";
import AppBarDashboard from "../Components/AppBarDashboard";
import Container from 'react-bootstrap/Container'

const ModRecursos = () => {
    const { id } = useParams();
    console.log(id)

    return (
        <>
            <AppBarDashboard />
            <Container style={{ marginTop: '20px' }}>
                <ModRecursosModal id={id} />
            </Container>
        </>
    )
}
export default ModRecursos;