<template>
    <div class="container">
        <div class="left"></div>
        <div class="mid-left">
            <div class="video-text">
                <div class="video-title">
                    {{videoInfo.title}}
                </div>
                <div class="publish-date"><span class="author-small" @click="toUserPage()">{{videoInfo.author.username}}</span> 发布于 {{videoInfo.publishdate}}</div>
                <div class="view-count">{{videoInfo.view}} 播放 · {{videoInfo.danmaku}} 弹幕</div>
            </div>
            <video-player class="player" :videoUrl="videoUrl" :thumbnail="picUrl" :danmakuId="$md5('vilivilibyvincentzyx' + this.videoInfo.vid)"
                            :account="this.account" :videoInfo="videoInfo" :onPlay="onPlay" :onEnded="onEnded"></video-player>
            <div class="video-action">
                <div @click="like(!videoInfo.isLike)" class="btn-like" :class="{btn: !videoInfo.isLike, 'btn-off': videoInfo.isLike}"><i class="action-icon el-icon-caret-top"></i><span>{{videoInfo.like}}</span></div>
                <div @click="star(!videoInfo.isStar)" class="btn-star" :class="{btn: !videoInfo.isStar, 'btn-off': videoInfo.isStar}"><i class="action-icon el-icon-star-on"></i><span>{{videoInfo.star}}</span></div>
            </div>
            <div class="send-comment">
                <el-input
                class="comment-input"
                type="textarea"
                :rows="3"
                :placeholder="account.isLogin ? '畅所欲言吧！' : '登录后即可发送评论！'"
                :disabled="!account.isLogin"
                maxlength="300"
                show-word-limit
                v-model="myComment">
                </el-input>
                <el-button :disabled="!account.isLogin" @click.native="sendComment()" type="primary" class="btn-send" icon="el-icon-s-promotion"></el-button>
            </div>
            <div class="comments">
                <span class="comment-area-title">评论区</span>
                <div v-if="comments.length > 0" class="comment-area">
                    <div class="comment" v-for="(comment,index) in comments" :key="comment.id">
                        <div @click="toUserPage(comment.user.uid)" class="comment-avatar" :style="'background-image: url('+ config.serverUrl + comment.user.avatar + ')'"></div>
                        <div class="comment-text">
                            <div @click="toUserPage(comment.user.uid)" class="comment-username">{{comment.user.username}}</div>
                            <div class="comment-content">{{comment.text}}</div>
                            <div class="comment-time">{{comment.time}}</div>
                        </div>
                        <div v-if="index != comments.length - 1" class="spliter"></div>
                    </div>
                </div>
                <div v-else class="comment-placeholder">
                    这里还什么都没有，快来发条评论吧！
                </div>
            </div>
        </div>
        <div class="mid-right">
            <div class="author">
                <div class="author-avatar" :style="'background-image: url(' + this.config.serverUrl + videoInfo.author.avatar + ')'"></div>
                <div class="author-text">
                    <div class="author-name" @click="toUserPage(videoInfo.author.uid)">{{videoInfo.author.username}}</div>
                    <div class="author-des">{{videoInfo.author.description}}</div>
                </div>
                <div :class="{'btn-follow': !followAuthor, 'btn-unfollow': followAuthor}" @click="follow(videoInfo.author.uid, !followAuthor)">{{(followAuthor ? "已" : "") + "关注 " + videoInfo.author.follower}}</div>
            </div>
        </div>
        <div class="right">

        </div>
    </div>
</template>

<style scoped>

.spliter {
    border-bottom: 1px solid #ddd;
}

.comment {
    
}

.comment-content {
    margin-top: 5px;
    margin-bottom: 5px;
}

.comment-username {
    font-size: 0.8rem;
    color: #333;
    cursor: pointer;
}

.comment-time {
    font-size: 0.8rem;
    color: gray;
}

.comment-avatar {
    width: 50px;
    height: 50px;
    background-size: cover;
    border-radius: 50%;
    box-shadow: 0 0 5px gray;
    margin-left: 20px;
    margin-top: 20px;
    vertical-align: top;
    display: inline-block;
    cursor: pointer;
}

.comment-text {
    display: inline-block;
    width: 80%;
    margin-top: 10px;
    margin-left: 20px;
    margin-bottom: 10px;
}

.btn-send {
    height: 75px;
    width: 10%;
}

.comment-input {
    display: inline-block;
    width: 90%;
    border: none;
}

.send-comment {
    margin: auto;
    margin-top: 10px;
    width: 100%;
    box-shadow: 0 0 5px gray;
}

.comment-placeholder {
    margin-top: 20px;
    text-align: center;
}

