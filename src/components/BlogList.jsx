import { Link } from "react-router-dom";

function BlogList ({ blogs, title }) {
//here we use destructuring to pass into specific props that we want
//instead of passing the general parameter "props"


    // const title = props.title;
    // const blogs = props.blogs; /* assigning the value of the props that got inserted as a parameter
    // to the blogs constant declared inside the function */

    if (blogs.length !== 0 ) {
        return (
            <div className="blog-list">
            
            <h2>{title}</h2>
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog._id}>
                    <Link to={`/blogs/${blog._id}`}>
                        <h2>{ blog.title }</h2>
                        <p>Written by { blog.author }</p>
                    </Link>
                </div>
            ))}
            </div>
        )
    } else {
        return (
            <div className="blog-list">
                <h1>Unfortunately there are no blogs right now! Hit the New Blog button to add some!</h1>
            </div>
        )
    }
}


export default BlogList;