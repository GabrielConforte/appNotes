import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
function ItemArchiveList(props) {
    const [showModal, setShowModal] = useState(false);
  const {
    title = 'default',
    text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    onChange = () => {},id,
  } = props;

  function onArchive() {
    fetch('http://localhost:3001/api/archive/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(res => {
      // Ejecutamos la función onChange cuando se realice un cambio en el componente
      onChange();
    });
  }
  const handleChange = () => {
    setShowModal(true);
    setTimeout(() =>{
        setShowModal(false);
    },100 )
  };


  function reduceText(text) {
    const words = text.split(' ');
    const reducedWords = words.slice(0, 10);
    return reducedWords.join(' ') + '...';
  }

  const shortText = reduceText(text);

  return (
    <div className="card p-2">
      <Link onClick={() =>setShowModal(true)}>
      <Modal show={showModal} onHide={() => handleChange()}>
        <Modal.Header closeButton>
          <Modal.Title>unArchive to use</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <button onClick={()=>handleChange()}> close </button>
        </Modal.Body></Modal>
        <h3 className="card-title alert alert-secondary">{title}</h3>
      </Link>
      <div className="card-body">
        <p className="card-text">{shortText}</p>
        <div className="buttons right-align">
          <button className="btn btn-secondary" onClick={onArchive}>
          <i className="fa-solid fa-boxes-packing"></i>
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default ItemArchiveList;
