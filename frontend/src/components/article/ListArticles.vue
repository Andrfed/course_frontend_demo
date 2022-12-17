<template>
    <div class="container-fluid">
        <div class="mb-3" v-if="displayContent">
            <h4>Список статей</h4>
            <div v-if="currentTeacher">
                <router-link class="item" to="/addArticle">Добавить статью</router-link>
            </div>
            <router-link class="item" to="/searchArticle">Поиск статьи</router-link>
            <ul class="list-group">
                <li class="list-group-item" v-for="(article, index) in articles" :key="index">
                    <router-link :to="{
                            name: 'article-details',
                            params: { id: article.id }
                        }">
                        {{article.title}}
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
        computed: {
            currentTeacher() {
                return this.$store.state.authAdmin.admin;
            }
        },
        methods: {
            getArticles() {
                http
                    .get("/coursearticle/course_id/" + this.course.id)
                    .then(response => {
                        this.articles = response.data;
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