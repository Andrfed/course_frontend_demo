import AuthService from '../services/auth.service';
const admin = JSON.parse(localStorage.getItem('admin'));
const initialState = admin // состояния: авторизованный или неавторизованный пользователь
    ? { status: { loggedIn: true }, admin }
    : { status: { loggedIn: false }, admin: null };
export const authAdmin = {
    namespaced: true,
    state: initialState,
    actions: { // действия: 1 - вход (login), 2 - выход (logout), 3 - регистрация (register)
        login({ commit }, admin) {
            return AuthService.loginAdmin(admin).then(
                admin => {
                    commit('loginSuccess', admin);
                    return Promise.resolve(admin);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        register({ commit }, admin) {
            return AuthService.registerAdmin(admin).then(
                response => {
                    commit('registerSuccess');
                    // Promise - объект, представляющий результат успешного или неудачного завершения операции.
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: { // Мутации. Позволяют изменять состояние хранилища во Vuex. Сохраняют данные пользователя в локальное хранилище в браузере. Также удаляют данные пользователя
        loginSuccess(state, admin) {
            state.status.loggedIn = true;
            state.admin = admin;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.admin = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.admin = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
};