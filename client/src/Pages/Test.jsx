import CarouselTest from "../Components/Carousel/CarouselTest"
import {useState, useEffect} from 'react'
import { getURLs } from "../Services/userServices"

const Test = () => {
    const [urlImages, setUrlImages] = useState([])

    useEffect(() => {
        getURLs("62fe6a4616c0783cc0d948c3", '62b1e7a9e1439e0e22def2fe')
            .then(response => {
                console.log(response)
                let len = response.data.length;
                if (len === 0) {
                    alert("No hay recursos disponibles para este grupo")
                    return
                }
                for (let i = 0; i < len; i++) {
                    setUrlImages(prevArray => [...prevArray, response.data[i]])
                }
            })
    }, [])
    return (
        <CarouselTest urlImages={urlImages}/>
    )
}

export default Test;