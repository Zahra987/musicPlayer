import React,{useEffect, useRef,useContext} from 'react'
import MPContext from './Context';

export default function Listitem({song}) {

    const divRef=useRef();
    const mpContext=useContext(MPContext);

    useEffect(()=>{
      divRef.current.style.backgroundImage=song.img ;
    },[])

    
    function handleClick() {
      mpContext.setCurrentSongIndex(song.id);
      mpContext.audioRef.current.autoplay=false;
      if (mpContext.played) {
        mpContext.audioRef.current.autoplay=true;
      }
      const newSongs = mpContext.songs.map((item)=>{
        if (item.id===song.id) {
          return {
            ...item,
            active:true
          } 
        }
        return {
          ...item,
          active:false
        }
      })
      mpContext.setSongs(newSongs);
      
    }

  return (
    <div onClick={handleClick} className={`playListItem ${song.active? "selected":""}`} >
                <div ref={divRef} className='itemImg'></div>
                <div className='itemInfo'>
                  <div>songName</div>
                  <div>artistName</div>
                 </div>
    </div>
  )
}
 