import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function CreateCategory(props) {


  const { onChange = () =>{}} = props;

  const [name, setName] = useState();


  const sendData = async (e) => {
    e.preventDefault();
    try {
        await fetch('http://localhost:3001/api/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      onChange();
    } catch (error) {
      console.error(error);
    }
    
  };
  return (
    <>
    <div className='card'> <div className='card-body'>
      <Form onSubmit={(e) => sendData(e)}>
        <Form.Group>
          <Form.Label className='mb-2'>New Category</Form.Label>
          <Form.Control className='mb-2' type="text" maxLength={25} placeholder="Ingresa un título" onChange={(e) => {setName(e.target.value);}}></Form.Control>
        </Form.Group>
        
        <div className='right-align'>
            <Button variant="success" className='' onClick={(e) => sendData(e)}>Add Category</Button>
            <Button className='btn btn-warning ms-1' onClick={onChange}>Cancel</Button>
        </div>
        
      </Form></div></div>
    </>
  );
}
