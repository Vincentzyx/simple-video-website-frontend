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
import flvjs from "flv.js"
import 'dplayer/dist/DPlayer.min.css';
import DPlayer from 'dplayer';

window.flvjs = flvjs;

export default {
    props: [
        "videoUrl",
        "thumbnail",
        "danmakuId",
        "account",
        "videoInfo",
        "onPlay",
        "onEnded"
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
            this.player = new DPlayer({
                container: that.$refs.player,
                screenshot: true,
                video: {
                    url: that.videoUrl,
                    pic: that.thumbnail,
                    thumbnails: that.thumbnail
                },
                // subtitle: {
                //     url: 'webvtt.vtt',
                // },
                danmaku: {
                    id: that.danmakuId,
                    api: 'https://danmaku.xwhite.studio/api/dplayer/',
                    user: that.account.uid.toString()
                }
            });

            this.player.on('play', this.onPlay);
            this.player.on('ended', this.onEnded);
        }
    }
}
</script>