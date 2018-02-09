<style lang="scss" scoped>
</style>

<template>
  <tr>
    <td>{{}}</td>
    <td>a</td>
    <td>b</td>
  </tr>
</template>
<script>
import { mapMutations } from 'vuex'
import {wepons, critical, sharp, APP_VERSION} from '../store/const.js'

export default {
  name: 'Item',
  props: ['item'],
  data () {
    return {
    }
  },
  directives: {
    focus (el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  computed: {
  },
  methods: {
    ...mapMutations([
    ]),
  },
  filters: {
  }
}
</script>