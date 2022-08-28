import {useState} from 'react';

const TestComponent = () => {
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);

    function handleClick() {
        setCount(c => c + 1);
        setFlag(f => !f);
    }

    // console.log('render');

    return (
        <div>
            <button onClick={handleClick}>click</button>
            <h1 style={{backgroundColor: flag ? "blue" : "red"}}>{count}</h1>
        </div>
    );
};

export default TestComponent;