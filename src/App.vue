<template>
    <div id="app">
        <nav-bar></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import VideoList from '@/VideoList'
    import Navbar from "@/components/Navbar"

    export default {
        name: 'app',
        components: {
            'video-list': VideoList,
            'nav-bar': Navbar
        },
        mounted() {
            this.CheckLoginState();
        },
        data() {
            return {
                account: {
                    uid: -1,
                    username: "",
                    avatar: "",
                    userlevel: 1,
                    isLogin: true
                }
            }
        },
        methods: {
            CheckLoginState() {
                this.axios.get("login-state")
                .then((response) => {
                    let rep = response.data;
                    if (rep.code == 0)
                    {
                        this.account.uid = rep.data.uid;
                        this.account.username = rep.data.username;
                        this.account.avatar = rep.data.avatar;
                        this.account.userlevel = rep.data.userlevel;
                        this.account.isLogin = true;
                    }
                    else
                    {
                        this.account.isLogin = false;
                    }
                })
                .catch((error) => {

                });
            },
            Notice() {
                
            }
        }
    }
</script>
