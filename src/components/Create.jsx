import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title , setTitle] = useState('');
    const [body, setBody ] = useState('');
    const [author, setAuthor] = useState('mario' || 'yoshi');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault(); //prevents the default submit
        const blog = {title, body, author};

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(()=>{
            console.log('new blog added');
            setIsPending(false);
            history.push("/"); //using history to go redirect back to the home page
        })
    }

    return (
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                    type="text"
                    required 
                    value={title}
                    placeholder="e.g 'Hello world!'..."
                    onChange={(e) => setTitle(e.target.value)} //e stands for event
                    
                />

                <label>Blog body:</label>
                <textarea
                    required
                    value = {body}
                    onChange={(e) => setBody(e.target.value)} //e stands for event
                    placeholder = "e.g 'Today was a great day...'"
                    ></textarea>
                
                <label>Blog author:</label>
                <select 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">Mario</option>
                    <option value="yoshi">Yoshi</option>
                </select>
                { !isPending && <button>Add blog</button>}
                { isPending && <button disabled>Adding blog...</button>}
            </form>
        </div>
    );
}

export default Create;