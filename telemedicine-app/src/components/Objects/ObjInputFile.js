import React, { Component } from 'react'
import ObjButton from './ObjButton';


class ObjInputFile extends Component {
    fileHandler = (event) => {
        console.log(event);
        console.log(event.target);
        console.log(event.target.files);
    }

    inputClick = (event) => {

    }

    render() {
        return (
            <div>
                <label className="objbutton" for="inputFile">Upload</label>
                <input 
                    className="objinputfile-input-hidden" 
                    id="inputFile" 
                    type="file" 
                    style={{visibility:"hidden"}} 
                    onChange={this.fileHandler}
                />
            </div>
            
        )
    }
}

export default ObjInputFile;
