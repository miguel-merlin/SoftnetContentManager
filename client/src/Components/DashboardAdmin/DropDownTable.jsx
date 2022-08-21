import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DelGroupModal from './DelGroupModal';
import ActGroupModal from './ActGroupModal';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const DropDownTable = ({ index, setGrupos, grupos }) => {
    const navigate = useNavigate()

    var id = grupos[index]._id

    const onClick = () => {
        navigate(`/Recursos/${id}`)
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic"/>

            <Dropdown.Menu>
                <Dropdown.Item> <Button onClick={onClick} variant="outline-success">Modificar Recursos</Button> </Dropdown.Item>
                <Dropdown.Item > <DelGroupModal index={index} setGrupos={setGrupos} grupos={grupos} /> </Dropdown.Item>
                <Dropdown.Item > <ActGroupModal index={index} setGrupos={setGrupos} grupos={grupos} /> </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropDownTable;