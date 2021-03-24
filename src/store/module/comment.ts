import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { IBoard } from '@/store/module/board'

export interface IComment {
  id: string;
  board: string;
  comment: string;
}

export type CommentList = IComment[];

export interface ICommentState {
  comments: CommentList;
}

@Module({
  namespaced: true,
  dynamic: true,
  name: 'comment',
  store
})
class Comment extends VuexModule implements ICommentState {
  comments: CommentList = [];

  @Mutation
  public pushComment (comment: IComment) {
    this.comments.push(comment)
  }

  @Mutation
  public spliceComment (id: string) {
    this.comments = this.comments.filter(comment => comment.id !== id)
  }

  @Action
  public addComment (comment: IComment) {
    this.context.commit('pushComment', comment)
  }

  @Action deleteComment (id: string) {
    this.context.commit('spliceComment', id)
  }

  get boardComments () {
    return (board: IBoard) => this.comments.filter(comment => comment.board === board.name)
  }
}

export const CommentModule = getModule(Comment)
