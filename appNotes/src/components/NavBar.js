import React from 'react';
import { Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom'
function NavBar() {
  return (
    <>
    <Navbar bg="dark" variant="dark" className="nav-bar ">
    <div className="container">
        <div className=''>
      <Navbar.Brand className='m-1' >
        <Link to={'/'}>My Notes</Link>
      </Navbar.Brand>
      <Link className='m-1' to={'/archive'}>Archive</Link></div></div>
    </Navbar>
    <br></br>
    </>
  );
}

export default NavBar;