import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause,faPlay,faForwardFast,faBackwardFast } from '@fortawesome/free-solid-svg-icons';
import MPContext from './Context';


export default function Songcontrol() {
  
  const mpContext=useContext(MPContext);
  const [playPauseIcon,setPlayePauseIcon]=useState(faPlay);


  function handleClick() {
    if(mpContext.played){
      mpContext.audioRef.current.pause();
      setPlayePauseIcon(faPlay);
      mpContext.setPlayed(false);
    }else{
      mpContext.audioRef.current.play();
      setPlayePauseIcon(faPause);
      mpContext.setPlayed(true);
    }
  }

  function nextSong(skip) {

    const newSongs = mpContext.songs.map((item)=>{
      if (item.id===mpContext.songs[mpContext.currentSongIndex].id) {
        return {
          ...item,
          active:false
        } 
      }
      return {
        ...item,
        active:false
      }
    })
    mpContext.setSongs(newSongs);

      mpContext.audioRef.current.autoplay=false;
      if(skip=="next"){
          mpContext.setCurrentSongIndex((1+mpContext.currentSongIndex)%mpContext.playlistLength);
          if (mpContext.played) {
               mpContext.audioRef.current.autoplay=true;
               }
      }else{
          if (!mpContext.currentSongIndex) {
               mpContext.setCurrentSongIndex(mpContext.playlistLength-1);
               mpContext.audioRef.current.autoplay=true;
                }else{
                    mpContext.setCurrentSongIndex((mpContext.currentSongIndex-1));
                    if (mpContext.played) {
                          mpContext.audioRef.current.autoplay=true;
                      }
                }
      }
  }

  function dragHandle(e) {
    mpContext.audioRef.current.currentTime=e.target.value;
    mpContext.setInputValue(e.target.value);
  }

  return (
  
     <div className='songControl'>
              <div className='timeControl'>
                <p id='timerStyle'>{mpContext.timer}</p>
                <input type="range" 
                    min={0} max={mpContext.inputMax} value={mpContext.inputValue} 
                    onChange={dragHandle}
                    />
                <p id='songTimeStyle'>{mpContext.duration}</p>
              </div>
              <div className='iconsControl'>
               <FontAwesomeIcon id='prevStyle' icon={faBackwardFast}
                   onClick={()=>{
                    nextSong("prev")
                   }}
               />
               <FontAwesomeIcon id='playStyle' icon={playPauseIcon}  
                   onClick={handleClick} 
               />
               <FontAwesomeIcon id='nextStyle' icon={faForwardFast} 
                   onClick={()=>{
                    nextSong("next")
                   }}
               />
              </div>
            </div>
   
  )
}
