<template>
    <div class="col-md-5">
        <h4 class="mx-auto mt-4">Вход в систему как студент</h4>
        <form name="form" @submit="handleLogin">
            <div class="form-group">
                <input type="text" class="form-control" name="nickname" placeholder="Логин" v-model="user.nickname" required/>
            </div>
            <div class="form-group">
                <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="user.password" required/>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Войти</span>
                </button>
            </div>
            <router-link to="/registerStudent">
                Зарегистрироваться
            </router-link>
            <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        name: 'login-student',
        data() {
            return {
                user: {
                    nickname: "",
                    password: ""
                },
                loading: false,
                message: ''
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.authUser.status.loggedIn;
            }
        },
        created() {
            if (this.loggedIn) {
                window.location.href = '/profile';
            }
        },
        methods: {
            handleLogin(e) {
                e.preventDefault();
                this.loading = true;
                this.$store.dispatch("authUser/login", this.user)
                    .then(() => {
                        window.location.href = '/profile';
                    })
                    .catch(e => {
                            this.loading = false;
                            this.message = e.response.data.message;
                        }
                    );
            }
        }
    };
</script>