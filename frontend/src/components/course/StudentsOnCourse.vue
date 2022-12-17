<template>
    <div class="container-fluid">
        <div class="mb-3" v-if="displayContent">
            <h4>Список студентов</h4>
            <ul class="list-group">
                <li class="list-group-item" v-for="(student, index) in students" :key="index">
                        <router-link :to="{
                                name: 'student-details',
                                params: { id: student.user_id }
                            }">
                            {{student.nickname}}
                        </router-link>
                    <form @submit="deleteFromCourse">
                        <input class="d-none" type="text" name="student_id" ref="student_id" id="student_id"  :value="student.user_id">
                        <input class="d-none" type="text" name="course_id" ref="course_id" id="course_id" :value="this.course_id">
                        <input class="btn btn-danger" type="submit" value="Удалить из курса">
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
        name: "students-on-course",
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
                    .get("/GetUsersByCourse/" + this.course_id)
                    .then(response => {
                        this.students = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            deleteFromCourse(e) {
                e.preventDefault();
                var data = {
                    user_id: parseInt(this.$refs.student_id[0].value),
                    course_id: parseInt(this.$refs.course_id[0].value)
                };
                http
                    .post("/deleteUserCourseByData", data)
                    .then(response => {
                        response.data.id;
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
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