import { connect } from "react-redux";
import Cart from "./Cart";

// subscribes to store updates and returns an object that contains a slice of
// the store data we wish to make available as props to our component
function mapStateToProps(state) {
  return {
    totalCost: state.totalCost,
    productCart: state.productCart,
  };
}

//provides our component with access to the action creator functions that can be
//called to dispatch an action to the store
function mapDispatchToProps(dispatch) {
  return {
    onAddProduct: (productName, productPrice) =>
      dispatch({
        type: "addProduct",
        productData: {
          productName: productName,
          productPrice: productPrice,
        },
      }),
    onDeleteProduct: (productData) =>
      dispatch({
        type: "deleteProduct",
        productData: productData,
      }),
  };
}

//connect mapStateToProps and mapDispatchToProps to our Cart component so that
//it has access to totalCost, onAddProduct, onDeleteProduct
var connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default connectedComponent;
