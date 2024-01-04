import React from 'react'
import { Skeleton, Box, Container } from '@mui/material'

const Dummy = () => {
  return (
    <Container
      sx={{
        border: '1px solid #d1cfc8',
        padding: '15px',
        borderRadius: '11px'
      }}
    >
      <Skeleton
        variant="rectangular"
        width={50}
        height={50}
        sx={{
          borderRadius: '10px'
        }}
      ></Skeleton>
      <Skeleton
        variant="text"
        sx={{
          fontSize: '20px'
        }}
      ></Skeleton>
      <Box flexDirection={'row'} gap={1} display={'flex'}>
        <Skeleton
          variant="rectangular"
          width={'100%'}
          height={50}
          sx={{
            borderRadius: '10px'
          }}
        ></Skeleton>
        <Skeleton
          variant="rectangular"
          width={'100%'}
          height={50}
          sx={{
            borderRadius: '10px'
          }}
        ></Skeleton>
      </Box>
    </Container>
  )
}

export default Dummy
