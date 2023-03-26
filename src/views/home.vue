<template>
  <div>
    主页
    <div>{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data() {
    return {
      name: ''
    }
  },
  mounted() {
    // 从url中获取参数
    this.name = this.$route.query.name
  }
}
</script>
<style scoped lang="scss"></style>