.comment-area-title {
    color: rgb(108, 166, 231);
    font-size: 1.2rem;
    margin-left: 10px;
}

.comments {
    margin: auto;
    margin-top: 10px;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0 0 5px gray;
    min-height: 100px;
    margin-bottom: 50px;
}

.video-action span {
    color: gray;
}

.video-action {
    margin: auto;
    margin-top: 10px;
    padding-left: 5px;
    padding-top:5px;
    padding-bottom: 5px;
    width: 99%;
    box-shadow: 0 0 5px gray;
}

.btn-off {
    font-size: 1.2rem;
    margin-right: 10px;
    cursor: pointer;
    color:rgb(108, 166, 231)
}

.action-icon {
    font-size: 2rem;
    vertical-align: middle;
}

.video-action span {
    vertical-align: middle;
}

.video-action .btn{
    font-size: 1.2rem;
    margin-right: 10px;
    cursor: pointer;
    color: #999;
}

.video-action .btn:hover {
    color:rgb(108, 166, 231)
}

.video-action .btn:active {
    color:rgb(64, 125, 196)
}

.video-action .btn:hover .action-icon {
    color:rgb(108, 166, 231)
}

.btn-like {
    display: inline-block;
}

.btn-star {
    display: inline-block;
}

.btn-follow {
    margin: 0 auto;
    margin-top: 5px;
    width: 8vw;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: white;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0 0 2px black;
    background-color: rgb(108, 166, 231);
    transition: all 0.3s;
}

.btn-unfollow {
    margin: 0 auto;
    margin-top: 5px;
    width: 8vw;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: white;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0 0 2px black;
    background-color: rgb(170, 177, 185);
    transition: all 0.3s;
}

.btn-unfollow:hover {
    background-color: rgb(127, 132, 138);
}

.btn-unfollow:active {
    background-color:rgb(88, 92, 97) 
}

.btn-follow:hover {
    background-color:rgb(74, 132, 197)
}

.btn-follow:active {
    background-color:rgb(50, 89, 134)
}


.author {
    position:relative;
    margin-top: 85px;
    margin-left: 30px;
    padding-left: 2vw;
    padding-right: 2vw;
    padding-top: 20px;
    padding-bottom: 20px;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
}

.author-text {
    position:absolute;
    top: 1.5vw;
    left: 8.5vw;
    display: inline-block;
}

.author-name {
    cursor: pointer;
    transition: all 0.3ms;
}

.author-name:hover {
    color: skyblue;
}

.author-des {
    font-size: 0.8rem;
    color: gray;
}

.author-avatar {
    width: 3.8vw;
    height: 3.8vw;
    background: no-repeat center;
    background-size: contain;
    margin-left: 1vw;
    box-shadow:0px 0px 6px rgba(0,0,0,0.2);
    display: inline-block;
    border-radius: 50%;
}

.container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
}

.left {
    width: 20px;
}

.mid-left {
    width: 50%;
}

.mid-right {
    display: block;
    width: 25%;
}

.right {
    width:20px;
}

.video-text {
    margin-bottom: 2%;
}

.publish-date {
    margin-top: 0.5%;
    color: gray;
    font-size: 0.8rem;
}

.author-small {
    cursor: pointer;
    transition: all 0.3s;
}

.author-small:hover {
    color: rgb(116, 190, 240);
}
 
.view-count {
    margin-top: 0.5%;
    color: gray;
    font-size: 0.8rem;
}

.player {
    box-shadow: 0 0 5px gray;
    max-height: 50vh;
}

.video-title {
    margin-top: 1%;
    margin-bottom: 0.3%;
    font-size: 1.3rem;
}

.author-info {
    display: inline-block;
}



</style>

