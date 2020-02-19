<template>
    <nav>
        <div class="left">
            <a href="/" class="title">Vilivili</a>
            <span class="navitem" v-for="link in links" :key="link.name" :href="link.path" @click="changePath(link.path)">{{link.name}}</span>
        </div>
        <div class="account">
            <div v-if="!account.isLogin">
                <span class="btn btn-login" @click="changePath('/login')">登录</span>
                <span class="btn btn-reg" @click="changePath('/register')">注册</span>
            </div>
            <div v-else class="user-info">
                <div class="avatar" @click="changePath('/user/' + account.uid)" :style="'background-image: url(' + this.config.serverUrl + account.avatar + ')'"></div>
                <div class="userpage-link" @click="changePath('/user/' + account.uid)">{{ account.username }}</div>
                <div class="dropdown">
                    <div class="dropdown-item dropdown-item-user" @click="changePath('/user/' + account.uid)">个人中心</div>
                    <div class="dropdown-item dropdown-item-logout" @click="logout()">退出登录</div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .btn-close {
        background-color: rgb(228, 100, 100);
        box-shadow: 0 0 2px rgb(163, 102, 102);
        width: 12px;
        height: 12px;
        border-radius: 30%;
        position: absolute;
        margin-left: 275px;
        top: 18px;
        transition: all 0.3s;
    }

    .btn-close:hover {
        background-color: rgb(255, 159, 159);
    }

    .btn-close:active {
        background-color:rgb(253, 205, 205)
    }

    .dropdown-item-user {
        margin-top: 20px;
    }

    .dropdown-item {
        margin-bottom: 15px;
        cursor: pointer;
    }

    .dropdown-item:hover {
        color: skyblue;
    }

    .dropdown {
        text-align: center;
        top: 58px;
        height: 0;
        overflow: hidden;
        left: 0px;
        opacity: 1;
        width: 80px;
        padding-left: 20px;
        padding-right: 20px;
        position: absolute;
        border-radius: 3px;
        background-color: white;
        box-shadow: 0 0 5px gray;
        transition: all 0.3s;
        z-index: 999;
        cursor:default;
    }

    .user-info:hover .dropdown {
        top: 58px;
        opacity: 1;
        height: 100px;
    }

    .avatar {
        display: inline-block;
        width: 40px;
        height: 40px;
        background-size: contain;
        border-radius: 50%;
        box-shadow: 0 0 5px gray;
        transition: all 0.3s;
    }



    .userpage-link {
        margin-left: 10px;
        margin-right: 30px;
        text-decoration: none;
        color: black;
        transition: all .3s;
    }

    .user-info {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding-top:10px;
        padding-bottom: 10px;
    }

    .user-info:hover .avatar {
        box-shadow: 0 0 5px skyblue;
        border-radius: 50%;
    }

    .user-info:hover .userpage-link {
        color:skyblue;
    }

    .left {
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
    }

    .title {
        display: inline-block;
        color: skyblue;
        font-size: 2em;
        margin-left: 30px;
        margin-right: 30px;
        width: 100px;
        text-align: center;
        cursor: pointer;
        text-decoration: none;
    }

    .navitem {
        display: inline-block;
        text-align: center;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.2s;
        width: 70px;
        height: 30px;
        line-height: 30px;
        margin-left: 0.8%;
    }

    .btn {
        text-align: center;
        display: inline-block;
        line-height: 30px;
        width: 60px;
        height: 30px;
        border: 1px solid black;
        margin: 0 10px;
        transition: all 0.3s;
        cursor: pointer;
    }

    .btn-login {
        border: 1px solid #0381aa;
        background-color: #00a7de;
        color: white;
    }

    .btn-login:hover {
        background-color: rgba(0,190,231);
    }

    .btn-reg {
        border: 1px solid #ccc;
        background-color: #eee;
        margin-right: 30px;
    }

    .btn-reg:hover {
        background-color: #ddd;
    }

    .account {
        display: inline-block;
        font-size: 1rem;
        position: relative;
    }

    .navitem:hover {
        color: rgb(116, 190, 240);
    }

    .navitem span {
        font-size: 1.2rem;
        transition: all 0.3s;
    }

    nav {
        background-color: white;
        display: flex;
        flex-flow: row nowrap;
        justify-content:space-between;
        align-items: center;
        padding: 0 0 0.3% 0;
        margin: 0 0 1% 0;
        width: 100%;
        height: 5vh;
        box-shadow:0px 2px 5px rgba(0,0,0,0.2)
    }
</style>

<script>
export default {
    data() {
        return {
            links: [
                {
                    name: "主页",
                    path: "/"
                }
            ],
            account: this.$parent.account,
            noticeData: {
                msg: "登出成功！"
            },
            showNotice: false,
            timeoutId: 0
        }
    },
    mounted() {
        this.$parent.Notice = this.notice;
    },
    methods: {
        changePath(path) {
            if (this.$route.path != path)
            {
                this.$router.push(path);
            }
            else
            {
                this.$router.go(0);
            }
        },
        logout() {
            this.axios.get("logout")
            .then((response) => {
                let rep = response.data;
                this.$notify({
                    title: "提示",
                    message: "退出登录成功！",
                    type: "success"
                });
                this.account.isLogin = false;
            })
            .catch((error) => {
                this.$notify.error({
                    title: "提示",
                    message: "退出登录失败:" + error,
                });
            });
        },
        notice(msg) {
            this.showNotice = true;
            this.noticeData.msg = msg;
            this.timeoutId = setTimeout(() => {
                this.showNotice = false;
            }, 4000);
        },
        closeNotice() {
            clearTimeout(this.timeoutId);
            this.showNotice = false;
        }
    }
}
</script>