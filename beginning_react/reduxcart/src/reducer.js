//Reducer

function cartReducer(state, action) {
  if (state === undefined) {
    //initialize our state
    return {
      totalCost: 0,
      productCart: [],
    };
  }

  switch (action.type) {
    //increment totalCost by productPrice and return a new productCart with newly added product
    case "addProduct":
      return {
        ...state,
        totalCost: state.totalCost + parseInt(action.productData.productPrice),
        productCart: state.productCart.concat({
          productName: action.productData.productName,
          productPrice: action.productData.productPrice,
        }),
      };
    //subtract productPrice from totalCost, and return a productCart with target product omitted
    case "deleteProduct":
      const updateArray = state.productCart.filter(
        (product) => product.productName !== action.productData.productName
      );
      return {
        ...state,
        totalCost: state.totalCost - parseInt(action.productData.productPrice),
        productCart: updateArray,
      };
    default:
      return state;
  }
}

export default cartReducer;
