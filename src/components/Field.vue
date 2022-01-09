<template>
<div class="field-container"
     :class="{'last-row': lastRow, 'last-column': lastColumn}"
     @click="showHidden">
  <div class="field-container-inner hidden" v-if="field.hidden"></div>
  <div
      :class="`number-field-${field.value}`"
      v-else
  >
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
  computed: {
    /**
     * Styling purposes - preventing different border thickness for outer and inner edges
     * @return {Boolean}
     */
    lastRow () {
      return this.x === this.$store.getters.matrixDimensions.rows - 1
    },
    lastColumn () {
      return this.y === this.$store.getters.matrixDimensions.columns - 1
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
  background: #d5dce8;
  /* testing */
  width: 50px;
  height: 50px;

  font-weight: bold;
  font-family: monospace;
  border-style: solid;
  border-width: 3px;
  border-top-color: #b7bdc7;
  border-left-color: #b7bdc7;
  border-right: none;
  border-bottom: none;
}

.last-row {
  border-bottom: 3px solid #b7bdc7;
}
.last-column {
  border-right: 3px solid #b7bdc7;
}
.field-container-inner {
  width: 100%;
  height: 100%;
}
.hidden {
  border-style: solid;
  border-width: 4px;
  border-top-color: #b7bdc7;
  border-left-color: #b7bdc7;
  border-right-color: #000a1c;
  border-bottom-color: #000a1c;
  background-color:  #1f2c40;
  /* border: 4px outset #bfbfbf; */
}

.hidden:hover {
  background-color: #395687;
}
.number-field-1 {
  color: #009C95;
}
.number-field-2 {
  color: #016936;
}
.number-field-3 {
  color: #B413EC;
}
.number-field-4 {
  color: #EAAE00;
}
.number-field-5 {
  color: #975B33;
}
.number-field-6 {
  color: #A7BD0D;
}
.number-field-7 {
  color: #9627BA;
}
.number-field-8 {
  color: #D01919;
}
</style>
