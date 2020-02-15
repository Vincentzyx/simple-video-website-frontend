<template>
    <div>
        <div class="notice-bar" :class="{showNotice: showNotice}">
            <div class="notice-msg">{{noticeData.msg}}</div>
            <div class="btn-close" @click="closeNotice()"></div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
export default {
    
}
</script>