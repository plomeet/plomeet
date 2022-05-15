const initialState = {
    id: "",
    nickname: "",
    img: "",
    name: "",
    email: "",
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ID":
            return { ...state, id: action.payload }
        case "SET_NICKNAME":
            return { ...state, nickname: action.payload }
        case "SET_IMG":
            return { ...state, img: action.payload }
        case "SET_NAME":
            return { ...state, name: action.payload }
        case "SET_EMAIL":
            return { ...state, email: action.payload }
        default:
            return state;
    }
}

export default userReducer;