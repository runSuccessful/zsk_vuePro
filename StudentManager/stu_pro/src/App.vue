<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Layout from '@/layout/Layout.vue'

const route = useRoute()

// 判断是否显示布局（登录和注册页面不显示布局）
const showLayout = computed(() => {
  return !['Login', 'Register'].includes(route.name as string)
})
</script>

<template>
  <Layout v-if="showLayout" />
  <router-view v-else />
</template>

<style scoped>

</style>
