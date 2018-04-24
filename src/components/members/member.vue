<template>
  <h1>123</h1>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name:"member",
  computed:{
    ...mapState("MemberStore",["count"])
  }
}
</script>
<style>

</style>
