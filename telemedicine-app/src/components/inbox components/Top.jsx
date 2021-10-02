import React from "react";
import Title from "./Title";
import Button from "react-bootstrap/Button";

function Top () {
    return(<div style={{
        display: 'flex',
        justifyContent: 'space-between'     
    }}>
        <Title />
        <Button variant="primary">Compose Message</Button>{' '}
    </div>);
}

export default Top;