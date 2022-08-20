import { Link, useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { _id } = useParams()
    const { data: blog , error , isPending } = useFetch('http://localhost:8001/blogs/' + _id);
    // data: blog means that for the data we use the name blog

    const history = useHistory();



    function handleDelete() {
        fetch(`http://localhost:8001/blogs/delete/${blog._id}`)
        .then(() => {
            console.log('Blog is being handled by the server');
            history.push("/"); 
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
                    <Link to="/"><button>Home</button></Link>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
    );
}


export default BlogDetails;