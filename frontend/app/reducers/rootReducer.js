const initialState = {
    distSum: 0,
  };
  
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DISTSUM":
            return { ...state, distSum: action.payload }
        default:
            return state;
    }
  };
  
  export default rootReducer;