<template>
    <div class="container-fluid" v-if="this.article">
        <h4>Статья</h4>
        
    </div>
    <div class="container-fluid" v-else>
        <br>
        <p>Выберите cтатью</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "article-details",
        props: ['id'],
        data() {
            return {
                article: null,
                submitted: false
            };
        },
        methods: {
            getArticle() {
                http
                    .get("/article/" + this.id)
                    .then(response => {
                        this.article = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getArticle();
        }
    }
</script>