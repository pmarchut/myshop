import React, { Component } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { WithCartProps, WithRouterProps } from "../types";
import withCart from "./hoc/withCart"; // Import HOC
import withRouter from "./hoc/withRouter";

type TheHeaderProps = {
  onCartClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
} & WithCartProps & WithRouterProps; // Dodanie propsów z HOC

// Zaktualizowana klasa z HOC
class TheHeader extends Component<TheHeaderProps> {
  render() {
    const { cart, onCartClick } = this.props;
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0); // Zlicz liczbę produktów w koszyku

    // Funkcja obsługująca nawigację do głównej strony
    const handleNavigate = () => {
      const { navigate } = this.props;
      navigate("/"); // Przekierowanie do głównej strony
    };

    return (
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1201, // Zapewnia, że nagłówek będzie nad innymi komponentami
        }}
      >
        <Toolbar>
        <IconButton color="inherit" onClick={handleNavigate} sx={{ mr: 2 }}>
            <StorefrontIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={handleNavigate}>
            𝓜𝔂𝓢𝓱𝓸𝓹
          </Typography>
          <IconButton color={cartItemCount > 0 ? "warning" : "inherit"} onClick={onCartClick}>
            <Badge badgeContent={cartItemCount} color="success">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withCart(TheHeader));
