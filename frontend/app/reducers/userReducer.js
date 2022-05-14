const userReducer = (state, action) => {
    switch (action.type) {
        case "SIGNUP_DATA":
            return { ...state, 
                auth: {
                    id: action.payload.id,
                    nickname: action.payload.nickname,
                    img: action.payload.img,
                    name: action.payload.name,
                    email: action.payload.email,
                }
            }
        default:
            return state;
    }
}

export default userReducer;