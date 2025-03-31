import React, { useState } from 'react';
import TheHeader from './components/TheHeader';
import ProductList from './components/ProductsList';
import CartDialog from './components/CartDialog';
import ProductDetails from './components/ProductDetails';
import { Box } from '@mui/material'; // Importujemy Box z Material UI
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <TheHeader onCartClick={handleDialogOpen} />
          <div style={{ paddingTop: "64px" }}> {/* Dodanie odstępu dla zawartości */}
            <Box sx={{ padding: 2 }}> {/* Dodajemy odstęp wokół ProductList */}
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
              </Routes>
            </Box>
            <CartDialog open={openDialog} onClose={handleDialogClose} />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
