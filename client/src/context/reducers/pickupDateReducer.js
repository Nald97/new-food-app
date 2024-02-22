// pick up date reducer

const pickupDateReducer = (state, action) => {
  switch (action.type) {
    case "SET_PICKUP_DATE":
      return action.date;

    case "GET_PICKUP_DATE":
      return state;

    default:
      return state;
  }
};

export default pickupDateReducer;
