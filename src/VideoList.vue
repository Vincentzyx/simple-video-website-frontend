<template>
    <div>
        <div class="title">推荐视频</div>
        <div class="videos-container" id="content">
            <div v-for="vinfo in videoList" :key="vinfo.vid">
                <video-pic-card @click.native="toVideo(vinfo.vid)" class="vid-card" :title="vinfo.title" :author="vinfo.author" :thumbnail="vinfo.thumbnail"
                                :publishdate="vinfo.publishdate" :view="vinfo.view" :like="vinfo.like">
                </video-pic-card>
            </div>
        </div>
        <div class="loading-icon"><i class="el-icon-loading"></i></div>
    </div>
</template>

<style scoped>
    .loading-icon {
        text-align: center;
        font-size: 3rem;
        color:skyblue;
    }

    .title {
        margin-left: 2%;
        margin-top: 30px;
        margin-bottom: 20px;
        font-size: 1.5rem;
    }

    .videos-container {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        width: auto;
        margin-left: 2%;
        margin-right: 2%;
        padding-top: 10px;
        background: #eee;
        border-radius: 5px;
        z-index: -2;
    }

    .vid-card {
        width: 300px;
        height: 160px;
        margin: 10px;
        cursor: pointer;
        border-radius: 2px;
        box-shadow: 1px 1px 5px black;
    }
</style>

<script>
import VideoPicCard from "@/components/VideoPicCard"

export default {
    
    components: {
        'video-pic-card': VideoPicCard
    },
    data() {
        return {
            videoList: [],
            page: 1,
            lastLoaded: 0,
            scrollTimer: 0,
            lastLoadedTime: Date.now() - 3000,
            loading: false
        }
    },
    mounted() {
        this.loadVideoList();
        this.scrollTimer = setInterval(this.scrollBottom, 200);
    },
    beforeRouteUpdate(to, from, next) {
        next();
        this.loadVideoList();
    },
    beforeDestroy() {
        clearInterval(this.scrollTimer);    
    },
    methods: {
        toVideo(vid) {
            this.$router.push("/v/" + vid);
        },
        loadVideoList() {
            this.loading = true;
            if (this.$route.query.page !== undefined)
            {
                this.page = Number(this.$route.query.page);
            }
            this.axios.get("video-list?page=" + this.page + "&count=30").then((response) => {
                let rep = response.data;
                if (rep.code == 0)
                {
                    this.videoList = this.videoList.concat(rep.data);
                    this.lastLoaded = this.page;
                    this.loading = false;
                }
            });
        },
        scrollBottom() {
            // if (new Date().getTime() - this.lastUpdateTime <= 2000) return;
            let el = document.getElementById("content");
            let windowHeight = window.screen.height;
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let contentHeight = el.clientHeight;
            let toBottom = contentHeight - windowHeight - scrollTop;
            if (toBottom < 10 && !this.loading) {
                if (this.lastLoaded = this.page)
                {
                    this.page++;
                    this.$route.query.page = this.page;
                    this.loadVideoList();
                }
            }
        }
    }
}
</script>