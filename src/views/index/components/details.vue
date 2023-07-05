<template>
    <div>
        <div class="markdown-body" v-html="blogContent"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted, watch } from 'vue' 
import { marked }  from 'marked'
import "github-markdown-css"
export default defineComponent({
    name:'Detail',
    props:['blog'],
    setup(props){
        let blogContent = ref(marked(props.blog))
        watch(
            () => props.blog,
            (newVal) => {
                blogContent.value = marked(newVal)
            }
        )
        return {
            blogContent
        }
    }
})
</script>
<style>
</style>