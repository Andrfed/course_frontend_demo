import http from "../http-common";

function loginUser(user) {
    var data = {
        nickname: user.nickname,
        password: user.password
    };
    return http
            .post("/loginUser", data)
            .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('isAdmin', false);
            }
            return response.data;
        });

}
function loginAdmin(admin) {
    var data = {
        nickname: admin.nickname,
        password: admin.password
    };
    return http
            .post("/loginAdmin", data)
            .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('admin', JSON.stringify(response.data));
                localStorage.setItem('isAdmin', true);
            }
            return response.data;
        });

}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
}

function registerUser(user) {
    var data = {
        nickname: user.nickname,
        password: user.password
    };
    return http.post("/registerUser", data);
}

function registerAdmin(admin) {
    var data = {
        nickname: admin.nickname,
        password: admin.password
    };
    return http.post("/registerAdmin", data);
}

export default {
    loginUser: loginUser,
    loginAdmin: loginAdmin,
    logout: logout,
    registerUser: registerUser,
    registerAdmin: registerAdmin
};