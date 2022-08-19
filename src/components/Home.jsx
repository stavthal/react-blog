import useFetch from "./useFetch";
import BlogList  from "./BlogList";


const Home = () => {

    const { data, isPending , error } = useFetch('http://localhost:8000/blogs');

    return (
        <div className="home">
            { error && <div> {error} </div>}
            { !error && isPending && <div>Loading...</div>}
           {!isPending && <BlogList blogs={data} title="All blogs"/>}
        </div>
    );
}


export default Home;