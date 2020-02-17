<template>
    <div class="container">
        <div class="avatar-container">
            <div class="avatar-cover"></div>
            <div>
                <image-upload :url="uploadUrl" field="file"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail" v-model="showAvatarUpload"></image-upload>
            </div>
            <div class="avatar-area">
                <div class="user-avatar" :style="'background-image: url(' + avatarUrl + ')'"></div>
                <div v-if="isSelf" @click="showAvatarUpload = !showAvatarUpload" class="btn-change-avatar"><div class="label-change-avatar">更换头像</div></div>
                <div class="user-name">{{userInfo.username}}</div>
                <div class="user-description">{{userInfo.description}}<i v-if="isSelf" @click="startInputDescription()" class="el-icon-edit"></i></div>
            </div>
            <div class="info-area">
                <div class="info-following">{{userInfo.following}} 关注</div>
                <div class="info-follower">{{userInfo.follower}} 粉丝</div>
            </div>
        </div>
        <div class="upload-btn">
            <el-button @click.native="$router.push('/upload-video')" type="primary">投稿视频</el-button>
        </div>
        <div class="user-video-list">
            <div class="show-video-title">{{ (account.uid == userInfo.uid ? "我" : "TA") + "的投稿" }}</div>
            <div class="show-more-video" @click="$notify.error({title: '提示', message: '不给看'})">查看更多 <i class="el-icon-right"></i></div>
            <div v-if="userVideoList.length > 0" class="show-list">
                <div v-for="vinfo in userVideoList" :key="vinfo.vid" class="vid-info" @click="$router.push('/v/' + vinfo.vid)">
                    <div class="vid-thumb" :style="'background-image: url(' + config.serverUrl + vinfo.thumbnail + ')'"></div>
                    <div class="vid-title" :title="vinfo.title">{{vinfo.title}}</div>
                    <div>
                        <div class="view-count">
                            <i class="el-icon-video-play"></i>
                            {{vinfo.view}}
                        </div>
                        <div class="publish-date">
                            <i class="el-icon-time"></i>
                            {{displayDate(vinfo.publishdate)}}
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="userVideoList.length == 0" class="no-video">{{(account.uid == userInfo.uid ? "你" : "TA") + '还没有发布过视频哦！'}}</div>
        </div>
    </div>
</template>

<style scoped>

.no-video {
    margin-top: 10px;
    text-align: center;
    line-height: 100px;
    width: 100%;
    height: 100px;
    box-shadow: 0 0 5px gray;
}

.container {
    width: 80%;
    margin: auto;
}

.show-video-title {
    display: inline-block;
}

.show-more-video {
    color:rgb(80, 167, 238);
    display: inline-block;
    font-size: 0.95rem;
    cursor: pointer;
    margin-left: 15px;
}

.show-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
    height: 300px;
}

.view-count {
    float:left;
}

.publish-date {
    float: right;
}

.el-icon-video-play {
    margin-right: 2px;
    vertical-align: center;
}

.el-icon-time {
    margin-right: 2px;
    vertical-align: center;
}

.vid-info:hover .vid-title {
    color:rgb(51, 166, 211);
}

.vid-title {
    height: 1.1rem;
    margin: auto;
    overflow: hidden;
    vertical-align: center;
    transition: all 0.3s;
}

.vid-info {
    width: 160px;
    height: 120px;
    font-size: 12px;
    line-height: 1.1rem;
    margin: 10px;
    margin-bottom: 20px;
    cursor: pointer;
}

.vid-thumb {
    width: 160px;
    height: 100px;
    font-size: 0.8rem;
    background-size: cover;
}

.upload-btn {
    margin: 10px;
}

.avatar-cover {
    top: 0;
    left: 0;
    width: 100%;
    height: 210px;
    background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)); 
    position: absolute;
}

.avatar-container {
    position: relative;
    background-image: url('/user-bg.png');
    background-size: cover;
    padding-top: 10px;
    height: 200px;
}

.label-change-avatar {
    color: white;
    margin-top: 40px;
    font-size: 0.9rem;
}

.btn-change-avatar {
    left: 50px;
    top: 0;
    position: absolute;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
    height: 100px;
    width: 100px;
    background-size: contain;
    border-radius: 50%;
    margin: auto;
    margin-bottom: 10px;
    transition: all 0.3s;
}

.btn-change-avatar:hover {
    opacity: 1;
    cursor: pointer;
}

.el-icon-edit {
    cursor: pointer;
}

.el-icon-edit:hover {
    color: skyblue;
}

.info-area {
    text-align: center;
    margin-top: 5px;
    position: relative;
}

.info-following, .info-follower {
    display: inline-block;
    cursor: pointer;
    margin: 0 5px;
    font-size: 0.9rem;
    color: #ddd;
}

