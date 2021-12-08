import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
  
function NotesPopUp({value}){
  return(
  <div>
    
    <Popup trigger={<h1><button className="notesBtn"> Notes </button></h1>}>
       <h4>Notes</h4>
      <div>{value}</div>
      
    </Popup>
  </div>
  )
}

export default NotesPopUp