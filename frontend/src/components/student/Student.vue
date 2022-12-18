<template>
    <div class="container-fluid" v-if="this.student">
         <h3>{{this.student.nickname}}</h3>
         <div class="list-group" v-if="this.marks">
            <li class="list-group-item" v-for="(mark, index) in marks" :key="index">
                <div class="item">
                    <div>
                        {{mark.description}} : {{mark.title}} : {{mark.result}} : {{mark.result_note}}
                    </div>
                    <form class="container" @submit="updateMark">
                        <input class="col" type="number" name="result" ref="result" id="result" :value="mark.result">
                        <input class="col" type="text" name="result_note" ref="result_note" id="result_note" :value="mark.result_note">
                        <input class="btn btn-info col" type="submit" value="Обновить">
                        <input class="d-none" type="text" name="article_id" ref="article_id" id="article_id" :value="mark.article_id">
                        <input class="d-none" type="text" name="article_id" ref="article_id" id="article_id" :value="this.student.id">
                    </form>
                </div>
            </li>
         </div>
    </div>
    <div class="container-fluid" v-else>
        <br>
        <p>Выберите пользователя</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "student-details",
        props: ['id'],
        data() {
            return {
                student: null,
                submitted: false,
                marks: null
            };
        },
        methods: {
            getStudent() {
                http
                    .get("/user/" + this.id)
                    .then(response => {
                        this.student = response.data;
                        http
                            .get("GetUserArticles/" + this.id)
                            .then(response => {
                                this.marks = response.data;
                            })
                            .catch(e => {
                                console.log(e);
                            });
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateMark(e) {
                e.preventDefault();
                var formData = Object.fromEntries(new FormData(e.target));
                
                var data = {
                    id: parseInt(formData.article_id),
                    result: this.$refs.result,
                    result_note: this.$refs.result_note,
                    user_id: parseInt(this.$refs.user_id),
                    article_id: parseInt(this.$refs.article_id)
                };
                http
                    .post("/deleteCourse/" + data.id)
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
            this.getStudent();
        }
    }
</script>