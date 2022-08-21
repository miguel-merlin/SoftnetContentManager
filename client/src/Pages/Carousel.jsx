import React, { useContext, useState, useEffect } from 'react';
import CarouselDashboard from "../Components/Carousel/CarouselDashboard"
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { getURLs } from '../Services/userServices'
import Button from 'react-bootstrap/esm/Button';
import { Navigate, useNavigate } from 'react-router-dom';


const CarouselPage = () => {
    const { role, setRunCheck } = useContext(AuthContext)
    const { id } = useParams();
    const { businessId } = useContext(AuthContext)
    const [urlImages, setUrlImages] = useState([])
    const [recursosExists, setRecursosExist] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        getURLs(id, businessId)
            .then(response => {
                console.log(response)
                let len = response.data.length;
                if (len === 0) {
                    alert("No hay recursos disponibles para este grupo")
                    setRecursosExist(false)
                    return
                }
                for (let i = 0; i < len; i++) {
                    setUrlImages(prevArray => [...prevArray, response.data[i]])
                }
            })
    }, [id, businessId])

    return (
        <div>
            {recursosExists ? (
                <div>
                    <Button onClick={() => {
                        setRunCheck(false)
                        navigate(`/Dashboard${role}`)
                    }}>X</Button>
                    <CarouselDashboard urlImages={urlImages} />
                </div>
            ) : (
                <div>
                    <Navigate to={`/Dashboard${role}`} />
                </div>
            )}
        </div>
    )
}

export default CarouselPage;