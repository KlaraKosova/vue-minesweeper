<template>
  <div class="field-container">
    <div v-for="i in $store.state.matrix.rows" :key="i" class="field-row">
      <Field v-for=" j in $store.state.matrix.columns" :key="j" :x="i" :y="j"/>
    </div>
  </div>
</template>

<script>
import Field from './Field'

export default {
  name: 'FieldContainer',
  components: { Field }
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
