import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import userReducer from "../reducers/userReducer";

export const store = createStore(rootReducer);
export const userStore = createStore(userReducer);

// export default store,userStore;
// export userStore;