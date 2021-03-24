<template>
  <div id="app">
    <v-btn
      class="add-board"
      fab
      @click="addBoard()"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <Board v-for="board in boards" v-bind:key="board.name" :board="board"></Board>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BoardList, BoardModule } from '@/store/module/board'

import Board from '@/components/Board.vue'

@Component({
  components: {
    Board
  }
})
export default class App extends Vue {
  get boards (): BoardList {
    return BoardModule.boards
  }

  addBoard (): void {
    let name = prompt('Board name')
    name = name && name.trim()

    if (!name || !name.length) {
      return
    }

    if (this.boards.find(board => board.name === name)) { // TODO move into the business logic layer
      alert(`Board "${name}" already exist!`)
    } else {
      BoardModule.addBoard({ name })
    }
  }
}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
  }
</style>
