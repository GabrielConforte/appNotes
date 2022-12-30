import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import moment from 'moment';

function Item(props) {
  const [item, setItem] = useState(null);
  const [loadedData, setLoadedData] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/api/notes/${id}`)
      .then(response => response.json())
      .then(data => {
        setItem(data);
        setLoadedData(false);
      });
  }, [id]);

  if (!loadedData) {
    return (
    <>
    <div className='container'>
    <Card>
        <Card.Header as="h5">{item.title}</Card.Header>
        <Card.Body>
          <Card.Text>{item.text}</Card.Text>
          
        </Card.Body>
        <Card.Footer> 
          <Card.Text>Created at: {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Card.Text>
          <Card.Text>Updated at: {moment(item.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</Card.Text>
          </Card.Footer>
      </Card>
      </div>
      </>
    );
  } else {
    return <div>Loading</div>;
  }
}

export default Item;