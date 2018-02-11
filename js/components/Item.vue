<style lang="scss" scoped>
  th,td {
    text-align: center;
    border: 1px solid #3f3f3f;
  }
  th {
    background: #565656;
    font-weight: bold;
    color: #cfcfcf;
    vertical-align: middle;
  }
  p {
    margin-top: 8px;
    font-size:18px;
  }
  .inner_table {
    font-size: 14px;
    margin: 8px 0 0;
    width: 100%;

    td {
      padding: 4px;
      border-bottom: none;

      &:last-child {
        border-right: none;
      }
      &:first-child {
        border-left: none;
      }
    }

    +.inner_table {
      margin-top: 0;
    }
  }
</style>

<template>
  <tr>
    <th>{{rowHeader}}</th>
    <td v-for="sharp in [sharpGreen, sharpBlue, sharpWhite]">
      <p>{{sharp}}</p>
      <table class="inner_table">
        <tr>
          <td class="cri1">負会心：{{Math.floor(sharp * critical[1].magnification)}}</td>
          <td class="cri2">会心：{{Math.floor(sharp * critical[2].magnification)}}</td>          
        </tr>
      </table>
      <table class="inner_table">
        <tr>
          <td class="cri3">超1:{{Math.floor(sharp * critical[3].magnification)}}</td>
          <td class="cri4">超2:{{Math.floor(sharp * critical[4].magnification)}}</td>
          <td class="cri5">超3:{{Math.floor(sharp * critical[5].magnification)}}</td>
        </tr>
      </table>
    </td>
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
      critical: critical
    }
  },
  directives: {
  },
  beforeMount() {
  },
  computed: {
    rowHeader() { return this.item.head; },
    sharpGreen(){ 
      console.log(this)
      return this.item.data[0]; },
    sharpBlue(){ return this.item.data[1]; },
    sharpWhite(){ return this.item.data[2]; },
  },
  methods: {
    ...mapMutations([
    ]),
  },
  filters: {
  }
}
</script>