<script>

    import VideoPlayer from '@/components/VideoPlayer'
    import { Button, Input } from 'element-ui';

    export default {
        components: {
            'video-player': VideoPlayer,
            'el-button': Button,
            'el-input': Input
        },
        mounted() {
            this.initPage();
        },
        data() {
            return {
                videoInfo: {
                    author: {

                    }
                },
                followAuthor: false,
                account: this.$parent.account,
                comments: [],
                commentPage: 1,
                myComment: ""
            }
        },
        computed: {
            videoUrl() {
                if (this.videoInfo.urls !== undefined) {
                    return this.config.serverUrl + this.videoInfo.urls[0].url;
                }
                else {
                    return "";
                }
            },
            picUrl() {
                if (this.videoInfo.thumbnail !== undefined) {
                    return this.config.serverUrl + this.videoInfo.thumbnail;
                }
                else {
                    return "";
                }
            }
        },
        beforeRouteUpdate(to, from, next) {
            next();
            this.initPage();
        },
        methods: {
            sendComment() {
                this.axios.get("send-comment?vid=" + this.videoInfo.vid + "&text=" + this.myComment)
                .then((response) => {
                    let rep = response.data;
                    if (rep.code == 0)
                    {
                        this.getComments();
                        this.myComment = "";
                        this.$notify({
                            type: "success",
                            title: "提示",
                            message: "发送成功！"
                        })
                    }
                    else
                    {
                        this.$notify.error({
                        title: "提示",
                        message: "发送失败: " + rep.msg
                    })
                    }
                })
                .catch((error) => {
                    this.$notify.error({
                        title: "提示",
                        message: "发送失败: " + error
                    })
                })
            },
            onPlay() {

            },
            onEnded() {
                this.axios.get("video-play?vid=" + this.videoInfo.vid)
                .then((response)=>{

                });
            },
            toUserPage(uid) {
                this.$router.push("/user/" + uid)
            },
            initPage() {
                this.initVideo();
                this.getComments();
            },
            async initVideo() {
                await this.axios.get("video-info?vid=" + this.$route.params.vid).then((response) => {
                    let rep = response.data;
                    if (rep.code == 0)
                    {
                        this.videoInfo = rep.data;
                        this.followAuthor = this.videoInfo.author.isFollow;
                    }
                    else
                    {
                        this.$router.push("/404");
                    }
                });
            },
            async getComments() {
                await this.axios.get("video-comments?vid=" + this.$route.params.vid + "&page=" + this.commentPage)
                .then((response) => {
                    let rep = response.data;
                    if (rep.code == 0)
                    {
                        this.comments = rep.data;
                    }
                    else
                    {
                        this.$notify.error({
                            title: "错误",
                            message: "评论区加载失败！\n" + rep.msg
                        })
                    }
                })
                .catch((error) => {
                    this.$notify.error({
                        title: "错误",
                        message: "评论区加载失败！\n" + error
                    })
                });
            },
            follow(uid, isFollow = true) {
                if (!this.account.isLogin)
                {
                    this.$notify.error({
                        title: "提示",
                        message: "请先登录！"
                    });
                    return;
                }
                this.axios.get("user-follow?uid=" + uid + "&follow=" + (isFollow ? "true" : "false"))
                .then((response) => {
                    let rep = response.data;
                    if (rep.code == 0)
                    {
                        this.followAuthor = isFollow;
                        if (isFollow)
                        {
                            this.videoInfo.author.follower++;
                        }
                        else
                        {
                            this.videoInfo.author.follower--;
                        }
                    }
                    else if(rep.code == -10)
                    {
                        this.followAuthor = isFollow;
                    }
                })
                .catch((error) => {
                    this.$notify.error({
                        title: "提示",
                        message: isFollow ? "关注失败！" : "取关失败！",
                    });
                });
            },
            like(isLike = true) {
                if (!this.account.isLogin)
                {
                    this.$notify.error({
                        title: "提示",
                        message: "请先登录！"
                    });
                    return;
                }
                this.axios.get("user-like?vid=" + this.videoInfo.vid + "&like=" + (isLike ? "true" : "false"))
                .then((response) => {
                    let rep = response.data;
                    if (rep.code == 0)
                    {
                        this.videoInfo.isLike = isLike;
                        if (isLike)
                        {
                            this.videoInfo.like++;
                        }
                        else
                        {
                            this.videoInfo.like--;
                        }
                    }
                    else
                    {
                        
                    }
                })
                .catch((error) => {
                    this.$notify.error({
                        title: "提示",
                        message: isLike ? "点赞失败！" : "取消赞失败！",
                    });
                });
            },
            star(isStar = true) {
                if (!this.account.isLogin)
                {
                    this.$notify.error({
                        title: "提示",
                        message: "请先登录！"
                    });
                    return;
                }
                this.axios.get("user-star?vid=" + this.videoInfo.vid + "&star=" + (isStar ? "true" : "false"))
                .then((response) => {
                    let rep = response.data;
                    if (rep.code == 0)
                    {
                        this.videoInfo.isStar = isStar;
                        if (isStar)
                        {
                            this.videoInfo.star++;
                        }
                        else
                        {
                            this.videoInfo.star--;
                        }
                    }
                    else
                    {
                        
                    }
                })
                .catch((error) => {
                    this.$notify.error({
                        title: "提示",
                        message: isstar ? "收藏失败！" : "取消收藏失败！",
                    });
                });
            }
        }
    }
</script>
