<template>
    <div class="container-fluid">
        <div class="mb-3" v-if="displayContent">
            <h4>Список статей курса</h4>
            <div class="list-group">
                <router-link class="list-group-item text-primary" to="/addArticle">Добавить статью</router-link>
            </div>
            <div class="list-group">
                <router-link class="list-group-item text-primary" to="/searchCourseArticle">Поиск статьи</router-link>
            </div>
            
            <ul class="list-group">
                <li class="list-group-item" v-for="(article, index) in articles" :key="index">
                    <router-link :to="{
                            uuid: 'article-details',
                            params: { id: article.id }
                        }">
                        {{article.uuid}}
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
        name: "ListArticles",
        props: ['course_id'],
        data() {
            return {
                articles: [],
                displayContent: false
            };
        },
        methods: {
            getArticles() {
                http
                    .get("/coursearticle/course_id/" + this.course_id)
                    .then(response => {
                        this.article = response.data;
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
            this.getArticles();
        }
    }
</script>