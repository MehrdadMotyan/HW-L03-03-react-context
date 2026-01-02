import Charts from './components/Charts';
import { Typography, Container, Box, Grid } from '@mui/material';
import './App.css'
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10" dir="rtl">
      <Container maxWidth="lg">
        <Box className="mb-12 text-center">
          <Typography variant="h3" className="font-black text-slate-800 mb-2">
            مدیریت هزینه‌ها
          </Typography>
        </Box>

        <Grid container spacing={4} mb={8} justifyContent="center">
          <Grid item xs={12} md={5}>
            <AddTransaction />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TransactionList />
          </Grid>
        </Grid>
        
        <Box className="mb-10 w-full">
          <Charts />
        </Box>

      </Container>
    </div>
  )
}

export default App;