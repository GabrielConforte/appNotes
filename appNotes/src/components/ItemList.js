import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Modal} from 'react-bootstrap';
import Edit from './Edit';

function ItemList(props) {
  const {
    title = 'default',
    text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    onChange = () => {},
    id
  } = props;

    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

  function onArchive() {
    fetch('http://localhost:3001/api/archive/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(res => {
      onChange();
    });
  }
  function onDelete() {
    fetch('http://localhost:3001/api/notes/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(res => {
      onChange();
    });
  }

  function onEdit() {
      onChange();
  }

  useEffect(() => {
    setRefresh(!refresh); // Esto cambiará el valor de refresh cada vez que showModal cambie
  }, [showModal]); // La dependencia de showModal indica que el efecto se ejecutará cada vez que cambie

  const handleChange = () => {
    setShowModal(false);
  };

  function reduceText(text) {
    const words = text.split(' ');
    const reducedWords = words.slice(0, 10);
    return reducedWords.join(' ') + '...';
  }

  const shortText = reduceText(text);

  return (
    <div className="card p-2">
      <Link to={`note/${id}`}>
        <h3 className="card-title alert alert-success">{title}</h3>
      </Link>
      <div className="card-body">
        <p className="card-text">{shortText}</p>
        <div className="buttons right-align">
        <button className="btn btn-primary m-1" onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-pen-to-square"></i>
            </button>
          <button className="btn btn-secondary m-1" onClick={onArchive}>
          <i className="fa-solid fa-box-archive"></i>
          </button>
          <button className="btn btn-danger m-1" onClick={onDelete}>
          <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit note</Modal.Title>
        </Modal.Header>
        <Edit onChange={handleChange} onEdit={onEdit}id={id}/>
        <Modal.Body>
        </Modal.Body></Modal>
    </div>
  );
}

export default ItemList;