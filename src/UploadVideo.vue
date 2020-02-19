<template>
    <div> 
        <uploader :options="uploaderOptions" :fileStatusText="uploaderOptions.fileStatusText" @file-success="fileSuccess" @complete="uploadComplete()" class="uploader">
            <uploader-unsupport></uploader-unsupport>
            <uploader-drop class="uploader-drop">
                <p>可以拖拽视频文件到此</p>
                <uploader-btn :attrs="uploaderOptions.attrs">选择视频文件</uploader-btn>
            </uploader-drop>
            <uploader-list></uploader-list>
        </uploader>

        <div class="thumb-container" v-if="uploaded">
            <div class="select-thumb-label">请选择视频封面 或是
            
                <el-upload
                    class="upload-thumb"
                    :action="config.serverUrl + 'thumbnail-upload'"
                    :show-file-list="false"
                    :on-success="thumbUploadSuccess">
                    <div slot="trigger" class="btn-upload-thumb">上传封面</div>
                    <div class="btn-upload-thumb" @click="showThumbUpload = !showThumbUpload"></div>
                </el-upload>
            </div>
            <div class="select-thumbnail">
                <div class="thumb-main" v-for="(thumb, index) in thumbnailDisplay.thumbnails"
                    @click="selectThumb(index)"
                    :key="thumb">
                    <img :src="config.serverUrl + thumb" :class="{'thumb-selected': thumbnailDisplay.current == index}" />
                </div>
            </div>
        </div>
        <div class="thumb-container" v-else>
            <div class="before-upload-label">视频上传后即可选择视频封面</div>
        </div>
        <div class="video-info">
            <div class="video-info-label">请完善视频信息</div>
            <el-input class="video-info-input" placeholder="视频标题" v-model="videoInfo.title"></el-input>
            <el-input type="textarea" :rows="3" class="video-info-input" placeholder="视频描述" v-model="videoInfo.description"></el-input>
            <el-input class="video-info-input" placeholder="视频标签" v-model="videoInfo.tags"></el-input>
            <el-button :disabled="!uploaded" @click.native="publishVideo()" class="btn-publish" type="primary">投稿</el-button>
        </div>
    </div>
</template>

<style>
.thumb-main img {
    max-width: 100%;
    border: white solid 3px;
    vertical-align: middle;
}

.thumb-main {
    margin: 10px;
    flex:1;
    display: inline-block;
    vertical-align: middle;
    transition: all 0.3s;
}

.thumb-selected {
    border-color:#409EFF !important;
}


.thumb-main:hover {
    flex: 6;
}

.btn-publish {
    margin-top: 25px;
    width: 100%;
}

.before-upload-label {
    color:gray;
    text-align: center;
}

.video-info-input {
    margin: 10px 0 0 0;
}

.thumb-container {
    padding: 15px;
    width: 60%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 1px 5px gray;
}

.video-info-label {
    color: rgb(121, 196, 226);
    margin-bottom: 10px;
}

.video-info {
    width: 60%;
    box-shadow: 0 1px 5px gray;
    padding: 15px;
    border-radius: 5px;
    margin: auto;
}

.el-upload-list {
    width: 100%;
}

.upload-thumb {
    margin: auto;
    text-align: center;
    display: inline;
}

.btn-upload-thumb {
    display: inline;
    font-size: 1rem;
    color:#00a7de;
    cursor: pointer;
}

.btn-upload-thumb:hover {
    color:rgb(62, 126, 199);
}

.btn-upload-thumb:active {
    color:rgb(49, 102, 161);
}

.select-thumb-label {
    margin-top:20px;
    margin-bottom: 20px;
    text-align: center;
}

.select-thumbnail {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
}

.uploader{
    width: 60%;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    border-radius: 5px;
    box-shadow: 0 1px 5px gray;
}

.uploader-drop p {
    margin-top: 0 !important;
    font-size: 0.8rem;
}

.uploader-drop {
    background-color: white !important;
    border: none !important;
}



.uploader-file {
    margin-top: 10px;
}

.uploader-btn {
    border-radius: 2px !important;
    text-align: center;
    width: 100px;
    height: 30px;
    font-size: 0.9rem !important;
    line-height: 30px !important;
    color:white !important;
    border: none !important;
    margin-right: 4px;
    background-color: #409EFF !important;
    border-color: #409EFF !important;
}

