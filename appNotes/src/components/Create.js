import React, { useEffect, useState } from 'react';
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';

export default function Create(props) {


  const { onChange = () =>{}} = props;

  const [titleLength, setTitleLength] = useState(25);
  const [textLength, setTextLength] = useState(4000);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [category, setCategory] = useState('No Category');
  const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        const getCategory = () =>{
        fetch(`http://localhost:3001/api/categorias`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        }).then(res => res.json())
        .then(data => {
            //add a new object of the same type to the category list called no category

            setCategoryList(data);
        })
        .catch(err => console.log(err));
    }
    getCategory();
    
    if(categoryId > 0){
        fetch(`http://localhost:3001/api/categorias/${categoryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            }).then(res => res.json())
            .then(data => {
                setCategory(data.name);
            })
            .catch(err => console.log(err));
        }

    }, [categoryId]);


  

  const sendData = async (e) => {
    e.preventDefault();
    let categoriaId = categoryId;
    console.log(categoryId);
    try {
        const response = await fetch('http://localhost:3001/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, text, categoriaId })
      }); 
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    onChange();
  };
  return (
    <>
    <div className='card'> <div className='card-body'>
      <Form onSubmit={(e) => sendData(e)}>
        <Form.Group className=''>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" maxLength={50} placeholder="Ingresa un título" onChange={(e) => {setTitle(e.target.value);  setTitleLength(25- e.target.value.length  )}}></Form.Control>
          {titleLength < 15 ? <><p className='text-danger'>{titleLength} left </p></> : <><p className='text-success'>{titleLength} left</p></>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea" maxLength={4000} rows="5" placeholder="Ingresa el texto de la nota" onChange={(e) =>{ setText(e.target.value);  setTextLength(4000 - e.target.value.length  )}} />
          {textLength < 250 ? <><p className='text-danger'>{textLength} left </p></> : <><p className='text-success'>{textLength} left</p></>}
        </Form.Group>
        <Form.Group>
        <Form.Label>Category</Form.Label>
            <DropdownButton id="dropdown-basic-button" title={category} onSelect={(eventKey) => {setCategoryId(eventKey);}}>
            {categoryList !== null || undefined ? <>
            {categoryList.map((category) => (
            <Dropdown.Item key={category.id} eventKey={category.id}>{category.name}</Dropdown.Item>
            ))}</> :
            <>Loading</>
}
            </DropdownButton>
            </Form.Group>
        <div className='right-align'>
            <Button variant="success" className='' onClick={(e) => sendData(e)}>Add note</Button>
            <Button className='btn btn-warning ms-1' onClick={onChange}>Cancel</Button>
        </div>
        
      </Form></div></div>
    </>
  );
}
