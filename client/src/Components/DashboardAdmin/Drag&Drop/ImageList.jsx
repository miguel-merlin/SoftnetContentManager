import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd'
import './ImageList.css'

const type = "Image";

//Render individual images
const Image = ({ image, index, moveImage}) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: type,
        hover(item) {
            if (!ref.current){
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveImage(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag(() => ({
        type: type,
        item: { id: image._id, index },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            };
        },
    }));

    drag(drop(ref));

    return (
        <div className='file-item' ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
            <img alt={`${image._id}`} src={image.imgUrl} className='file-img' />
        </div>
    );
};

const ImageList = ({ images, moveImage }) => {
    const renderImage = (image, index) => {
        return image ? (
            <Image
                image={image}
                key={`${image._id}`}
                moveImage={moveImage}
                index={index}
            />
        ) : null;
    };

    return (
        <section className='file-list'>{images.map(renderImage)}</section>
    )
}

export default ImageList;
