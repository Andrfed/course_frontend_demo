<template>
    <div v-if="currentStudent">
        <div class="container-fluid" v-if="this.article">
            <h4>{{this.article.title}}</h4>
            <textarea class="d-none" ref="textarea" v-model="markdown"></textarea>
            <div v-if="this.renderMarkdown" v-html="this.renderMarkdown"></div>
        </div>
        <div class="container-fluid" v-else>
            <br>
            <p>Выберите cтатью</p>
        </div>
    </div>

    <div v-if="currentTeacher">
        
        <div class="container" v-if="this.article">
            <h4>{{this.article.title}}</h4>
            <div class="row">
                <textarea class="col" ref="textarea" cols="100" rows="20" v-model="markdown"></textarea>
                <div class="col border" v-if="this.renderMarkdown" v-html="this.renderMarkdown"></div>
            </div>
            <div class="row">
                <form @submit="updateArticle" v-if="currentTeacher">
                    <input class="form-control" type="text" name="title" id="title" placeholder="Название статьи" required v-model="article.title">
                    <input class="form-control" type="number" name="max_value" id="max_value" placeholder="Максимальная оценка" required v-model="article.result_max">
                    <input class="btn btn-info" type="submit" value="Сохранить">
                </form>
            </div>
        </div>
        <div class="container-fluid" v-else>
            <br>
            <p>Выберите cтатью</p>
        </div>
    </div>
    
</template>

<script>
    import http from "../../http-common";
    import marked from "../../marked";
    export default {
        name: "article-details",
        props: ['id'],
        data() {
            return {
                article: null,
                submitted: false,
                markdown: "",
                renderedMarkdown: null
            };
        },
        computed: {
            currentStudent() {
                return this.$store.state.authUser.user;
            },
            currentTeacher() {
                return this.$store.state.authAdmin.admin;
            },
            renderMarkdown() {
                return marked(this.markdown);
            }
        },
        methods: {
            getArticle() {
                http
                    .get("/article/" + this.id)
                    .then(response => {
                        
                        this.article = response.data;
                        http
                            .get("/uploads/"+this.article.uuid+".md")
                            .then(response => {
                                this.markdown = response.data;
                                
                             })
                        
                    })
                    .catch(e => {
                        console.log(e);
                    });
                    this.submitted = true;
            },
            updateArticle() {
                var data = {
                    uuid: this.article.uuid,
                    title: this.article.title,
                    result_max: this.article.result_max,
                    data: this.$refs.textarea.value
                }
                http
                    .post("/updateArticle/" + this.id, data)
                    .then(response => {
                        response.data;
                                
                    })
                    .catch(e => {
                        console.log(e);
                    });
                    this.submitted = true;
            }
        },
        mounted() {
            this.getArticle();
            
        }
    }
</script>