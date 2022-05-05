import React from 'react'
import Songheader from './Songheader';
import Songinfo from './Songinfo';
import Songcontrol from './Songcontrol';

export default function Song() {
  return (
    <div className='song'>
            <Songheader />
            <Songinfo />
            <Songcontrol />
        </div>
  )
}
