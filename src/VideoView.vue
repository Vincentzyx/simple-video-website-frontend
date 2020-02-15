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
            <video-player class="player" :videoUrl="videoUrl" :thumbnail="picUrl"></video-player>
            <div class="comments">
                <span>评论区</span>
            </div>
        </div>
        <div class="mid-right">
            <div class="author-avatar" :style="'background-image: url(' + this.config.serverUrl + videoInfo.author.avatar + ')'"></div>
            <div class="author-info">{{videoInfo.author.username}}</div>
        </div>
        <div class="right">

        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
}

.left {
    width: 10%;
}

.mid-left {
    width: 50%;
}

.mid-right {
    display: block;
    justify-content: left;
    flex-direction: row;
    width: 25%;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
}

.right {
    width: 10%;
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
    max-height: 60vh;
}

.video-title {
    margin-top: 1%;
    margin-bottom: 0.3%;
    font-size: 1.3rem;
}

.author-info {
    display: inline-block;
}

.author-avatar {
    width: 5vw;
    height: 5vw;
    background: no-repeat center;
    background-size: contain;
    box-shadow:0px 0px 6px rgba(0,0,0,0.2);
    display: inline-block;
    border-radius: 50%;
}


</style>

<script>

    import VideoPlayer from '@/components/VideoPlayer'
    

    export default {
        components: {
            'video-player': VideoPlayer
        },
        mounted() {
            this.initPage();
        },
        data() {
            return {
                videoInfo: {
                    author: {

                    }
                }
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
            toUserPage(uid) {

            },
            initPage() {
                this.axios.get("video-info?vid=" + this.$route.params.vid).then((response) => {
                    let data = response.data;
                    if (data.code == 0)
                    {
                        data = data.data;
                        this.videoInfo = data;
                    }
                    else
                    {
                        this.$router.push("/404");
                    }
                });
            }
        }
    }
</script>
