import { useState , useEffect} from 'react';

const useFetch = (url) => {
    
    
    const [ data, setData] = useState(null);
    const [ isPending, setIsPending] = useState(true);
    const [error,  setError ] = useState(null);


    useEffect(() => {
        const abortCont = new AbortController();


        setTimeout(() => { //setting a timeout of 1 second to simulate the data loading
        fetch(url, { signal: abortCont.signal})
        //associating the abort controller we created above with the fetch 
        .then(res => {
            if(!res.ok) {
                throw Error('Could not fetch the data for that resource');
            }
            return res.json();
        })
        .then( data => {
            setData(data);
            setIsPending(false); //changes the IsPending status so the loading div dissapears and the blogs appear
            setError(null);
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                // console.log('Aborted...');
            } else {
                setError(err.message);
                console.log(err.message); //this catches any network error
            }
            
        });
    },1000);

    return () => abortCont.abort();
    }, [url]);



    return {data, isPending , error };
}

export default useFetch;