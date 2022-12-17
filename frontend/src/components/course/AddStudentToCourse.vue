<template>
    <div class="container-fluid">
        <div class="mb-3" v-if="displayContent">
            <h4>Список студентов</h4>
            <ul class="list-group">
                <li class="list-group-item" v-for="(student, index) in students" :key="index">
                        <router-link :to="{
                                name: 'student-details',
                                params: { id: student.id }
                            }">
                            {{student.nickname}}
                        </router-link>
                    <form @submit="addToCourse">
                        <input class="d-none" type="text" name="student_id" ref="student_id" id="student_id"  :value="student.id">
                        <input class="d-none" type="text" name="course_id" ref="course_id" id="course_id" :value="this.course_id">
                        <input class="btn btn-success" type="submit" value="Добавить в курс">
                    </form>
                </li>
            </ul>
        </div>
        <div class="mb-3" v-else>
            Контент доступен только авторизованным пользователям
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    import UserService from '../../services/user.service';

    export default {
        name: "add-student-course",
        props: ['course_id'],
        data() {
            return {
                students: [],
                displayContent: false,
            };
        },
        methods: {
            getStudents() {
                http
                    .get("/users")
                    .then(response => {
                        this.students = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            addToCourse(e) {
                e.preventDefault();
                var formData = Object.fromEntries(new FormData(e.target));
                var data = {
                    user_id: parseInt(formData.student_id),
                    course_id: parseInt(formData.course_id)
                };
                    http
                        .post("/addUserCourse", data)
                        .then(response => {
                            response.data.id;
                        })
                        .catch(e => {
                            console.log(e);
                        });

                    this.submitted = true;
                this.submitted = false;
                window.location.reload();
            }
        },
        mounted() {
            UserService.getUserBoard()
                .then(() => {
                    this.displayContent = true;
                })
                .catch(e => {
                        this.content =
                            (e.response && e.response.data) ||
                            e.message ||
                            e.toString();
                    }
                );
            this.getStudents();
        }
    }
</script>