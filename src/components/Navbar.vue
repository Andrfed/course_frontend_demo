<template>
    <div id="app">
      <nav class="navbar navbar-dark bg-light border">
        <div v-if="currentStudent">
          <div class="m-3">
            <div class="list-group m-3">
              <router-link class="item text-primary" to="/listStudentCourses">Курсы</router-link>
            </div>
            <div class="list-group m-3">
              <router-link class="item text-primary" to="/listStudentMarks">Оценки</router-link>
            </div>
            <router-link to="/profile" class="navbar-brand text-dark">
              <div class="enter-font" size="4">
                {{ currentStudent.username }}
              </div>
            </router-link>
            <a href @click.prevent="logOut" class="navbar-brand text-dark">
              Выйти
            </a>
          </div>
        </div>
        <div v-else>
          <div v-if="currentTeacher">
          <div class="list-group m-3">
            <router-link class="list-group-item text-primary" to="/listTeacherCourses">Курсы</router-link>
          </div>
          <div class="list-group m-3">
            <router-link class="list-group-item text-primary" to="/listStudents">Студенты</router-link>
          </div>
          <router-link to="/profile" class="navbar-brand text-dark">
            <div class="enter-font" size="4">
              {{ currentTeacher.nickname }}
            </div>
          </router-link>
          <a href @click.prevent="logOut" class="navbar-brand text-dark">
            Выйти
          </a>
        </div>
        <div v-else>
          <router-link to="/loginTeacher" class="navbar-brand text-dark">
            Войти как преподаватель
          </router-link>
          <router-link to="/loginStudent" class="navbar-brand text-dark">
            Войти как студент
          </router-link>
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