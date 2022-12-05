<template>
    <div id="app">
      <nav class="navbar navbar-dark bg-light border">
        <div v-if="currentUser">
          <div class="list-group m-3">
            <router-link class="list-group-item text-primary" to="/listCourses">Курсы</router-link>
          </div>
        </div>
        <div v-if="currentStudent">
          <div class="list-group m-3">
            <router-link class="list-group-item text-primary" to="/listMarks">Оценки</router-link>
          </div>
        </div>
        <div v-if="currentTeacher">
          <div class="list-group m-3">
            <router-link class="list-group-item text-primary" to="/listStudents">Студенты</router-link>
          </div>
        </div>
        <div v-if="currentUser">
          <router-link to="/profile" class="navbar-brand text-dark">
            <div class="enter-font" size="4">
              {{ currentUser.name }}
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
      </nav>
    </div>
  </template>
  
  <script>
      export default {
      name: "NavBar",
      data() {
        return {};

      },
      computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        currentStudent() {
          return true; // !!!
        },
        currentTeacher() {
          return true; // !!!
        }
      },
      methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
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