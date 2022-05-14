import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import userReducer from "../reducers/userReducer";

const store = createStore(rootReducer);
const userStore = createStore(userReducer);

export default store;