<template>
  <div>
    <v-list-item v-for="comment in comments" v-bind:key="comment.id">
      <v-list-item-content>
        <v-list-item-title>{{comment.comment}}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon>
          <v-icon @click="deleteComment(comment.id)">delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CommentList, CommentModule } from '@/store/module/comment'

@Component({})
export default class extends Vue {
  @Prop({ required: true })
  protected comments!: CommentList

  deleteComment (id: string) {
    CommentModule.deleteComment(id)
  }
}
</script>

<style scoped>

</style>
