import React, { useState } from 'react'
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import { useGetMoviesQuery } from '../../services/TMDB'
import { MovieList, Pagination, FeaturedMovie } from '../index'

const Movies = () => {
  const [page, setPage] = useState(1)
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory)
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery })

  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'))
  const numberOfMoviesToShow = lg ? 17 : 19

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    )
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">No movies that match that name.</Typography>
        <br />
        Please search for something else
      </Box>
    )
  }

  if (error) return 'error in movies component has occured'

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data.results} numberOfMovies={numberOfMoviesToShow} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.totalPages} />
    </div>
  )
}

export default Movies
