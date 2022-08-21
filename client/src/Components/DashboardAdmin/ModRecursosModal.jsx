import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../Context/AuthContext';
import { getRecursosByGroup, delRecursoById, reOrderRecursos } from '../../Services/adminServices';
import ImageList from './Drag&Drop/ImageList';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import TrashIcon from '../../Assets/imgs/DeleteIcon.png'
import FormAddRec from './FormAddRec';
import { useNavigate } from 'react-router-dom'

function ModRecursosModal({ id }) {
  const { businessId } = useContext(AuthContext)
  const [images, setImages] = useState([])

  const navigate = useNavigate()

  const type = "Image";

  const TrashCan = (props) => {
    const [, dropRef] = useDrop({
      accept: type,
      drop: props.onDrop,
    })

    return (
      <div ref={dropRef}>
        <img src={TrashIcon} alt='DeleteIcon' style={{ height: 45, width: 45, display:'block', marginLeft:'auto', marginRight:'auto' }} />
      </div>
    )
  }



  useEffect(() => {
    getRecursosByGroup(id, businessId)
      .then(response => {
        let len = response.data.length;
        for (let i = 0; i < len; i++) {
          setImages(prevArray => [...prevArray, response.data[i]])
        }
      })
  }, [id, businessId])

  const handleSubmit = () => {
    reOrderRecursos(images)
      .then(
        handleClose()
      )
  }

  const onDrop = (item) => {
    console.log(images)
    delRecursoById(item.id)
      .then(result => {
        const indexOfObject = images.findIndex(object => { return object._id === item.id })
        setImages(
          update(images, {
            $splice: [[indexOfObject, 1]]
          })
        )
        console.log(images)
      })
  }

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex];
    setImages(
      update(images, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
      })
    );
  };

  const handleClose = () => {
    navigate('/DashboardAdmin')
  }

  return (
    <>

      <h4>Modificar recursos</h4>
      {images.length === 0 ? <p style={{ textAlign: 'center' }}>No hay recursos disponibles</p> : (
        <DndProvider backend={HTML5Backend} moveImage={moveImage}>
          <TrashCan onDrop={onDrop} />
          <ImageList images={images} moveImage={moveImage} />
        </DndProvider>
      )}
      <FormAddRec id={id} setImages={setImages} />

      <Button variant="outline-secondary" onClick={handleClose}>
        Regresar
      </Button>
      <Button variant="outline-primary" onClick={handleSubmit}>
        Aceptar
      </Button>
    </>
  );
}

export default ModRecursosModal;