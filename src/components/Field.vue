<template>
<div class="field-container">
  {{field({ x: this.x - 1, y: this.y - 1 }).value}}
</div>
</template>

<script>
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters({
      field: 'field'
    })
  }
}
</script>

<style scoped>
.field-container {
  padding: 1px;
  border: #000 solid;
  display: flex;
  justify-content: center;
  align-items: center;
  /* testing */
  width: 50px;
  height: 50px;
}
</style>
