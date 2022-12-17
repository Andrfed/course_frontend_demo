<template>
    <div class="container-fluid" v-if="this.teacher">
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
        name: "teacher-details",
        props: ['id'],
        data() {
            return {
                teacher: null,
                submitted: false
            };
        },
        methods: {
            getTeacher() {
                http
                    .get("/teacher/" + this.id)
                    .then(response => {
                        this.teacher = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getTeacher();
        }
    }
</script>