import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
  
function NotesPopUp({value, label}){
  return(
  <div>    
    <Popup trigger={<h1><button className="notesBtn"> {label} </button></h1>}>
      <p>{value}</p>      
    </Popup>
  </div>
  )
}

export default NotesPopUp