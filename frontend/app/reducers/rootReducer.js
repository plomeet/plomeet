const initialState = {
    distSum: 0,
    isPlogging: false,
    showPloggingEndPage: false,
    startTime: [],
    weatherLoc: [],
    timeSum: "0 : 00",
    images: [],
    isSave: false,
    ploggingPath: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DISTSUM":
            return { ...state, distSum: action.payload }
        case "ISPLOGGING":
            return { ...state, isPlogging: action.payload }
        case "SET_SHOWENDPAGE":
            return { ...state, showPloggingEndPage: action.payload }
        case "SET_STARTTIME":
            return { ...state, startTime: action.payload }
        case "SET_WEATHERLOC":
            return { ...state, weatherLoc: action.payload }
        case "SET_TIMESUM":
            return { ...state, timeSum: action.payload }
        case "SET_IMAGES":
            return { ...state, images: action.payload }
        case "SET_IS_SAVE":
            return { ...state, isSave: action.payload }
        case "SET_PLOGGINGPATH":
            return { ...state, ploggingPath: [...state.ploggingPath, action.payload] }
        case "RESET_PLOGGINGPATH":
            return { ...state, ploggingPath: [] }
        default:
            return state;
    }
};

export default rootReducer;