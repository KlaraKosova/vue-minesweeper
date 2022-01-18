<template>
<div
    class="field-container"
    :class="{'hidden': field.hidden}"
    @click="handleRightClick"
    @contextmenu.prevent="handleLeftClick"
>
  <span
      v-if="!field.hidden"
      :class="`number-field-${field.value}`"
  >
    <template v-if="displaysMineIcon">
      <MineSVG />
    </template>
    <template v-else>
      {{field.value}}
    </template>
  </span>
  <FlagSVG v-else-if="this.field.flagged" />
</div>
</template>

<script>
import { Mine } from '../Entities/Mine'
import MineSVG from './MineSVG'
import FlagSVG from './FlagSVG'
import { mapGetters } from 'vuex'

export default {
  name: 'Field',
  components: { FlagSVG, MineSVG },
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
    displaysMineIcon () {
      return this.field instanceof Mine
    },
    ...mapGetters({
      isEveryMineLocated: 'isEveryMineLocated'
    })
  },
  methods: {
    handleRightClick () {
      // reveal field if hidden and doesn't have flag
      if (this.field.hidden && !this.field.flagged) {
        this.$store.commit('showField', { x: this.x, y: this.y })
        this.$store.commit('recalculateState')
      }
      if (!this.field.hidden) {
        // show fields around mine for revealed with and flagged neighbours
        this.$store.commit('tryRevealAround', { x: this.x, y: this.y })
        this.$store.commit('recalculateState')
      }
    },
    handleLeftClick () {
      // toggle flag for hidden fields
      if (this.field.hidden) {
        this.field.flagged = !this.field.flagged
        this.$store.commit('recalculateState')
      }
      // show fields around mine for revealed with and flagged neighbours
      // this.$store.commit('tryRevealAround', { x: this.x, y: this.y })
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
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d5dce8;
  /* testing */
  width: 29px;
  height: 29px;

  font-weight: bold;
  font-family: monospace;
  border: 2px solid #b7bdc7;
  /* border-style: solid;
  border-width: 2px;
  border-top-color: #b7bdc7;
  border-left-color: #b7bdc7;
  border-right: none;
  border-bottom: none; */
}

.last-row {
  border-bottom: 2px solid #b7bdc7;
}
.last-column {
  border-right: 2px solid #b7bdc7;
}

.hidden {
  border-style: solid;
  border-width: 2px;
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
