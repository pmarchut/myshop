import React from 'react';
import { connect } from 'react-redux';
import { ShopStoreState } from '../../redux/store';

const withProducts = (WrappedComponent: React.ComponentType<any>) => {
  class WithProducts extends React.Component<any> {
    render() {
      const { products } = this.props;
      return (
        <WrappedComponent
          {...this.props}
          products={products}
        />
      );
    }
  }

  const mapStateToProps = (state: ShopStoreState) => ({
    products: state.shop.products,
  });

  return connect(mapStateToProps)(WithProducts);
};

export default withProducts;
