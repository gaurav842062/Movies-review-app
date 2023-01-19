import "../Trending/Trending.css"
import { TextField, ThemeProvider } from "@material-ui/core"
import FormControl from '@mui/material/FormControl';
import SearchIcon from "@mui/icons-material/Search";
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { grey } from "@mui/material/colors";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from "react";
import axios from "axios";
import { SingleContent } from "../../SingleContent/SingleContent";
import CustomPaggination from "../../Paggination/CustomPaggination";




const color = grey[400]

const darktheme = createTheme({
  palette: {
    primary: {
      main: color
    }
  },
});

const Search = () => {

  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setnumOfPages] = useState();

  const fetchSearch = async () =>{
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_DB_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setContent(data.results);
    setnumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0,0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page])
  

  return (
    <div>
    <div className="topSpacing">
    </div>
    <div style={{display: "flex" , paddingTop : 30}}>
    <ThemeProvider theme={darktheme}>
    <FormControl sx={{ width: '40ch' }}>
    <TextField label="Search" variant="filled" focused onChange={(e) =>{setSearchText(e.target.value)}}/>
    </FormControl>
    <Button variant="outlined" startIcon={<SearchIcon />} style={{marginLeft:10 , paddingRight:5 , backgroundColor:'#D8D8D8'}} onClick={fetchSearch}>
    </Button>
    </ThemeProvider>
    </div>
    <div style={{paddingTop: 10}}>
    <Tabs value={type} textColor="primary" indicatorColor="primary"
    onChange={(event, newValue) => {
        setType(newValue);
        setPage(1);
    }} >
    <Tab sx={{width : '50%' , color: 'white' }} label="SEARCH MOVIES" />
    <Tab sx={{width : '50%' , color: 'white'}} label="SEARCH TV SERIES" />
    </Tabs>
    </div>
    <div>
    <div className="trending">
        {
          content && content.map((t) => (<SingleContent key={t.id} 
          id={t.id}
          poster={t.poster_path} 
          title={t.title || t.name} 
          date={t.first_air_date || t.release_date}
          media_type={type ? "tv" : "movie"}
          vote_average={t.vote_average}
          /> )
          )}
      {searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 &&<CustomPaggination setPage={setPage} numOfPages={numOfPages}/>}
      <div className="bottom">
      </div>
    </div>
    </div>
  )
}

export default Search;