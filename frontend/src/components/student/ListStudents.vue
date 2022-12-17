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
        name: "ListStudents",
        data() {
            return {
                students: [],
                displayContent: false
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