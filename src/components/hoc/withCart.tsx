import React from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../../redux/reducer';
import { ShopStoreState } from '../../redux/store';

const withCart = (WrappedComponent: React.ComponentType<any>) => {
  class WithCart extends React.Component<any> {
    render() {
      const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = this.props;
      return (
        <WrappedComponent
          {...this.props}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
        />
      );
    }
  }

  const mapStateToProps = (state: ShopStoreState) => ({
    cart: state.shop.cart,
  });

  const mapDispatchToProps = {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithCart);
};

export default withCart;
