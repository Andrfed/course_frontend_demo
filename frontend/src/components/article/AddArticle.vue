<template>
    <div class="container-fluid">
        <h4>Добавление статьи</h4>
        <div class="mb-3" v-if="!submitted">
            <form @submit="addArticle">
                <input class="form-control" type="text" name="title" id="title" placeholder="Название статьи" required v-model="article.title">
                <input class="form-control" type="number" name="max_value" id="max_value" placeholder="Максимальная оценка" required v-model="article.max_value">
                <input class="btn btn-success" type="submit" value="Добавить">
                <textarea class="form-control" name="article_text" id="article_text" required v-model="article.text">
                </textarea>
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
                submitted: false
            };
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
        }
    }
</script>