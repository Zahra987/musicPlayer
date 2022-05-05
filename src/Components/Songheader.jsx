import React,{useContext, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight,faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import MPContext from './Context';

export default function Songheader() {

  const mpContext=useContext(MPContext);
  const [angleIcon,setAngleIcon]=useState(faAngleRight);
  const [visibility,setVisibility]=useState(false);
  return (
    <div className='songHeader'>
              <div onClick={()=>{
                      mpContext.setTogglePlayList(!mpContext.togglePlayList);
                      setAngleIcon((mpContext.togglePlayList)? faAngleRight : faAngleLeft)
                    }} 
                   className='playListBtn'>
                <div id='listBtn'>PlayList</div>
                 <FontAwesomeIcon icon={angleIcon} />
                 </div>
              </div>
  )
}
