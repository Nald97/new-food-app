export const setPickupDate = (date) => {
  return {
    type: "SET_PICKUP_DATE",
    date: date,
  };
};

export const getPickupDate = () => {
  return {
    type: "GET_PICKUP_DATE",
  };
};
