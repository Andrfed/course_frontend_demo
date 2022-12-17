<template>
    <div class="container-fluid">
        <h4>Добавление преподавателя</h4>
        <div class="mb-3" v-if="!submitted">
            <form @submit="addTeacher">
                <input class="form-control" type="text" name="name" id="name" placeholder="ФИО" required v-model="teacher.name">
                <input class="btn btn-success" type="submit" value="Добавить">
            </form>
        </div>
        <div class="container-fluid" v-else>
            <h4>Вы успешно добавили запись</h4>
            <div class="mb-3">
                <button class="btn btn-primary" v-on:click="newTeacher">Добавить нового преподавателя</button>
            </div>
            <div class="mb-3">
                <router-link to="/listTeachers">Вернуться к списку преподавателей</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddTeacher",
        data() {
            return {
                teacher: {
                    name: "",
                    username: "username",
                    password: "password"
                },
                submitted: false
            };
        },
        methods: {
            addTeacher(e) {
                e.preventDefault();
                var data = {
                    name: this.teacher.name,
                    username: this.teacher.username,
                    password: this.teacher.password
                };
                http
                    .post("/addTeacher", data)
                    .then(response => {
                        this.teacher.id = response.data.id;
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
            },
            newTeacher() {
                this.submitted = false;
                this.teacher = {
                    name: "",
                    username: "username",
                    password: "password"
                };
            }
        }
    }
</script>