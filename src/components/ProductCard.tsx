import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Product, WithCartProps, WithRouterProps } from "../types";
import withCart from "./hoc/withCart"; // Import HOC 
import withRouter from "./hoc/withRouter";

type ProductCardProps = {
    product: Product;
} & WithCartProps & WithRouterProps; // Dodanie propsów z HOC

class ProductCard extends React.Component<ProductCardProps> {
    // Funkcja do obliczenia ilości danego produktu w koszyku
    getProductInCartCount = (productId: number) => {
        const { cart } = this.props;
        const productInCart = cart.find((item) => item.product.id === productId);
        return productInCart ? productInCart.quantity : 0;
    };

    state = {
        productInCartCount: this.getProductInCartCount(this.props.product.id)
    };

    handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation(); // Zatrzymanie propagacji zdarzenia kliknięcia
      // aby nie wywołać nawigacji do podglądu produktu

      const { product, addToCart } = this.props;
      addToCart({ product, quantity: 1 }); // Dodanie produktu do koszyka z domyślną ilością 1
    };

    handleNavigate = () => {
        const { product, navigate } = this.props;
        navigate(`/product/${product.id}`); // Przejście do podglądu produktu
    };

    // Funkcja do reagowania na zmiany w koszyku
    componentDidUpdate(prevProps: ProductCardProps) {
        if (prevProps.cart !== this.props.cart) {
            // Jeśli koszyk się zmienił, zaktualizuj ilość tego produktu
            const productInCartCount = this.getProductInCartCount(this.props.product.id);
            this.setState({ productInCartCount });
        }
    }
  
    render() {
      const { product } = this.props;
      const isMaxQuantity = this.state.productInCartCount >= product.availableQuantity;

      return (
        <Card 
            sx={{ maxWidth: 300, m: "auto", display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
            onClick={this.handleNavigate} // Cała karta nawiguję do podglądu
        >
            <CardMedia
                component="img"
                style={{ height: "226.5px", width: "151px" }}
                image={product.picture}
                alt={product.name}
                sx={{ p: 2, pb: 0 }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                {product.price}
                </Typography>
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "end", p: 1 }}>
                <Button 
                    startIcon={<AddShoppingCartIcon />} 
                    onClick={this.handleAddToCart} 
                    variant="contained"
                    disabled={isMaxQuantity} // Dezaktywacja przycisku, jeśli maksymalna ilość
                >
                    {isMaxQuantity ? "Brak dostępnej ilości" : "Dodaj do koszyka"}
                </Button>
            </Box>
        </Card>
      );
    }}
  
export default withRouter(withCart(ProductCard));
