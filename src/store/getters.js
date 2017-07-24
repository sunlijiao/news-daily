
export default {
  getCollect:state => {
    return state.isCollect ? '取消收藏' : '收藏'
  },
  getModel:state => {
    return state.isNight ? 'night' : 'morning'
  }
}

