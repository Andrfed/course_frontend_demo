<template>
    <div class="container-fluid">
        <div class="mb-3" v-if="displayContent">
            <h4>Список статей курса</h4>
            <router-link class="item" to="/addArticle">Добавить статью</router-link>
            <router-link class="item" to="/searchCourseArticle">Поиск статьи</router-link>
            <ul class="list-group">
                <li class="list-group-item" v-for="(article, index) in articles" :key="index">
                    <router-link :to="{
                            name: 'article-details',
                            params: { id: article.id }
                        }">
                        {{article.name}}
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
                    .get("/courseArticles/" + this.course_id)
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