import Carousel from 'react-bootstrap/Carousel'

function CarouselTest({ urlImages }) {
    return (
        <div style={{ height: '100vh' }}>
            <Carousel>
                {urlImages.map(urlImages => (
                    <Carousel.Item key={urlImages._id}>
                        <div class="d-flex justify-content-center">
                            <img
                                className="testimonialImages d-block w-50"
                                src={urlImages.imgUrl}
                                alt={urlImages}
                                height={'auto'}
                                width={'100%'}
                            />
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default CarouselTest;

