import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IBoard {
  name: string;
  x?: number; // For the future purpose
  y?: number; // For the future purpose
}

export type BoardList = IBoard[];

export interface IBoardState {
  boards: BoardList;
}

@Module({
  namespaced: true,
  dynamic: true,
  name: 'board',
  store
})
class Board extends VuexModule implements IBoardState {
  public boards: BoardList = []

  @Mutation
  public pushBoard (board: IBoard): void {
    this.boards.push(board)
  }

  @Action
  public addBoard (board: IBoard): void {
    this.context.commit('pushBoard', board)
  }
}

export const BoardModule = getModule(Board)
