import React from 'react';
import {Pagination, PaginationItem } from '@mui/material'

const MyPagination = ({ page, count, onPageChange}) => {

  const handleChange = (event, value) => {
      onPageChange(value);
  }
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Pagination
      variant="outlined" shape="rounded"
        page={page}
        count={count}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            component="div"
            {...item}
            onClick={() => onPageChange(item.page)}
          />
        )}
      />
    </div>
  )
}

export default MyPagination