import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import ErrorComponent from './Error'; 

const Boards = ({ boards }) => {
  if (!boards || boards.length === 0) {
    return <ErrorComponent message="No boards found." />;
  }

  return (
    <Container>
      <Grid container spacing={2}>
        {boards.map(data => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
            <Link to={`/boards/${data.id}`} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  background: 'linear-gradient(to right, rgb(75,59,142), rgb(117,61,138))',color: 'white',fontSize: '18px', marginTop:'50px', fontWeight: '550', padding: '20px',borderRadius: '8px',boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', textAlign: 'left',display: 'flex',flexDirection: 'column',  alignItems: 'flex-start',justifyContent: 'flex-start',height: '100px',fontFamily: 'Roboto, Helvetica, Arial, sans-serif',cursor:'pointer', textDecoration: 'none',
                }}
              >
                {data.name}
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Boards;
