<template>
    <div class="container">
        <div class="input-area">
            <div class="title">登录</div>
            <div class="input-username">
                <input type="text" :class="{ inputErrorFrame: (input.username.msg.length > 0 || status.userInputError) }" id="username" v-model="input.username.data" placeholder="你的邮箱/用户名" maxlength="50">
                <div class="input-error-info" :class="{ showErrorInfo: input.username.msg.length > 0 }">{{ input.username.msg.length > 0 ? input.username.msg : "null" }}</div>
            </div>
            <div class="input-password">
                <input  @keyup.enter="login()" type="password" :class="{ inputErrorFrame: input.password.msg.length > 0 }" id="password" v-model="input.password.data" placeholder="密码" maxlength="50">
                <div class="input-error-info" :class="{ showErrorInfo: input.password.msg.length > 0 }">{{ input.password.msg.length > 0 ? input.password.msg : "null" }}</div>
            </div>
            <div class="btns">
                <a @click="login()" class="btn btn-login">{{ status.loading ? "登录中……" : "登录" }}</a>
                <a @click="gotoRegister()" class="btn btn-register">注册</a>
            </div>
        </div>
    </div>
</template>

<style scoped>

.container {
    text-align: center;
    width: 420px;
    margin: auto;
}

.title {
    font-size: 2em;
    margin-top: 100px;
    margin-bottom: 30px;
}

.input-area {
    text-align: center;
}

.input-username {
    margin-bottom: 20px;
}

.input-error-info {
    font-size: 0.8em;
    text-align: left;
    margin-left: 10px;
    color: red;
    visibility: hidden;
}

.showErrorInfo {
    visibility: inherit;
}

.inputErrorFrame {
    border-color: red !important;
}

.btns {
    margin-top: 30px;
}

.btn {
    color: #555;
    display: inline-block;
    height: 36px;
    border: 1px solid #ccc;
    border-radius: 2px;
    width: 184px;
    line-height: 38px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    transition: all .3s;
}

.btn-login {
    border: 1px solid #0381aa;
    color: #fff;
    background-color: #00a7de;
}

.btn-login:hover {
    background-color: rgba(0,190,231);
}

.btn-register {
    margin-left: 34px;
}

.btn-register:hover {
    background-color: #eee;
}

.input-area input {
    width: 388px;
    border: 1px solid #ddd;
    border-radius: 2px;
    color: #aaa;
    font-size: 14px;
    padding: 10px;
    height: 18px;
    vertical-align: middle;
    border-radius: 4px;
    outline: none;
}

.input-error {
    border-color: rgb(180, 59, 59);
}
</style>


<script>
export default {
    data() {
        return {
            input: {
                username: {
                    data: "",
                    msg: ""
                },
                password: {
                    data: "",
                    msg: ""
                }
            },
            status: {
                userInputError: false,
                loading: false
            },
            account: this.$parent.account
        }
    },
    methods: {
        gotoRegister() {
            this.$router.push("/register");
        },
        login() {
            this.clearError();
            let ifReturn = false;
            if (this.input.username.data.length == 0)
            {
                this.input.username.msg = "邮箱或者用户名不能为空";
                ifReturn = true;
            }
            if (this.input.password.data.length == 0)
            {
                this.input.password.msg = "密码不能为空";
                ifReturn = true;
            }

            if (ifReturn) return;
            this.status.loading = true;
            this.axios.post("login", "username=" + this.input.username.data + "&password=" + this.$md5(this.input.password.data))
            .then((response) => {
                let rep = response.data;
                if (rep.code == 0)
                {
                    this.account.username = rep.data.username;
                    this.account.uid = rep.data.uid;
                    this.account.avatar = rep.data.avatar;
                    this.account.isLogin = true;
                    this.$router.go(-1); 
                    this.$notify({
                        title: "提示",
                        message: "登录成功！",
                        type: "success"
                    });
                }
                else if (rep.code == -10)
                {
                    this.input.password.msg = "用户名或密码错误";
                    this.status.userInputError = true;
                }
                else
                {
                    this.input.password.msg = "未知错误";
                }
            })
        },
        clearError() {
            this.status.loading = false;
            this.status.userInputError = false;
            this.input.username.msg = "";
            this.input.password.msg = "";
        },
        checkLogin() {
            this.axios.get("login-state")
            .then((response) => {
                console.log(response.data);
            });
        }
    }
}
</script>