.info-following:hover {
    color:skyblue;
}

.info-follower:hover {
    color:skyblue;
}

.user-name {
    color: white;
}

.user-description {
    font-size: 0.9rem;
    color: #eee;
    word-wrap: break-word;
}

.btn-upload-avatar {
    color: white;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    margin-top: 10px;
    background-color:rgb(95, 191, 230);
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s;
}

.btn-upload-avatar:hover {
    background-color: rgb(51, 166, 211);
}

.btn-upload-avatar:active {
    background-color: rgb(23, 123, 163);
}

.user-avatar {
    height: 100px;
    width: 100px;
    background-size: contain;
    border-radius: 50%;
    box-shadow: 0 0 5px gray;
    margin: auto;
    margin-bottom: 10px;
}

.user-avatar:hover {
    
}

.avatar-area {
    text-align: center;
    font-size: 1.2rem;
    width: 200px;
    margin: 0 auto;
    position: relative;
}
</style>


<script>
import ImageUpload from "vue-image-crop-upload"
import VideoPicCard from "@/components/VideoPicCard"
import { MessageBox, Button } from 'element-ui';

export default {
    components: {
        ImageUpload,
        "el-button": Button,
        'video-pic-card': VideoPicCard
    },
    data() {
        return {
            uploadUrl: this.config.serverUrl + "avatar-upload",
            showAvatarUpload: false,
            account: this.$parent.account,
            userInfo: {

            },
            userVideoList: [],
            videoListPage: 1
        }
    },
    mounted() {
        this.checkLogin();
        this.loadUserInfo();
        this.loadUserVideoList();
    },
    beforeRouteUpdate(to, from, next) {
        next();
        this.loadUserInfo();
    },
    computed: {
        isSelf() {
            if (this.account.uid == this.userInfo.uid)
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        avatarUrl() {
            if (this.userInfo.avatar !== undefined)
            {
                return this.config.serverUrl + this.userInfo.avatar;
            }
            else
            {
                return "";
            }
        }
    },
    methods: {
        displayDate(dateStr) {
            let date = dateStr.split(" ")[0];
            let time = dateStr.split(" ")[1];
            let year = date.split("-")[0];
            let currentDate = new Date();
            if (year == currentDate.getFullYear())
            {
                return date.split("-")[1] + "-" + date.split("-")[2];
            }
            else
            {
                return date;
            }
            
        },
        checkLogin() {

        },
        cropSuccess(imgDataUrl, field){

        },
        cropUploadSuccess(jsonData, field){
            if (jsonData.code == 0)
            {
                this.userInfo.avatar = jsonData["data"]["avatar"];
                this.account.avatar = jsonData["data"]["avatar"];
            }
            else
            {

            }
        },
        cropUploadFail(status, field){

        },
        async loadUserInfo() {
            this.axios.get("user-info?uid=" + this.$route.params.uid)
            .then((response) => {
                let rep = response.data;
                if (rep.code == 0)
                {
                    // this.account.avatar = jsonData["data"]["avatar"];
                    this.userInfo = rep.data;
                }
            })
            .catch((error) => {
                
            });
        },
        async loadUserVideoList() {
            await this.axios.get("video-list?uid=" + this.$route.params.uid + "&page=" + this.videoListPage)
            .then((response) => {
                let rep = response.data;
                if (rep.code == 0)
                {
                    this.userVideoList = rep.data;
                }
                else
                {
                    this.$notify.error({
                        title: "错误",
                        message: "获取用户投稿失败: " + rep.msg
                    });
                }
            })
            .catch((error) => {
                this.$notify.error({
                    title: "错误",
                    message: "获取用户投稿失败: " + error.toString()
                });
            });
        },
        startInputDescription() {
            MessageBox.prompt('请输入你想设置的新签名', '提示', {
                confirmButtonText: '想好了',
                cancelButtonText: '不改了',
                inputPattern: /^[\S\n\s]{0,50}$/,
                inputErrorMessage: '字太多啦！',
                value: this.account.description
            }).then(({ value }) => {
                this.axios.get("description-modify?description=" + value)
                .then((response) => {
                    let rep = response.data;
                    if (rep.code == 0)
                    {
                        this.account.description = rep.data;
                        if (this.account.uid == this.userInfo.uid)
                        {
                            this.userInfo.description = rep.data;
                        }
                    }
                    else
                    {
                        this.$notify({
                            title: "提示",
                            message: "设置失败: " + rep.msg,
                        });
                    }
                })
                .catch((error) => {
                    this.$notify({
                        title: "提示",
                        message: "设置失败: " + error,
                    });
                });
            }).catch(() => {
                this.$notify({
                    message: '取消输入'
                });       
            });
        }
    }
}
</script>