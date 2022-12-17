<template>
    <div class="container-fluid">
        <h4>Добавление студента</h4>
        <div class="mb-3" v-if="!submitted">
            <form @submit="addStudent">
                <input class="form-control" type="text" name="name" id="name" placeholder="ФИО" required v-model="student.name">
                <input class="btn btn-success" type="submit" value="Добавить">
            </form>
        </div>
        <div class="container-fluid" v-else>
            <h4>Вы успешно добавили запись</h4>
            <div class="mb-3">
                <button class="btn btn-primary" v-on:click="newStudent">Добавить нового студента</button>
            </div>
            <div class="mb-3">
                <router-link to="/listStudents">Вернуться к списку студентов</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddStudent",
        data() {
            return {
                student: {
                    name: "",
                    username: "username",
                    password: "password"
                },
                submitted: false
            };
        },
        methods: {
            addStudent(e) {
                e.preventDefault();
                var data = {
                    name: this.student.name,
                    username: this.student.username,
                    password: this.student.password
                };
                http
                    .post("/addStudent", data)
                    .then(response => {
                        this.student.id = response.data.id;
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
            },
            newStudent() {
                this.submitted = false;
                this.student = {
                    name: "",
                    username: "username",
                    password: "password"
                };
            }
        }
    }
</script>