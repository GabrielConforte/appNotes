import React, { useEffect, useState } from 'react';
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';

export default function Edit(props) {

    const {onChange = () =>{}} = props;
    const [loadData,setLoadData] = useState(false);
    const [categoryId, setCategoryId] = useState(0);
    const [category, setCategory] = useState(' ');
    const [categoryList, setCategoryList] = useState([]);



useEffect(() => {
    getCategory();
    setLoadData(true)
    },[loadData]);

useEffect(() => {
    getCategoryName(categoryId)
},[categoryId])

const getCategoryName = async (categoryId) =>{
    if(categoryId > 0){
       await fetch(`http://localhost:3001/api/categorias/${categoryId}`, {
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
    
} 
const getCategory = () =>{
    fetch(`http://localhost:3001/api/categorias`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    }).then(res => res.json())
    .then(data => {setCategoryList(data);
    })
    .catch(err => console.log(err));
}

const onDelete=()=>{
    if(categoryId!==0){
    fetch(`http://localhost:3001/api/categorias/${categoryId}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }}).then(res => {res.json()
    onChange();
    })
    .catch(err => console.log(err));}
}

const sendData = async (e) => {
    e.preventDefault();
    let name = category;
    try {
        if(categoryId!==0){
        await fetch(`http://localhost:3001/api/categorias/${categoryId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
      }); 
      onChange();}
        
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    {loadData===true ? <> <div className='card'> <div className='card-body'>
      <Form>
        <Form.Group>
        <Form.Label>Select a category</Form.Label>
            <DropdownButton id="dropdown-basic-button" title={category} onSelect={(eventKey) => {setCategoryId(eventKey);}}>
            {categoryList !== null || undefined ? <>
            {categoryList.map((category) => (
            <Dropdown.Item key={category.id} eventKey={category.id}>{category.name}</Dropdown.Item>
            ))}</> :
            <><div>Loading</div></>}
            </DropdownButton>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
          <Form.Label className='m-2' >Edit name</Form.Label>
          <Form.Control className='m-2' type="text" value={category} onChange={e => setCategory(e.target.value)} />
        </Form.Group>
        <div className='right-align'>
        <Button variant="primary" type="submit" onClick={sendData}>
            Edit
        </Button>
        <Button type="submit" variant="danger" className=' ms-1' onClick={(e) => onDelete(e)}>
            Delete
                </Button>
        <Button className='btn btn-warning ms-1' onClick={onChange}>
            Cancel
                </Button>
        </div>
        
      </Form></div></div></> : <><div>Loading</div></> }
   
    </>
  );
}