import axios from "axios";
import { useEffect , useState} from "react";
import "../Trending/Trending.css"
import { SingleContent } from "../../SingleContent/SingleContent";
import CustomPaggination from "../../Paggination/CustomPaggination";
import Genres from "../../Genres/Genres";
import useGenre from "../../Hooks/useGenre";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setnumOfPages] = useState();
  const [selectedGeneres, setSelectedGeneres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGeneres);


  const fetchMovie = async () =>{
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
      console.log(data);
    setContent(data.results);
    setnumOfPages(data.total_pages);
  
  };

  useEffect(() => {
    fetchMovie();
    // eslint-disable-next-line
  }, [page,genreforURL])
  

  return (
    <div>
      <div className="topSpacing">
      </div>
      <div className="pageTitle">
        TV Series
      </div>
      <Genres type="tv"
      selectedGeneres={selectedGeneres} 
      setSelectedGeneres={setSelectedGeneres}
      genres={genres} 
      setGenres={setGenres} 
      setPage={setPage}
      />
      <div className="trending">
        {
          content && content.map((t) => <SingleContent key={t.id} 
          id={t.id}
          poster={t.poster_path} 
          title={t.title || t.name} 
          date={t.first_air_date}
          media_type="tv"
          vote_average={t.vote_average}
          /> )
        }
      </div>
      <CustomPaggination setPage={setPage} numOfPages={numOfPages} />
      <div className="bottom">
      </div>
    </div>
  )
}


export default Series