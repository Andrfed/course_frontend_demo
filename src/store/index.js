import { createStore } from "vuex";
import { authUser } from './authUser.module';
import { authAdmin } from './authAdmin.module';

const store = createStore({
    modules: {
        authUser,
        authAdmin
    },
});
export default store;