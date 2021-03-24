import Vue from 'vue'
import Vuex from 'vuex'
import { IBoardState } from '@/store/module/board'
import { ICommentState } from '@/store/module/comment'

Vue.use(Vuex)

export interface IRootState {
  board: IBoardState,
  comment: ICommentState,
}

export default new Vuex.Store<IRootState>({})
