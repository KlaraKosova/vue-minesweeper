<template>
<div class="field-container" @click="showHidden">
  <div class="field-container-inner hidden" v-if="field.hidden"></div>
  <div v-else>
    {{field.value}}
  </div>
</div>
</template>

<script>

export default {
  name: 'Field',
  props: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      field: {}
    }
  },
  methods: {
    showHidden () {
      if (this.field.hidden) {
        this.$store.commit('showField', { x: this.x, y: this.y })
      }
    }
  },
  created () {
    this.field = this.$store.getters.field({ x: this.x, y: this.y })
  }
}
</script>

<style scoped>
/*
TODO: responsive sizes
 */
.field-container {
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* testing */
  width: 50px;
  height: 50px;
}
.field-container-inner {
  width: 100%;
  height: 100%;
}
.hidden {
  border-style: solid;
  border-width: 4px;
  border-top-color: white;
  border-left-color: white;
  border-right-color: #808080;
  border-bottom-color: #808080;
  background-color: #bfbfbf;
  /* border: 4px outset #bfbfbf; */
}
</style>
