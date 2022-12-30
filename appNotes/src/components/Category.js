
import CreateCategory from './CreateCategory';
import EditCategory from './EditCategory';

import React from 'react'

export default function Category(props) {

    const {onChange = () =>{}} = props;

  return (
    <>
       
        <div className='p-2'> <CreateCategory onChange={onChange}></CreateCategory></div>
        <div className='p-2'><EditCategory onChange={onChange}></EditCategory></div>
    </>
  )
}

