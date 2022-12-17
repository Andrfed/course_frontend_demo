<template>
    <div class="container-fluid">
        <div class="mb-3" v-if="displayContent">
            <h4>Список курсов</h4>
            <div class="list-group">
                <router-link class="list-group-item text-primary" to="/addCourse">Добавить курс</router-link>
            </div>
            <ul class="list-group">
                <li class="list-group-item" v-for="(course, index) in courses" :key="index">
                    <router-link :to="{
                            name: 'course-details',
                            params: { id: course.course_id }
                        }">
                        {{ course.description }}
                    </router-link>
                    <form @submit="deleteCourse">
                        <input class="d-none" type="text" name="course_id" ref="course_id" id="course_id" :value="course.course_id">
                        <input class="btn btn-danger row" type="submit" value="Удалить">
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
        name: "ListCourses",
        data() {
            return {
                courses: [],
                displayContent: false
            };
        },
        methods: {
            getCourses() {
                http
                    .get("/GetCoursesForAdmin/" + this.$store.state.authAdmin.admin.id)
                    .then(response => {
                        this.courses = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            deleteCourse(e) {
                console.log("OK");
                e.preventDefault();
                var formData = Object.fromEntries(new FormData(e.target));
                
                var data = {
                    id: parseInt(formData.course_id)
                };
                http
                    .post("/deleteCourse/" + data.id)
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
            this.getCourses();
        }
    }
</script>