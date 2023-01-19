import * as React from 'react';
import Pagination from '@mui/material/Pagination';


export default function BasicPagination({setPage, numOfPages}) {

  const handlePageChange = (page) =>{
      setPage(page);
      window.scroll(0,0);
  };

  return (
      <div>
      {numOfPages >1 && <Pagination onChange={(e) => {handlePageChange(e.target.textContent)}} 
      hidePrevButton 
      hideNextButton
      count={numOfPages>450? 450 : numOfPages}
      color="primary" 
      sx={{ 
            display: 'flex',
            justifyContent: 'center' }} />}
      </div>
  );
}
