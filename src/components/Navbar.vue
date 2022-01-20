<template>
  <nav>
    <div class="nav-row">
      <button @click="newGame">New game</button>
      <span
          :class="{'text-win': result === 'WIN', 'text-loss': result === 'LOSS'}"
          class="text-result"
      >{{ result }}</span>
      <svg style="width:24px;height:24px" viewBox="0 0 24 24" @click="settingsVisible = !settingsVisible">
        <!-- SVG drawing of a cog -->
        <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
              fill="white"/>
      </svg>
    </div>
    <div
        v-show="settingsVisible"
        class="nav-row"
    >
      <span>
        <label for="rowsInput">Rows</label>
        <input
          id="rowsInput"
          min="10" type="number"
          :max="maxRows"
          :value="$store.state.gameSettings.rows"
          @blur="checkRowsInput"
          @input="(event) => setSettings('rows', event.target.value)"
        >
      </span>
      <span>
        <label for="columnsInput">Columns</label>
        <input
          id="columnsInput"
          :value="$store.state.gameSettings.columns"
          @input="(event) => setSettings('columns', event.target.value)"
          @blur="checkColumnsInput"
          min="10"
          :max="maxColumns"
          type="number"
        >
      </span>
      <span>
        <label for="minesInput">Mines</label>
        <input
          id="minesInput"
          min="10"
          :max="maxMines"
          @blur="checkMinesInput"
          type="number"
          :value="$store.state.gameSettings.mines"
          @input="(event) => setSettings('mines', event.target.value)"
        >
      </span>
    </div>
  </nav>
</template>

<script>
import eventBus from '../events/eventBus'

export default {
  name: 'Navbar',
  data () {
    return {
      settingsVisible: false
    }
  },
  computed: {
    maxMines () {
      return Math.floor(this.$store.state.gameSettings.rows * this.$store.state.gameSettings.columns * 0.25)
    },
    maxColumns () {
      // TODO: responsive - based on caontainer width
      return 55
    },
    maxRows () {
      // TODO: responsive - based on caontainer height
      return 23
    },
    result () {
      // text showing the state of game
      if (this.$store.state.gameState.win) {
        return 'WIN'
      }
      if (this.$store.state.gameState.loss) {
        return 'LOSS'
      }

      return ''
    },
    settings () {
      return this.$store.state.gameSettings
    }
  },
  methods: {
    setSettings (key, value) {
      // typecast value before storing it in vuex
      this.$store.state.gameSettings[key] = +value
    },
    checkMinesInput () {
      // checking user input
      if (this.$store.state.gameSettings.mines > this.maxMines) {
        this.$store.state.gameSettings.mines = this.maxMines
      }
    },
    checkRowsInput () {
      // checking user input
      if (this.$store.state.gameSettings.rows > this.maxRows) {
        this.$store.state.gameSettings.rows = this.maxRows
      }
    },
    checkColumnsInput () {
      // checking user input
      if (this.$store.state.gameSettings.columns > this.maxColumns) {
        this.$store.state.gameSettings.columns = this.maxColumns
      }
    },
    newGame () {
      this.$store.commit('generateMatrix', { ...this.$store.state.gameSettings })
      eventBus.$emit('new-game')
    }
  }
}
</script>

<style scoped>
nav {
  background-color: #395687;
  border-bottom: 5px solid #000a1c;
}

label {
  margin-right: 10px;
}

input {
  text-align: right;
  border: none;
  border-radius: 0;
  font-family: "Alumni Sans";
  font-size: 1.3rem;
}

.nav-row {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  color: white;
}

button {
  border: 2px solid black;
  background-color: #000a1c;
  color: white;
  padding: 10px;
}

button:hover {
  /* background-color: #13213b; */
  color: #000a1c;
  background-color: #b7bdc7;
}

.text-result {
  /* font-family: "Courier New"; */
  font-family: "Alumni Sans";
  font-size: 2rem;
  font-weight: bold;
}

.text-win {
  color: #2bff00;
}

.text-loss {
  color: #ff6759;
}
</style>
