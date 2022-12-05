<template>
    <div class="container-fluid">
        <h4>Добавление курса</h4>
        <div class="mb-3" v-if="!submitted">
            <form @submit="addCourse">
                <input class="form-control" type="text" name="name" id="name" placeholder="ФИО" required v-model="student.name">
                <input class="btn btn-success" type="submit" value="Добавить">
            </form>
        </div>
        <div class="container-fluid" v-else>
            <h4>Вы успешно добавили запись</h4>
            <div class="mb-3">
                <button class="btn btn-primary" v-on:click="newCourse">Добавить новый курс</button>
            </div>
            <div class="mb-3">
                <router-link to="/listCourses">Вернуться к списку курсов</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddCourse",
        data() {
            return {
                course: {
                    name: "",
                    username: "username",
                    password: "password"
                },
                submitted: false
            };
        },
        methods: {
            addCourse(e) {
                e.preventDefault();
                var data = {
                    name: this.course.name,
                    username: this.course.username,
                    password: this.course.password
                };
                http
                    .post("/addCourse", data)
                    .then(response => {
                        this.course.id = response.data.id;
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
            },
            newCourse() {
                this.submitted = false;
                this.course = {
                    name: "",
                    username: "username",
                    password: "password"
                };
            }
        }
    }
</script>