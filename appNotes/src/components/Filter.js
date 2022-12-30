import React, { useEffect, useState } from 'react';
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';

export default function Edit(props) {

    const {onChange = () =>{},onClean = ()=>{}} = props;
    const [loadData,setLoadData] = useState(false);
    const [categoryId, setCategoryId] = useState(0);
    const [category, setCategory] = useState('No Filter');
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

const handleCategorySelect = (eventKey) => {
    setCategoryId(eventKey);
    getCategoryName(eventKey);
    onChange(eventKey, category);
  }

  return (
    <>
    {loadData===true ? <> <div className='card'> <div className='card-body'>
      <Form>
        <Form.Group>
        <Form.Label>Category</Form.Label>
        <DropdownButton id="dropdown-basic-button" title={category} onSelect={handleCategorySelect}>
  {categoryList !== null || undefined ? <>
  {categoryList.map((category) => (
  <Dropdown.Item key={category.id} eventKey={category.id}>{category.name}</Dropdown.Item>
  ))}</> :
  <><div>Loading</div></>}
</DropdownButton>
            </Form.Group>
        <div className='right-align'>
            <Button className='btn btn-warning ms-1' onClick={()=>{onClean()}}>Clean</Button>
        </div>
        
      </Form></div></div></> : <><div>Loading</div></> }
   
    </>
  );
}