import axios from "axios"
import { useEffect, useState } from "react"
import CustomPaggination from "../../Paggination/CustomPaggination";
import { SingleContent } from "../../SingleContent/SingleContent";
import "./Trending.css"

const Trending = () => {
  const [page, setPage] = useState(1)
  const [content,setContent] = useState([]);
  const numOfPages=10;

  const fetchdata = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_DB_API_KEY}&page=${page}`);

    setContent(data.results)
  };


  useEffect( () =>{
    fetchdata();
    // eslint-disable-next-line
  },[page])

  return (
    <div>
      <div className="topSpacing">
      </div>
      <div className="pageTitle">
        Trending
      </div>
      <div className="trending">
        {
          content && content.map((t) => <SingleContent key={t.id} 
          id={t.id}
          poster={t.poster_path} 
          title={t.title || t.name} 
          date={t.first_air_date || t.release_date}
          media_type={t.media_type}
          vote_average={parseFloat(t.vote_average).toFixed(1)}
          /> )
        }
      </div>
      <CustomPaggination setPage={setPage} numOfPages={numOfPages}/>
      <div className="bottom">
      </div>
    </div>
  )
}

export default Trending;