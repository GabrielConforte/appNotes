
import './App.css';
import List from './components/List.js';
import Create from './components/Create';
import Edit from './components/Edit';
import NavBar from './components/NavBar';
import Item from './components/Item';
import ArchiveList from './components/ArchiveList';
import Category from './components/Category';
import Filter from './components/Filter';


import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import {useEffect, useState} from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [filterId, setFilterId] = useState(0);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
      setRefresh(!refresh);
    }, [showModal]);
  
    const handleChange = () => {
      setShowModal(false);
      setShowModalB(false);
    };

    const handleChangeFilter = (id, name) => {
      setFilterId(id);
      setShowModalC(false);
    };

    const handleClean = (id) => {
      setFilterId(0);
      setShowModalC(false);
    }

  return (<>
    <BrowserRouter>
        <NavBar></NavBar>
    <div className="container">
      <div className=''>
        <button className='mb-3 ms-3 btn btn-success new-button btn-block' onClick={() => setShowModal(true)}>add note
          <i className="ms-1 fa-solid fa-circle-plus"></i>
          </button>
          <button className='mb-3 ms-3 btn btn-primary new-button btn-block' onClick={() => setShowModalB(true)}>categories
          <i className="m-1 fa-solid fa-list"></i>
          </button>
          <button className='mb-3 ms-3 btn btn-warning new-button btn-block' onClick={() => setShowModalC(true)}>Filter
          <i className="m-1 fa-solid fa-filter"></i>
          </button>
        </div>
          <Routes>
            <Route exact path="/" element={<List onChange={handleChange} refresh={refresh} filter={filterId}> </List>}></Route>
            <Route path="/create" element={<Create></Create>}></Route>
            <Route path="/edit" element={<Edit></Edit>}></Route>
            <Route path='/archive' element={<ArchiveList></ArchiveList>}></Route>
            <Route path="/note/:id" element={<Item></Item>}></Route>
          </Routes>
          
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Note</Modal.Title>
        </Modal.Header>
        <Create onChange={handleChange}/>
        <Modal.Body>
        </Modal.Body></Modal>

        <Modal show={showModalB} onHide={() => setShowModalB(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Categories</Modal.Title>
        </Modal.Header>
        <Category onChange={handleChange}/>
        <Modal.Body>
        </Modal.Body></Modal>

        <Modal show={showModalC} onHide={() => setShowModalC(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Filter</Modal.Title>
        </Modal.Header>
        <Filter onChange={handleChangeFilter} onClean={handleClean}/>
        <Modal.Body>
        </Modal.Body></Modal>
    </div>
    </BrowserRouter></>
  );
}

export default App;
