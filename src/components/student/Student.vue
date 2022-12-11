<template>
    <div class="container-fluid" v-if="this.student">
        <h4>Пользователь</h4>
        
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
            }
        },
        mounted() {
            this.getStudent();
        }
    }
</script>