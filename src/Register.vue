<template>
    <div class="container">
        <div class="input-area">
            <div class="title">注册</div>
            <div class="input-email">
                <input type="text" @blur="checkEmail()" :class="{ inputErrorFrame: input.email.msg.length > 0 }" id="email" v-model="input.email.data" placeholder="邮箱" maxlength="50">
                <div class="input-error-info" :class="{ showErrorInfo: input.email.msg.length > 0 }">{{ input.email.msg.length > 0 ? input.email.msg : "null" }}</div>
            </div>
            <div class="input-username">
                <input type="text" @blur="checkUsername()" :class="{ inputErrorFrame: input.username.msg.length > 0 }" id="username" v-model="input.username.data" placeholder="昵称" maxlength="50">
                <div class="input-error-info" :class="{ showErrorInfo: input.username.msg.length > 0 }">{{ input.username.msg.length > 0 ? input.username.msg : "null" }}</div>
            </div>
            <div class="input-password">
                <input @keyup.enter="register()" type="password" :class="{ inputErrorFrame: input.password.msg.length > 0 }" id="password" v-model="input.password.data" placeholder="密码" maxlength="50">
                <div class="input-error-info" :class="{ showErrorInfo: input.password.msg.length > 0 }">{{ input.password.msg.length > 0 ? input.password.msg : "null" }}</div>
            </div>
            <div class="btns">
                <a @click="register()" class="btn btn-register">注册</a>
            </div>
            <div class="goto-login-box">
                <router-link class="goto-login" to="/login">已有帐号，直接登录</router-link>
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

.input-error {
    border-color: rgb(180, 59, 59);
}

.goto-login {
    color: #00a1d6;
    text-decoration: none;
}

.goto-login-box {
    margin-top: 3px;
    text-align: right;
}

.title {
    font-size: 2em;
    margin-top: 100px;
    margin-bottom: 30px;
}

.input-area {
    text-align: center;
}

.input-email, .input-username {
    margin-bottom: 20px;
}

.btn {
    color: #555;
    display: inline-block;
    height: 36px;
    border: 1px solid #ccc;
    border-radius: 2px;
    width: 408px;
    line-height: 38px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    transition: all .3s;
}

.btns {
    margin-top: 30px;
}

.btn-register {
    border: 1px solid #0381aa;
    color: #fff;
    background-color: #00a7de;
}

.btn-register:hover {
    background-color: rgba(0,190,231);
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
</style>


<script>
export default {
    data() {
        return {
            input: {
                email: {
                    data: "",
                    msg: "",
                    usable: true
                },
                username: {
                    data: "",
                    msg: "",
                    usable: true
                },
                password: {
                    data: "",
                    msg: "",
                    usable: true
                }
            },
            status: {
                loading: false
            }
        }
    },
    methods: {
        register() {
            this.clearError();
            let ifReturn = false;
            if (this.input.email.data.length == 0)
            {
                this.input.email.msg = "邮箱不能为空";
                ifReturn = true;
            }
            if (this.input.username.data.length == 0)
            {
                this.input.username.msg = "昵称不能为空";
                ifReturn = true;
            }
            if (this.input.password.data.length == 0)
            {
                this.input.password.msg = "密码不能为空";
                ifReturn = true;
            }

            if (ifReturn) return;
            if (!this.input.username.usable || !this.input.email.usable) return;

            this.axios.post("register", "email=" + this.input.email.data + "&username=" + this.input.username.data + "&password=" + this.$md5(this.input.password.data))
            .then((response) => {
                this.clearError();
                let rep = response.data;
                if (rep.code == 0)
                {
                    this.$notify({
                        title: "提示",
                        message: "注册成功！",
                        type: "success"
                    });
                    this.$router.push("/login")
                }
                else if (rep.code == -20)
                {
                    this.input.email.msg = "该邮箱已经注册过";
                }
                else if (rep.code == -10)
                {
                    this.input.username.msg = "该昵称已被占用";
                }
                else
                {
                    this.input.password.msg = "注册失败: " + rep.msg;
                }
            })
            .catch((error) => {
                this.input.password.msg = "注册失败: " + error;
            })
        },
        clearError() {
            this.status.loading = false;
            this.input.email.msg = "";
            this.input.username.msg = "";
            this.input.password.msg = "";
        },
        gotoRegister() {
            this.$router.push("/register");
        },
        checkUsername() {
            if (this.input.username.data.length == 0) return;
            this.axios.get("check-usability?username=" + this.input.username.data)
            .then((response) => {
                let rep = response.data;
                if (rep.code == 0)
                {
                    this.input.username.usable = rep.data.username;
                    if (!rep.data.username)
                    {
                        this.input.username.msg = "该昵称已被占用";
                    }
                    else
                    {
                        this.input.username.msg = "";
                    }
                }
                else
                {
                    this.input.username.msg = "检查昵称失败: " + rep.msg;
                }
            })
            .catch((error) => {
                this.input.username.msg = "登录失败: " + error;
            })
        },
        checkEmail() {
            if (this.input.email.data.length == 0) return;
            this.axios.get("check-usability?email=" + this.input.email.data)
            .then((response) => {
                let rep = response.data;
                if (rep.code == 0)
                {
                    this.input.email.usable = rep.data.email;
                    if (!rep.data.email)
                    {
                        this.input.email.msg = "该邮箱已经注册过";
                    }
                    else
                    {
                        this.input.email.msg = "";
                    }
                }
                else
                {
                    this.input.email.msg = "检查邮箱失败: " + rep.msg;
                }
            })
            .catch((error) => {
                this.input.email.msg = "登录失败: " + error;
            })
        }
    }
}
</script>