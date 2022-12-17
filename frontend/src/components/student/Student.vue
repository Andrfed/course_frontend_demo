<template>
    <div class="container-fluid" v-if="this.student">
         <h3>{{this.student.nickname}}</h3>
         <div class="list-group">
            <li class="list-group-item" v-for="(mark, index) in marks" :key="index">
                <div class="item">
                    {{mark.result}} : {{mark.result_note}}
                </div>
            </li>
         </div>
    </div>
    <div class="container-fluid" v-else>
        <br>
        <p>Выберите пользователя</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "student-details",
        props: ['id'],
        data() {
            return {
                student: null,
                submitted: false
            };
        },
        methods: {
            getStudent() {
                http
                    .get("/user/" + this.id)
                    .then(response => {
                        this.student = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getMarks() {
                http
                    .get("GetUserArticles/" + this.id)
                    .then(response => {
                        this.marks = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getStudent();
            this.getMarks();
        }
    }
</script>