import {useEffect} from 'react';

export const useFetch = (url) => {
    useEffect(() => {
        fetch(url).then(x => {
            console.log(x)
        })
    }, [url])
}