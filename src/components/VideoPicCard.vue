<template>
    <div class="card-pic" :style="'background-image: url(' + thumbnailUrl + ')'">
        <div class="filter"></div>
        <div class="info">
            <div class="title">{{title}}</div>
            
        </div>
        <div class="info-bottom">
            <p class="up">{{"up主: " + author.username}}</p>
            <p class="statics">播放: {{view}} 点赞: {{like}}</p>
        </div>
        
        
    </div>
</template>

<style scoped>
.card-pic {
    position: relative;
    float: left;
    background: no-repeat center;
    background-size: cover;
    color: white;
    font-size: 1em;
}

.info-bottom {
    color: lightgray;
    font-size: 0.8em;
    position:absolute;
    bottom: 5%;
    margin-left: 5%;
    opacity: 0;
    transition: all 0.3s ease;
}

.up {
    margin: 0;
}

.statics {
    margin: 0;
}

.filter {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.0),rgba(0,0,0,0.1),rgba(0,0,0,0.5))
}

.card-pic:hover .filter {
    background-color:rgba(0,0,0,0.5);
    transition: all 0.5s;
}



.info {
    top: 80%;
    position: absolute;
    margin-left: 5%;
    max-width: 92%;
    max-height: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.3s ease;
}

.card-pic:hover .info {
    top: 15%;
    text-overflow:initial;
    white-space: normal;
}

.card-pic:hover .info-bottom {
    opacity: 1;
}

</style>

<script>
export default {
    props: ["title", "author", "thumbnail", "view", "like", "publishdate"],
    data() {
        return {}
    },
    computed: {
        thumbnailUrl: function() {
            return this.config.serverUrl + this.thumbnail
        }
    },
    mounted() {

    }
}
</script>