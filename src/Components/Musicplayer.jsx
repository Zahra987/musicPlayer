import React,{ useRef, useState} from 'react'
import Playlist from './Playlist';
import Song from './Song';
import MPContext from './Context';

export default function Musicplayer() {
  
  const audioRef=useRef();
  const [songs,setSongs]=useState([
      
      {
         id:0,
         img: "url(https://music-fa.com/wp-content/uploads/2022/02/Vahid-Moradi-Manike-Music-fa.com_.jpg)",
         artistName: "وحید مرادی",
         songName: "منیکه منیکه",
         song: "https://dls.music-fa.com/tagdl/NEW2022/Vahid%20Moradi%20-%20Divaneye%20Zanjiri%20(320).mp3",
         active:false
      },
      {
        id:1,
        img: "url(https://musictag.ir/wp-content/uploads/2022/03/Amin-Ara-Amir-Hossein-Farahmand-Sheypoore-Jang.jpg)",
        artistName: "امین آرا و امیرحسین فرهمند",
        songName: "بزن زنگ و بزن شیپور جنگ و بزن",
        song: "https://dl.musictag.ir/track/1400/12/Amin%20Ara%20%26%20Amir%20Hossein%20Farahmand%20-%20Sheypoore%20Jang%20%28128%29.mp3",
        active:false
        },
        {
          id:2,
          img: "url(https://musicdel.ir/wp-content/uploads/2021/03/Wahid-Roham.jpg)",
          artistName: "وحيد رهام",
          songName: "خاله خاله جان",
          song: "https://dl.musicdel.ir/Music/1400/01/Wahid%20Roham%20-%20Khala%20Jan%20(128).mp3",
          active:false
          }
  ]);

  const [played,setPlayed]=useState(false);
  const [timer,setTimer]=useState("0:00");
  const [duration,setDuration]=useState("0:00");
  const [currentSongIndex,setCurrentSongIndex]=useState(1);
  const [inputValue,setInputValue]=useState(0);
  const [togglePlayList,setTogglePlayList]=useState(false);
  const [inputMax,setInputMax]=useState(0);

 function handleSongTime(time) {
   const times=audioRef.current[time];
   const minutes = parseInt(times/60);
   const seconds = parseInt(times-minutes*60);
    if (seconds<=9) {
      return `${minutes}:0${seconds}`;
       }else{
          return `${minutes}:${seconds}`;
      }
  }

  return (
   
           <MPContext.Provider value={
            {
               audioRef:audioRef,
               played:played,
               setPlayed:setPlayed,
               duration:duration,
               timer:timer,
               playlistLength:songs.length,
               currentSongIndex:currentSongIndex,
               setCurrentSongIndex:setCurrentSongIndex,
               songs:songs,
               setSongs:setSongs,
               inputValue:inputValue,
               setInputValue:setInputValue,
               togglePlayList:togglePlayList,
               setTogglePlayList:setTogglePlayList,
               inputMax:inputMax
            }
            }>
             
             <div className='container'>
             <audio
               ref={audioRef}
               //controls 
               src={songs[currentSongIndex].song}
               onLoadedMetadata={()=>{
                setDuration(handleSongTime("duration"));
                setInputMax(audioRef.current.duration);
               }}
               onTimeUpdate={()=>{
                 if (audioRef.current.currentTime===audioRef.current.duration) {
                  setCurrentSongIndex((1+currentSongIndex)%songs.length);
                  audioRef.current.autoplay=true;
                  const newSongs = songs.map((item)=>{
                    if (item.id===songs[currentSongIndex].id) {
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
                  setSongs(newSongs);
                 }
                setTimer(handleSongTime("currentTime"));
                setInputValue(audioRef.current.currentTime);
               }}
               ></audio>
            <Song  />
            <Playlist />
           </div>
           </MPContext.Provider>
           
  )
}
