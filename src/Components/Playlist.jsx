import React,{useContext} from 'react'
import Listitem from './Listitem'
import MPContext from './Context';

export default function Playlist() {

  const mpContext=useContext(MPContext);
  
  return (
    <div className={`playList ${!mpContext.togglePlayList? "togglePlayList" : ""}`} >
            <div className='playListHeader'>PlayList </div>
            <div className='playListBody'>
              
            {
               mpContext.songs.map((song,index)=>{
                  return <Listitem song={song} key={index} />
               })
            }
             
            </div>
    </div>
  )
}
