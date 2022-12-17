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
    import MarkdownIt from "markdown-it";
    export default {
        name: "article-details",
        props: ['id'],
        data() {
            return {
                article: null,
                submitted: false,
                markdown: new MarkdownIt()
            };
        },
        methods: {
            getArticle() {
                http
                    .get("/article/" + this.id)
                    .then(response => {
                        this.article = response.data;
                        //var file = new File("../../../../backend/app/public/uploads/" + this.article.uuid + ".md")
                        //apply.var reader = new FileReader();
                        //this.my_file = reader.readAsText(file).result();
                        //<div v-html="markdown.render(this.my_file)"></div>
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