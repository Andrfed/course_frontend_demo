<template>
    <div class="container-fluid">
        <h4>Добавление курса</h4>
        <div class="mb-3" v-if="!submitted">
            <form @submit="addCourse">
                <input class="form-control" type="text" name="description" id="description" placeholder="Описание" required v-model="course.description">
                <input class="btn btn-success" type="submit" value="Добавить">
            </form>
        </div>
        <div class="container-fluid" v-else>
            <h4>Вы успешно добавили запись</h4>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddCourse",
        data() {
            return {
                course: {
                    description: "description"
                },
                submitted: false
            };
        },
        methods: {
            addCourse(e) {
                e.preventDefault();
                var data = {
                    description: this.course.description
                };
                http
                    .post("/addCourse", data)
                    .then(response => {
                        this.course.id = response.data.id;
                        var newData = {
                            admin_id: this.$store.state.authAdmin.admin.id,
                            course_id: this.course.id
                        };
                        http
                            .post("/addAdminCourse", newData)
                            .then(response => {
                                this.teacher_course.id = response.data.id;
                            })
                            .catch(e => {
                                console.log(e);
                            });
                        })
                    .catch(e => {
                        console.log(e);
                    });
                
                this.submitted = true;
            }
        }
    }
</script>