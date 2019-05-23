<template>
  
</template>

<script>
export default {
  beforeMount() {
    this.$store.dispatch('auth/logout')
  }
}
</script>

<style>

</style>
