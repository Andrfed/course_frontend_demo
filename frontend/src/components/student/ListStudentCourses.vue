<template>
    <div class="container-fluid">
        <div class="mb-3" v-if="displayContent">
            <h4>Список курсов</h4>
            <ul class="list-group">
                <li class="list-group-item" v-for="(course, index) in courses" :key="index">
                    <router-link :to="{
                            name: 'course-details',
                            params: { id: course.course_id }
                        }">
                        {{course.description}}
                    </router-link>
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
                    .get("GetCoursesForUser/" + this.$store.state.authUser.user.id)
                    .then(response => {
                        this.courses = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
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