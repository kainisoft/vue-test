<template>
  <v-card min-height="100" max-width="300" :style="style">
    <v-card-title
      @touchstart="dragStart($event)"
      @touchend="dragEnd($event)"
      @touchmove="drag($event)"
      @mousedown="dragStart($event)"
      @mouseup="dragEnd($event)"
      @mousemove="drag($event)"
    >
      <v-icon>control_camera</v-icon>
      &nbsp;
      {{board.name}}
    </v-card-title>

    <Comment :comments="getBoardComments()"></Comment>

    <v-card-actions>
      <v-text-field
        label="Comment..."
        hint="Your comment here..."
        counter="30"
        v-model="text"
        v-on:keyup.enter="addComment($event.target.value)"
      ></v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IBoard } from '@/store/module/board'
import { CommentModule } from '@/store/module/comment'
import Comment from '@/components/Comment.vue'

@Component({
  components: {
    Comment
  }
})
export default class extends Vue {
  protected xPos = 0
  protected yPos = 0
  protected active = false
  protected currentX!: number
  protected currentY!: number
  protected initialX!: number
  protected initialY!: number
  protected xOffset = 0
  protected yOffset = 0
  protected text = ''

  @Prop({ required: true })
  protected board!: IBoard

  addComment (comment: string) {
    comment = comment && comment.trim()

    if (!comment) {
      return
    }

    CommentModule.addComment({
      id: Math.random().toString(36).substring(7),
      board: this.board.name,
      comment
    })
    this.text = ''
  }

  getBoardComments () {
    return CommentModule.boardComments(this.board)
  }

  dragStart (e: any) {
    if (e.type === 'touchstart') {
      this.initialX = e.touches[0].clientX - this.xOffset
      this.initialY = e.touches[0].clientY - this.yOffset
    } else {
      this.initialX = e.clientX - this.xOffset
      this.initialY = e.clientY - this.yOffset
    }

    if (e.target.classList.contains('v-card__title')) {
      this.active = true
    }
  }

  dragEnd (e: any) {
    this.initialX = this.currentX
    this.initialY = this.currentY

    this.active = false
  }

  drag (e: any) {
    if (this.active) {
      e.preventDefault()

      if (e.type === 'touchmove') {
        this.currentX = e.touches[0].clientX - this.initialX
        this.currentY = e.touches[0].clientY - this.initialY
      } else {
        this.currentX = e.clientX - this.initialX
        this.currentY = e.clientY - this.initialY
      }

      this.xOffset = this.currentX
      this.yOffset = this.currentY

      this.xPos = this.currentX
      this.yPos = this.currentY
    }
  }

  get style () {
    return {
      transform: `translate3d(${this.xPos}px, ${this.yPos}px, 0)`
    }
  }
}
</script>

<style scoped>
  .v-card {
    position: absolute;
  }
  .v-card__title {
    cursor: grab;
  }
</style>