.uploader-btn:hover {
    background: #66b1ff !important;
    border-color: #66b1ff !important;
}

.uploader-btn:active {
    background: #3a8ee6 !important;
    border-color: #3a8ee6 !important;
}



.uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>

<script>
import qs from "qs"
import { Upload, Button, Input } from "element-ui"

export default {
    components: {
        "el-upload": Upload,
        "el-button": Button,
        "el-input": Input
    },
    mounted() {
        console.log(this.$parent.account.isLogin);
        if (!this.$parent.account.isLogin)
        {
            this.$notify.error({
                title: "提示",
                message: "请先登录"
            });
            this.$router.push("/login");
        }
    },
    data() {
        return {
            uploadThumbUrl: this.config.serverUrl + "thumbnail-upload",
            videoInfo: {
                title: "",
                description: "",
                tags: ""
            },
            uploaderOptions: {
                target: '/api/video-upload',
                testChunks: false,
                parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
                    return parsedTimeRemaining
                        .replace(/\syears?/, '年')
                        .replace(/\days?/, '天')
                        .replace(/\shours?/, '小时')
                        .replace(/\sminutes?/, '分钟')
                        .replace(/\sseconds?/, '秒')
                },
                fileStatusText: {
                    success: '完成',
                    error: '失败',
                    uploading: '上传中',
                    paused: '已暂停',
                    waiting: '等待中'
                },
                attrs: {
                    accept: 'video/*'
                }
            },
            thumbnailDisplay: {
                thumbnails: [],
                current: 0
            },
            account: this.$parent.account,
            uploaded: false,
            uploadInfo: {
                name: "",
                video: "/videos/ee527a2048b7509d8eeadca9cebaf9ca.mp4",
                thumbnails: []
            }
        }
    },
    methods: {
        publishVideo() {
            let info = this.videoInfo;
            if (info.title.length == 0)
            {
                this.$notify.error({
                    title: "错误",
                    message: "标题不能为空"
                });
                return;
            }
            this.axios.post("add-video", qs.stringify({
                "title": info.title,
                "description": info.description,
                "tags": info.tags,
                "video": this.uploadInfo.video,
                "thumbnail": this.thumbnailDisplay.thumbnails[this.thumbnailDisplay.current]
            }))
            .then((response) => {
                let rep = response.data;
                if (rep.code == 0)
                {
                    this.$notify({
                        type: "success",
                        title: "提示",
                        message: "成功投稿！"
                    });
                    this.$router.push("/user/" + this.account.uid);
                }
                else
                {
                    this.$notify.error({
                        title: "错误",
                        message: "投稿失败: " + rep.msg
                    });
                }
            })
            .catch((error) => {
                this.$notify.error({
                    title: "错误",
                    message: "投稿失败: " + error
                });
            });
        },
        selectThumb(index) {
            this.thumbnailDisplay.current = index;
            console.log(index);
        },
        thumbUploadSuccess(response, file, fileList) {
            if (response.code == 0)
            {
                this.thumbnailDisplay.thumbnails.push(response.data["thumbnail"]);
            }
            else
            {
                this.$notify.error({
                    title: "错误",
                    message: "上传视频封面失败: " + response.msg
                })
            }
        },
        getThumbnail(offset = 0) {
            let index = this.thumbnailDisplay.current + offset;
            if (index >= 0 && index < this.thumbnailDisplay.thumbnails.length)
            {
                return this.config.serverUrl + this.thumbnailDisplay.thumbnails[index];
            }
            else
            {
                return "";
            }
        },
        uploadComplete() {
            let _this = this.$parent;

        },
        fileSuccess(rootFile, file, message, chunk) {
            let _this = this.$parent;
            _this.axios.get("video-upload-done?identifier=" + file.uniqueIdentifier + "&name=" + file.name + "&chunkcount=" + file.chunks.length)
            .then((response) => {
                let rep = response.data;
                if (rep.code == 0)
                {
                    this.uploaded = true;
                    this.uploadInfo = rep.data;
                    this.thumbnailDisplay.thumbnails = this.uploadInfo.thumbnails;
                    this.$notify({
                        title: "提示",
                        message: "上传完成!",
                        type: "success"
                    });
                }
            })
            .catch((error) => {

            });
        }
    }
}
</script>