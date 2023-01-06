import React from "react";
import styled from 'styled-components';

const Button = styled.button


function clickMe(){
    alert('Added to Cart');
}

export default function App() {
    return(
        <div>
            <button onClick={clickMe}>
                Add To Cart
            </button>
        </div>
    );
}