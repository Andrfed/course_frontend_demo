import { createWebHistory, createRouter } from "vue-router";

import ListStudents from "./components/student/ListStudents";
import AddStudent from "./components/student/AddStudent";
import Student from "./components/student/Student";
import ListTeachers from "./components/teacher/ListTeachers";
import AddTeacher from "./components/teacher/AddTeacher";
import Teacher from "./components/teacher/Teacher";
import ListCourses from "./components/course/ListCourses";
import AddCourse from "./components/course/AddCourse";
import Course from "./components/course/Course";
import ListArticles from "./components/article/ListArticles";
import AddArticle from "./components/article/AddArticle";
import Article from "./components/article/Article";
import ListCourseArticles from "./components/course/ListCourseArticles";
import LoginTeacher from "./components/authorization/LoginTeacher";
import LoginStudent from "./components/authorization/LoginStudent";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";


const routes = [
    {
        path: "/listStudents",
        name: "students",
        alias: "/students",
        component: ListStudents,
        meta: {
            title: "Список студентов"
        }
    },
    {
        path: "/loginTeacher",
        name: "login-treacher",
        component: LoginTeacher,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/loginStudent",
        name: "login-student",
        component: LoginStudent,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component: Profile,
        meta: {
            title: "Профиль пользователя"
        }
    },
    {
        path: "/student/:id",
        name: "student-details",
        component: Student,
        props: true,
        meta: {
            title: "Данные студента"
        }
    },
    {
        path: "/addStudent",
        name: "add-student",
        component: AddStudent,
        meta: {
            title: "Добавление студента"
        }
    },
    {
        path: "/listTeachers",
        name: "teachers",
        alias: "/teachers",
        component: ListTeachers,
        meta: {
            title: "Список преподавателей"
        }
    },
    {
        path: "/teacher/:id",
        name: "teacher-details",
        component: Teacher,
        props: true,
        meta: {
            title: "Данные преподавателя"
        }
    },
    {
        path: "/addTeacher",
        name: "add-teacher",
        component: AddTeacher,
        meta: {
            title: "Добавление преподавателя"
        }
    },
    {
        path: "/listCourses",
        name: "courses",
        alias: "/courses",
        component: ListCourses,
        meta: {
            title: "Список курсов"
        }
    },
    {
        path: "/course/:id",
        name: "course-details",
        component: Course,
        props: true,
        meta: {
            title: "Данные курса"
        }
    },
    {
        path: "/addCourse",
        name: "add-course",
        component: AddCourse,
        meta: {
            title: "Добавление курса"
        }
    },
    {
        path: "/listArticles",
        name: "articles",
        alias: "/articles",
        component: ListArticles,
        meta: {
            title: "Список статей"
        }
    },
    {
        path: "/article/:id",
        name: "article-details",
        component: Article,
        props: true,
        meta: {
            title: "Данные статьи"
        }
    },
    {
        path: "/addArticle",
        name: "add-article",
        component: AddArticle,
        meta: {
            title: "Добавление статьи"
        }
    },
    {
        path: "/courseArticles",
        name: "course-articles",
        component: ListCourseArticles,
        meta: {
            title: "Список статей курса"
        }
    }
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || "Главная страница";
    next();
});

export default router;