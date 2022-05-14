export const signupData = (data) => ({
    type: "SIGNUP_DATA",
    payload: {
        id: data.id,
        nickname: data.nickname,
        img: data.img,
        name: data.name,
        email: data.email
    }
});