export const state = {
  min_atk: 80,
  max_atk: 220,
  wepon_type: 0,
  critical_type: 0
}

export const mutations = {
  changeWeponType (state, values) {
    console.log('changeWeponType', state,values)
    state.wepon_type = values;
  },
  changeMinAtk (state, values) {
    console.log(state, values)
    state.min_atk = values;
  },
  changeMaxAtk (state, values) {
    console.log(state, values)
    state.max_atk = values
  },
}
