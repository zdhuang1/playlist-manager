import React from 'react';

export default function DoSomething() { 

}
/* 
    ** learning arrow functions **
        - can use const, let, or var but const is std
        - if you need to export:
            * normal function --> export default {function}
            * arrow function --> export {arrow_function}
*/

// vid said this syntax helps with callback functions, what is a callback funciton?


export const DoSomething = () => {
    return <div> </div>
}

// definining in-line commands using anonymous functions

const Button = ({}) => {
    return (
        <div>
            <button type="button"
                onClick={() => {
                    console.log("hello world");
                }}
            ></button>
        </div>
    );
}


// when coding in react the goal is to minimize the number of lines that you have to write
// react allows you to write your js directly into your jsx (modified html) 

// ternary operators

let age = 10;
