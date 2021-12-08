import React, { useState } from 'react';
import { Data } from './Data';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import avatar from "./assets/img_avatar.png";


const avatarStyle = {
    verticalAlign: "middle",
    width: "50px",
    height: "50px",
    borderRadius: "50%"
};


const AccordionSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100vh;
`;

const Container = styled.div`
    position: absolute;
    top: 30%
    box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);
`;

const Wrap = styled.div`
    background: #272727;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    h1 {
        padding: 2rem;
        font-size: 2rem;
    }

    span {
        margin-right: 1.5rem;
    }
`;

const Dropdown = styled.div`
    background: #1c1c1c;
    color: #00ffb9;
    width: 100%;   
    height: 100px;
    display: flex;
    felx-direction: column;\
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #00ffb9;
    border-top: 1px solid #00ffb9;

    p {
    font-size: 2rem;
  }

`;

const Accordion = () => {
    const [clicked, setClicked] = useState(false)

    const toggle = index => {
        // if clicked thing is already active then close it
        if (clicked === index) {
            return setClicked(null)
        }
        setClicked(index)
    }

    return (
        <AccordionSection>
            <Container>
                {Data.map((item, index) => {
                    return (
                        <>
                            <Wrap onClick={() => toggle(index)} key={index}>
                                <img src={avatar} style={avatarStyle}></img>
                                <h1>{item.Name}</h1>
                                <h1>{item.Date}</h1>
                                <h1>{item.Subject}</h1>
                                <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                            </Wrap>
                            {clicked === index ? (
                                <Dropdown>
                                    <p class="lead">{item.Message}</p>
                                </Dropdown>
                            ) : null}

                        </>
                    )
                })}
            </Container>
        </AccordionSection>
    )
}

export default Accordion
