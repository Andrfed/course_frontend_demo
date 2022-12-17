<template>
    <div class="container-fluid" v-if="currentStudent">
         <h3>
            {{ currentStudent.username }}
        </h3>
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
        <p>Требуется авторизация</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "student-marks",
        data() {
            return {
                student: null,
                marks: null,
                submitted: false
            };
        },
        computed: {
            currentStudent() {
                return this.$store.state.authUser.user;
            }
        },
        methods: {
            getStudent() {
                http
                    .get("/user/" + this.$store.state.authUser.user.id)
                    .then(response => {
                        this.student = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                    
            },
            getMarks() {
                http
                    .get("GetUserArticles/" + this.$store.state.authUser.user.id)
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