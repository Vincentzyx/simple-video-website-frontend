<template>
    <div>
        <div style="display:none">{{videoUrl}}</div>
        <div class="player" ref="player"></div>
    </div>
</template>

<style scoped>
.player {
    width: 100%;
    height: 100%;
}
</style>

<script>
import 'dplayer/dist/DPlayer.min.css';
import DPlayer from 'dplayer';

export default {
    props: [
        "videoUrl",
        "thumbnail"
    ],
    components: {

    },
    data() {
        return {
            player: null,
        }
    },
    mounted() {
        
    },
    beforeUpdate() {
        this.initPlayer();
    },
    methods: {
        initPlayer() {
            let that = this;
            let dp = new DPlayer({
            container: that.$refs.player,
            screenshot: true,
            video: {
                url: that.videoUrl,
                pic: that.thumbnail,
                thumbnails: that.thumbnail
            }
            // subtitle: {
            //     url: 'webvtt.vtt',
            // },
            // danmaku: {
            //     id: 'demo',
            //     api: 'https://api.prprpr.me/dplayer/',
            // },
        });
        }
    }
}
</script>