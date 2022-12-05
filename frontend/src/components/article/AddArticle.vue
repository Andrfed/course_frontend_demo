<template>
    <div class="container-fluid">
        <h4>Добавление статьи</h4>
        <div class="mb-3" v-if="!submitted">
            <form @submit="addArticle">
                <input class="form-control" type="text" name="name" id="name" placeholder="ФИО" required v-model="article.name">
                <input class="btn btn-success" type="submit" value="Добавить">
            </form>
        </div>
        <div class="container-fluid" v-else>
            <h4>Вы успешно добавили запись</h4>
            <div class="mb-3">
                <button class="btn btn-primary" v-on:click="newArticle">Добавить новую статью</button>
            </div>
            <div class="mb-3">
                <router-link to="/listArticles">Вернуться к списку статей</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddArticle",
        data() {
            return {
                article: {
                    name: "",
                    username: "username",
                    password: "password"
                },
                submitted: false
            };
        },
        methods: {
            addArticle(e) {
                e.preventDefault();
                var data = {
                    name: this.article.name,
                    username: this.article.username,
                    password: this.article.password
                };
                http
                    .post("/addArticle", data)
                    .then(response => {
                        this.article.id = response.data.id;
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
            },
            newArticle() {
                this.submitted = false;
                this.article = {
                    name: "",
                    username: "username",
                    password: "password"
                };
            }
        }
    }
</script>