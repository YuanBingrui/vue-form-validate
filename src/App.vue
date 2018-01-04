<template>
  <div id="app">
    <FormValidate/>
  </div>
</template>

<script>
import FormValidate from '@/components/FormValidate'

export default {
  name: 'app',
  components: {
    FormValidate
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
