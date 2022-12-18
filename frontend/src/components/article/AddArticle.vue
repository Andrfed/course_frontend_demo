<template>
    <div class="container-fluid">
        <h4>Добавление статьи</h4>
        <div class="mb-3" v-if="!submitted">
            <form class="container" @submit="addArticle">
                <input class="row" type="text" name="title" id="title" placeholder="Название статьи" required v-model="article.title">
                <input class="row" type="number" name="max_value" id="max_value" placeholder="Максимальная оценка" required v-model="article.result_max">
                <div class="row">
                    <textarea class="col" cols="50" rows="20" name="article_text" id="article_text" required v-model="article.text"></textarea>
                    <div class="border col" v-if="this.renderMarkdown" v-html="this.renderMarkdown"></div>
                </div>
                <input class="btn btn-success" type="submit" value="Добавить">
                
            </form>
            
        </div>
        <div class="container-fluid" v-else>
            <h4>Вы успешно добавили запись</h4>
            <div class="mb-3">
                <router-link :to="{name: 'course-details', params: { id: this.course_id }}">Вернуться к списку статей</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    import marked from "../../marked";
    export default {
        name: "AddArticle",
        props: ['course_id'],
        data() {
            return {
                article: {
                    title: "",
                    text: "",
                    max_value: 0
                },
                markdown: "# Article",
                renderedMarkdown: null,
                submitted: false
            };
        },
        computed: {
            renderMarkdown() {
                return marked(this.article.text);
            }
        },
        methods: {
            addArticle(e) {
                e.preventDefault();
                var data = {
                    title: this.article.title,
                    data: this.article.text,
                    result_max: this.article.max_value,
                    course_id: this.course_id
                };
                http
                    .post("/addArticleToCourse", data)
                    .then(response => {
                        this.article.id = response.data.id;
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
            }
        },
        mounted() {
        }
    }
</script>