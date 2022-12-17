<template>
    <div class="container-fluid" v-if="this.course">
        <h4>{{this.course.description}}</h4>
        <div v-if="currentTeacher">
            <div class="list-group">
                <router-link class="list-group-item text-primary" :to="{name: 'add-article', params: { course_id:  this.id}}">Добавить статью</router-link>
            </div>
            <div class="list-group">
                <router-link class="list-group-item text-primary" :to="{name: 'add-student-course', params: { course_id:  this.id}}">Добавить студента в курс</router-link>
            </div>
            <div class="list-group">
                <router-link class="list-group-item text-primary" :to="{name: 'students-on-course', params: { course_id:  this.id}}">Список студентов курса</router-link>
            </div>
        </div>
            <ul class="list-group">
                <li class="list-group-item" v-for="(article, index) in articles" :key="index">
                    <router-link :to="{
                            name: 'article-details',
                            params: { id: article.article_id }
                        }">
                        {{article.title}}
                    </router-link>    
                    
                    <form @submit="deleteArticle" v-if="currentTeacher">
                      <input class="d-none" type="text" name="article_id" ref="article_id" id="article_id" :value="article.article_id">
                      <input class="btn btn-danger" type="submit" value="Удалить">
                    </form>
                    
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
                articles: null,
                submitted: false
            };
        },
        computed: {
            currentStudent() {
                return this.$store.state.authUser.user;
            },
            currentTeacher() {
                return this.$store.state.authAdmin.admin;
            }
        },
        methods: {
            getArticles() {
                http
                    .get("/GetArticlesForCourse/" + this.id)
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
            },
            deleteArticle(e) {
                e.preventDefault();
                var formData = Object.fromEntries(new FormData(e.target));
                var data = {
                    id: parseInt(formData.article_id)
                };
                http
                    .post("/deleteArticle/" + data.id)
                    .then(response => {
                        response.data.id;
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
                window.location.reload();
            }
        },
        mounted() {
            this.getCourse();
            this.getArticles();
        }
    }
</script>