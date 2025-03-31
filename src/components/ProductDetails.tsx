import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { ShopStoreState } from "../redux/store";
import { Product } from "../types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook do nawigacji
  const product: Product | undefined = useSelector((state: ShopStoreState) =>
    state.shop.products.find((p) => p.id === Number(id))
  );

  // Sprawdzamy, ile tego samego produktu znajduje się już w koszyku
  const cart = useSelector((state: ShopStoreState) => state.shop.cart);
  const cartQuantity = cart.reduce((acc, item) => {
    if (item.product.id === Number(id)) {
      return acc + item.quantity;
    }
    return acc;
  }, 0);

  const [quantity, setQuantity] = useState(1);

  // Obliczamy dostępność ilości, uwzględniając już wybrane produkty w koszyku
  const availableQuantity = product ? product.availableQuantity - cartQuantity : 0;

  if (!product) {
    return <Typography variant="h6">Produkt nie znaleziony.</Typography>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  // Funkcja do obsługi kliknięcia w przycisk "Wróć"
  const handleGoBack = () => {
    navigate(-1); // Przechodzi do poprzedniej strony
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, Math.min(Number(e.target.value), availableQuantity));
    setQuantity(newQuantity);
  };

  return (
    <Container sx={{ mt: 4, justifyContent: "center", display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Układ w kolumnie na małych ekranach, a w wierszu na większych
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        {/* Obrazek produktu */}
        <Box sx={{ flex: 1 }}>
          <img src={product.picture} alt={product.name} style={{ maxWidth: "100%", height: "auto" }} />
        </Box>

        {/* Sekcja z opisem i formularzem */}
        <Box sx={{ flex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>

          {/* Pełny opis produktu */}
          <Typography variant="body1" gutterBottom>{product.description}</Typography>

          {/* Opis punktowy */}
          {product.descriptionPoints && product.descriptionPoints.length > 0 && (
            <List sx={{ mt: 2 }}>
              {product.descriptionPoints.map((point, index) => (
                <ListItem key={index}>
                  <ListItemText primary={point.point} />
                </ListItem>
              ))}
            </List>
          )}

          <Typography variant="body2" color="text.secondary">
            Dostępna ilość: {availableQuantity}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>{product.price}</Typography>

          {/* Formularz z ilością */}
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <TextField
              type="number"
              label="Ilość"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1, max: availableQuantity }}
              sx={{ width: "100px" }}
            />
            <Button
              startIcon={<AddShoppingCartIcon />}
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={quantity > availableQuantity}
            >
              {quantity > availableQuantity ? "Brak dostępnej ilości" : "Dodaj do koszyka"}
            </Button>
            <Button color="inherit" onClick={handleGoBack}>
              Wróć
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetails;
