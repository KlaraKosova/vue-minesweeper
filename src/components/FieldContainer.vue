<template>
  <div class="field-container" v-if="fieldRerender">
    <div v-for="i in $store.state.matrix.rows" :key="i" class="field-row">
      <Field v-for=" j in $store.state.matrix.columns" :key="j" :x="i-1" :y="j-1"/>
    </div>
  </div>
</template>

<script>
import Field from './Field'
import eventBus from '../events/eventBus'

export default {
  name: 'FieldContainer',
  components: { Field },
  data () {
    return {
      fieldRerender: true
    }
  },
  created () {
    eventBus.$on('new-game', () => {
      this.fieldRerender = false
      this.$nextTick(() => {
        this.fieldRerender = true
      })
    })
  }
}
</script>

<style scoped>
.field-container {
  display: flex;
  flex-direction: column;
}
.field-row {
  display: flex;
}
</style>
