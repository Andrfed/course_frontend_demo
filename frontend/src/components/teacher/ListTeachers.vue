<template>
    <div class="container-fluid">
        <div class="mb-3" v-if="displayContent">
            <h4>Список преподавателей</h4>
            <router-link class="item" to="/addTeacher">Добавить преподавателя</router-link>
            <router-link class="item" to="/searchTeacher">Поиск преподавателя</router-link>
            <ul class="list-group">
                <li class="list-group-item" v-for="(teacher, index) in teachers" :key="index">
                    <router-link :to="{
                            name: 'teacher-details',
                            params: { id: teacher.id }
                        }">
                        {{teacher.name}}
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
        name: "ListTeachers",
        data() {
            return {
                teachers: [],
                displayContent: false
            };
        },
        methods: {
            getTeachers() {
                http
                    .get("/teachers")
                    .then(response => {
                        this.teacher = response.data;
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
            this.getTeachers();
        }
    }
</script>