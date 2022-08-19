import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams()
    const { data: blog , error , isPending } = useFetch('http://localhost:8000/blogs/' + id);
    // data: blog means that for the data we use the name blog

    const history = useHistory();

    function handleDelete() {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            history.push("/");
            console.log('blog deleted');
        })
    }
    

    return (
        <div className="blog-details">
            { isPending && <div>Loading...</div>}
            { error && <div>{error}</div>}
            { blog && (
                <article>
                    <h2>{ blog.title } </h2>
                    <p> Written by { blog.author }</p>
                    <br></br>
                    <div>{ blog.body }</div>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
    );
}


export default BlogDetails;