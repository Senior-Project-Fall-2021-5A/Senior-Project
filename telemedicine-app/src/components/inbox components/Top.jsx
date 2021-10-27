import React from "react";
import Title from "./Title";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

function Top() {
    return (<div style={{
        display: 'flex',
        justifyContent: 'space-between'
    }}>
        <Title />
        <Link to={`/ComposeMessage`}>
            <Button class='table_button'>Compose Message</Button>
        </Link>
    </div>);
}

export default Top;