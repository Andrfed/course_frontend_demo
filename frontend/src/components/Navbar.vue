<template>
    <div id="app">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid m-3" v-if="currentStudent">
          <div class="list-group">
            <div class="list-group m-3 navbar-brand">
              <router-link class="list-group-item text-primary" to="/listStudentCourses">Курсы</router-link>
            </div>
            <div class="list-group m-3 navbar-brand">
              <router-link class="list-group-item text-primary" to="/listStudentMarks">Оценки</router-link>
            </div>
            <div class="list-group m-3 navbar-brand">
                <router-link class="list-group-item " to="/profile">
                  <div class="enter-font" size="4">
                    {{ currentStudent.username }}
                  </div>
                </router-link>
                <a class="list-group-item text-primary" href @click.prevent="logOut">
                  Выйти
                </a>
              </div>
          </div>
        </div>
        <div class="container-fluid m-3" v-else>
          <div class="list-group">
            <div v-if="currentTeacher">
              <div class="list-group m-3 navbar-brand">
                <router-link class="list-group-item text-primary" to="/listTeacherCourses">Курсы</router-link>
              </div>
              <div class="list-group m-3 navbar-brand">
                <router-link class="list-group-item text-primary" to="/listStudents">Студенты</router-link>
              </div>
              <div class="list-group m-3 navbar-brand">
                <router-link class="list-group-item " to="/profile">
                  <div class="enter-font" size="4">
                    {{ currentTeacher.nickname }}
                  </div>
                </router-link>
                <a class="list-group-item text-primary" href @click.prevent="logOut">
                  Выйти
                </a>
              </div>
            </div>
            <div v-else>
              <router-link class="navbar-brand" to="/loginTeacher">
                Войти как преподаватель
              </router-link>
              <router-link class="navbar-brand" to="/loginStudent">
                Войти как студент
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
      export default {
      name: "NavBar",
      computed: {
        currentStudent() {
          return this.$store.state.authUser.user;
        },
        currentTeacher() {
          return this.$store.state.authAdmin.admin;
        }
      },
      methods: {
        logOut() {
            this.$store.dispatch('authUser/logout');
            this.$store.dispatch('authAdmin/logout');
            window.location.href = '/';
        }
      }
    };
  </script>
  
  <style>
    .item {
      margin-right: 5px;
    }
  </style>