import React,{useContext,useEffect,useRef} from 'react'
import MPContext from './Context';

export default function Songinfo() {
  const mpContext=useContext(MPContext);
  const divRef=useRef();

  useEffect(()=>{
    divRef.current.style.backgroundImage=mpContext.songs[mpContext.currentSongIndex].img ;
  })

  return (
    <div ref={divRef} className='songInfo'>
              <div className='songName'>{mpContext.songs[mpContext.currentSongIndex].songName}</div>
              <div className='artistName'>{mpContext.songs[mpContext.currentSongIndex].artistName}</div>
              <div className='albomName'>https://www.linkedin.com/in/bahmanshamsini</div>
            </div>
  )
}
