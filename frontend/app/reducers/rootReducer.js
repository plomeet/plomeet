const initialState = {
    distSum: 0,
    isPlogging: false,
    showPloggingEndPage: false,
    timeSum: 0,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DISTSUM":
            return { ...state, distSum: action.payload }
        case "ISPLOGGING":
            return { ...state, isPlogging: action.payload }
        case "SET_SHOWENDPAGE":
            return { ...state, showPloggingEndPage: action.payload }
        case "SET_TIMESUM":
            return { ...state, timeSum: action.payload }
        default:
            return state;
    }
};

export default rootReducer;