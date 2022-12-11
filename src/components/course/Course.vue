<template>
    <div class="container-fluid" v-if="this.course">
        <h4>{{this.course.description}}</h4>
        <router-link class="item" to="/addArticle">Добавить статью</router-link>
            <router-link class="item" to="/searchArticle">Поиск статьи</router-link>
            <ul class="list-group">
                <li class="list-group-item" v-for="(article, index) in articles" :key="index">
                    <router-link :to="{
                            name: 'article-details',
                            params: { id: article.article_id }
                        }">
                        {{article.uuid}}
                    </router-link>
                </li>
            </ul>
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
            getArticles() {
                http
                    .get("/coursearticle/course_id/" + this.id)
                    .then(response => {
                        this.articles = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
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
            this.getArticles();
        }
    }
</script>