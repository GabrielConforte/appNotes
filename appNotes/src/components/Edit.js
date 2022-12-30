import React, { useEffect, useState } from 'react';
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';

export default function Edit(props) {


    const {onChange = () =>{},onEdit = () =>{},id} = props;
    const [loadData,setLoadData] = useState(false);
    const [title, setTitle] = useState('title');
    const [text, setText] = useState('text');
    const [categoryId, setCategoryId] = useState(0);
    const [category, setCategory] = useState('No Category');
    const [categoryList, setCategoryList] = useState([]);


const getNote = async () =>{
    if(id){
        await fetch(`http://localhost:3001/api/notes/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            }).then(res => res.json())
            .then(data => {
                getCategoryName(data.categoriaId);
                setText(data.text)
                setTitle(data.title)
                
            })
            .catch(err => console.log(err));
        }

}
useEffect(() => {
    getNote();
    getCategory();
    setLoadData(true)
    },[loadData]);

useEffect(() => {
    getCategoryName(categoryId)
},[categoryId])

const getCategoryName = async (categoryId) => {
    if (categoryId > 0) {
      try {
        const response = await fetch(`http://localhost:3001/api/categorias/${categoryId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCategory(data.name);
        } else {
          // Maneja el error
          setCategory('No category');
        }
      } catch (error) {
        console.log(error);
        setCategory('No category');
      }
    }
  };

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

const sendData = async (e) => {
    e.preventDefault();
    let categoriaId = categoryId;
    try {
        await fetch(`http://localhost:3001/api/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, text, categoriaId })
      }); 
      onEdit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    {loadData===true ? <> <div className='card'> <div className='card-body'>
      <Form onSubmit={(e) => sendData(e)}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" maxLength={25} value={title} onChange={(e) => {setTitle(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea" maxLength={4000} rows="5" value={text} onChange={(e) =>{ setText(e.target.value)}} />
        </Form.Group>
        <Form.Group>
        <Form.Label>Category</Form.Label>
            <DropdownButton id="dropdown-basic-button" title={category} onSelect={(eventKey) => {setCategoryId(eventKey);}}>
            {categoryList !== null || undefined ? <>
            {categoryList.map((category) => (
            <Dropdown.Item key={category.id} eventKey={category.id}>{category.name}</Dropdown.Item>
            ))}</> :
            <><div>Loading</div></>
}
            </DropdownButton>
            </Form.Group>
        <div className='right-align'>
            <Button type="submit" variant="success" className='' onSubmit={(e) => sendData(e)}>Edit</Button>
            <Button className='btn btn-warning ms-1' onClick={onChange}>Cancel</Button>
        </div>
        
      </Form></div></div></> : <><div>Loading</div></> }
   
    </>
  );
}


/**import React, { useEffect, useState } from 'react';
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';

export default function Edit(props) {


    const {onChange = () =>{},onEdit = () =>{},id} = props;
    const [loadData,setLoadData] = useState(false);
    const [titleLength, setTitleLength] = useState(25);
    const [textLength, setTextLength] = useState(4000);
    const [note, setNote] = useState(null);
    const [title, setTitle] = useState('title');
    const [text, setText] = useState('text');
    const [categoryId, setCategoryId] = useState(0);
    const [category, setCategory] = useState('No Category');
    const [categoryList, setCategoryList] = useState([]);

useEffect(() => {
    getNote();
    getCategory();
    setLoadData(true)

    }, [categoryId,loadData]);

const getNote = async () =>{
    if(id){
        await fetch(`http://localhost:3001/api/notes/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            }).then(res => res.json())
            .then(data => {
                
                setNote(data);
                getCategoryName(data.categoriaId);
                setText(data.text)
                setTitle(data.title)
                
            })
            .catch(err => console.log(err));
        }

}

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

const sendData = async (e) => {
    e.preventDefault();
    let categoriaId = categoryId;
    try {
        const response = await fetch(`http://localhost:3001/api/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, text, categoriaId })
      }); 
      onEdit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    {loadData===true ? <> <div className='card'> <div className='card-body'>
      <Form onSubmit={(e) => sendData(e)}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" maxLength={25} value={title} onChange={(e) => {setTitle(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea" maxLength={4000} rows="5" value={text} onChange={(e) =>{ setText(e.target.value)}} />
        </Form.Group>
        <Form.Group>
        <Form.Label>Category</Form.Label>
            <DropdownButton id="dropdown-basic-button" title={category} onSelect={(eventKey) => {setCategoryId(eventKey);}}>
            {categoryList !== null || undefined ? <>
            {categoryList.map((category) => (
            <Dropdown.Item key={category.id} eventKey={category.id}>{category.name}</Dropdown.Item>
            ))}</> :
            <><div>Loading</div></>
}
            </DropdownButton>
            </Form.Group>
        <div className='right-align'>
            <Button variant="success" className='' onClick={(e) => sendData(e)}>Edit</Button>
            <Button className='btn btn-warning ms-1' onClick={onChange}>Cancel</Button>
        </div>
        
      </Form></div></div></> : <><div>Loading</div></> }
   
    </>
  );
} */