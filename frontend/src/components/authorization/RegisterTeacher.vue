<template>
    <div class="col-md-5">
        <h4 class="mx-auto mt-4">Регистрация преподавателя</h4>
        <form name="form" @submit="handleRegister">
            <div v-if="!successful">
                <div class="form-group">
                    <input type="text" class="form-control" name="nickname" placeholder="Логин" v-model="admin.nickname" required/>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="admin.password" required/>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary">Зарегистрировать</button>
                </div>
            </div>
            <div class="form-group">
                <div v-if="message" class="alert alert-success" role="alert">{{message}}</div>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        name: 'RegisterTeacher',
        data() {
            return {
                admin: {
                    nickname: "",
                    password: ""
                },
                successful: false,
                message: ''
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.authAdmin.status.loggedIn;
            }
        },
        mounted() {
            if (this.loggedIn) {
                window.location.href = '/';
            }
        },
        methods: {
            handleRegister(e) {
                e.preventDefault();
                this.message = '';

                this.$store.dispatch("authAdmin/register", this.admin)
                    .then( data => {
                        this.message = data.message;
                        this.successful = true;
                    })
                    .catch(e => {
                            this.message = e.response.data.message;
                        }
                    );

            }
        }
    };
</script>