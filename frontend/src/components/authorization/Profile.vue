<template>
    <div class="m-3">
        <header>
            <h3>
                Профиль <strong>{{currentUser.nickname}}{{currentUser.username}}</strong>
            </h3>
        </header>
        <p>
            <strong>Id:</strong>
            {{currentUser.id}}
        </p>
    </div>
</template>
<script>
    export default {
        name: 'ProfileUser',
        computed: {
            currentUser() {
                if (this.$store.state.authAdmin.status.loggedIn) {
                   return this.$store.state.authAdmin.admin; 
                }
                else {
                    return this.$store.state.authUser.user;
                }
            }
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/');
            }
        }
    };
</script>