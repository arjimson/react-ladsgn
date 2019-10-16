import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts/sample')
        .then(res => {
            setItems(res.data)
        })
    }, [items])

    const onChangeHandler = (e) => {
        setItem(e.target.value)
    }

    const onSubmitHandler = () => {
        const data = {
            item: item
        }

        axios.post('http://localhost:5000/api/posts/sample', data)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <input type="text" onChange={onChangeHandler}/>
            <button type="button" onClick={onSubmitHandler}>Submit</button>
            <ul>
                {items.map(theItem => 
                    <li>{theItem.title}</li>
                )}
            </ul>
        </>
    )
}

export default App;