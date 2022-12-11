<template>
    <div class="container-fluid">
        <div class="mb-3" v-if="displayContent">
            <h4>Список курсов</h4>
            <router-link class="item" to="/addCourse">Добавить курс</router-link>
            <router-link class="item" to="/searchCourse">Поиск курса</router-link>
            <ul class="list-group">
                <li class="list-group-item" v-for="(course, index) in courses" :key="index">
                    <router-link :to="{
                            name: 'course-details',
                            params: { id: course.id }
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
                console.log(this.$store.state.authAdmin.admin);
                http
                    .get("/admincourse/admin_id/" + this.$store.state.authAdmin.admin.id)
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