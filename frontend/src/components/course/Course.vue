<template>
    <div class="container-fluid" v-if="this.course">
        <h4>Курс</h4>
        
    </div>
    <div class="container-fluid" v-else>
        <br>
        <p>Выберите курс</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "course-details",
        props: ['id'],
        data() {
            return {
                course: null,
                submitted: false
            };
        },
        methods: {
            getCourse() {
                http
                    .get("/course/" + this.id)
                    .then(response => {
                        this.course = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getCourse();
        }
    }
</script>