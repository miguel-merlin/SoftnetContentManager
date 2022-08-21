import Carousel from 'react-bootstrap/Carousel'

const CarouselDashboard = ({ urlImages }) => {
    return (
        <div style={{ height: '100vh' }}>
            <Carousel >
                {urlImages.map(urlImages => (
                    <Carousel.Item key={urlImages._id} intveral={urlImages.tiempoTransicion}>
                        <div className="d-flex justify-content-center">
                            <img
                                src={urlImages.imgUrl}
                                alt={urlImages}
                                height={'auto'}
                                width={'100%'}
                                className="rounded mx-auto d-block"
                            />
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}

export default CarouselDashboard;