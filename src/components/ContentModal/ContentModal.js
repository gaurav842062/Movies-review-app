import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import "./ContentModal.css"
import { YouTube } from '@mui/icons-material';
import Carousel from "../Carousel/Carousel";

const style = {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 2,
    color: "white",
    boxShadow: 24,
    ml:3,
    mt:10,
    mr:5,
    
};

export default function ContentModal({children , media_type , id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const fetchData = async () => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_DB_API_KEY}&language=en-US`
    );
    setContent(data)
  }

  const fetchVideo = async () => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_DB_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key)
  }

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, [])
  

  return (
    <>
      <div onClick={handleOpen} className="media">{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {content && 
            <div className='mainModel'>
              {<img 
                className='poster_portrait' 
                alt={content.name || content.title} 
                src={content.poster_path?`${img_500}/${content.poster_path}`: unavailable} />}
              <img 
                className='poster_landscape' 
                alt={content.name || content.title} 
                src={content.backdrop_path?`${img_500}/${content.backdrop_path}`: unavailableLandscape} /> 
              <div className='model_details'>
                <span className='model_title'>
                  {content.name || content.title}(
                  {(
                      content.first_air_date || content.release_date || '----'
                  ).substring(0,4)}
                  )         
                </span>
                {content.tagline && (
                  <i className='tagline'>{content.tagline}</i>
                )}
                <span className='content_discription'>
                  {content.overview}
                </span>
                <div>
                  <Carousel media_type={media_type} id={id} />
                </div>
                <Button 
                variant="contained"
                color='error'
                target="__blank"
                href={`https://www.youtube.com/watch?v=${video}`} 
                startIcon={<YouTube />}
                sx={{'&:hover': {
                  color: 'white',
                  backgroundColor:'red'
                },}}
                >
                  Watch the Trailer
                </Button>
              </div>
            </div>
            }
          
        </Box>
      </Modal>
    </>
  );
}