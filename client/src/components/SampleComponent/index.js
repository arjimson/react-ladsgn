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
    }, [])

    const onChangeHandler = (e) => {
        setItem(e.target.value)
    }

    const onSubmitHandler = () => {
        const data = {
            title: item
        }

        axios.post('http://localhost:5000/api/posts/sample', data)
        .then(res => {
            console.log(res)
            
        })
        .catch(err => {
            console.log(err)
        })

        setItems([...items, data])
    }

    return (
        <>
            <input type="text" onChange={onChangeHandler}/>
            <button type="button" onClick={onSubmitHandler}>Submit</button>
            <ChildComponent data={items} key={items} />
        </>
    )
}

const ChildComponent = ({ data }) => {
    console.log(data)
    const [ha, setHa] = useState(data);
    return (
        <ul>
            {data && data.map((h, i) =>
                <li key={i} >{h.title}</li>
            )}
        </ul>
    )
}

export default App;