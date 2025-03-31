import React, { Component } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, List, ListItem, ListItemText, Typography, IconButton, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { WithCartProps } from "../types";
import withCart from "./hoc/withCart"; // Import HOC 

type CartDialogProps = WithCartProps & {
  open: boolean;
  onClose: () => void;
};

class CartDialog extends Component<CartDialogProps> {
  handleQuantityChange = (productId: number, value: string, availableQuantity: number) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      const newQuantity = Math.max(1, Math.min(quantity, availableQuantity));

      this.props.updateQuantity({ productId, quantity: newQuantity });
    }
  };

  handlePurchase = () => {
    this.props.clearCart(); // Czyści koszyk po zakupie
    this.props.onClose(); // Zamknij dialog
  };

  render() {
    const { cart, open, onClose } = this.props;
    const totalPrice = cart
      .reduce(
        (acc, item) => acc + parseFloat(item.product.price.replace(" zł", "")) * item.quantity,
        0
      )
      .toFixed(2);

    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Twój Koszyk</DialogTitle>
        <DialogContent>
          {cart.length === 0 ? (
            <Typography variant="body1">Koszyk jest pusty.</Typography>
          ) : (
            <List>
              {cart.map((item) => (
                <ListItem
                  key={item.product.id}
                  secondaryAction={
                    <IconButton edge="end" color="error" onClick={() => this.props.removeFromCart(item.product.id)}>
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item.product.name}
                    secondary={`Cena: ${item.product.price}`}
                  />
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={(e) => this.handleQuantityChange(item.product.id, e.target.value, item.product.availableQuantity)}
                    slotProps={{ htmlInput: { min: 1, max: item.product.availableQuantity } }}
                    sx={{ width: "60px", ml: 2 }}
                  />
                </ListItem>
              ))}
            </List>
          )}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Podsumowanie: {totalPrice} zł
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Zamknij
          </Button>
          <Button onClick={this.handlePurchase} color="primary" variant="contained" disabled={cart.length === 0}>
            Zakup
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withCart(CartDialog);
