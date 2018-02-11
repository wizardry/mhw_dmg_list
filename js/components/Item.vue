<style lang="scss" scoped>
.cellInner {
  margin: -6px -32px 0 -24px; 
}
.sharpness {
  margin: 0;
  text-align: center;
  line-height: 2;
  &.green { background: #35c155; }
  &.blue { background: #66dbff; }
  &.white { background: #f1f1f1; color:#3f3f3f}
}
.atk{
  text-align: center;
  font-size: 18px; 
  margin: 0.5em;
}
.smallEm{
  font-weight: bold;
}
.em {
  font-size:16px;
}
.cri1 {
  color: #c33;
}
.cri2 {
  line-height: 32px;
  color: #66dbff;
}
.cri3 {
  color: #2b9844;
}
.cri4 {
  color: #35c155;
}
.cri5 {
  color: #8fe0a2;
}
.sharpnessTable {
  margin: -6px -32px 0px -24px;
  max-height: 321px;
}
</style>

<template>
  <md-table-row v-if="getWindowWidth < 1024">
    <md-table-cell style="font-size:16px; overflow:auto">{{rowHeader}}</md-table-cell>
    <md-table-cell>
      <div class="sharpnessTable">
        <md-table>
          <md-table-row v-for="(sharp, index) in [sharpGreen, sharpBlue, sharpWhite]" :key="index">
            <md-table-cell>
              <div class="cellInner">
                <p v-if="index == 0" class="sharpness green">切れ味：緑</p>
                <p v-if="index == 1" class="sharpness blue">切れ味：青</p>
                <p v-if="index == 2" class="sharpness white">切れ味：白</p>
                <div class="md-layout md-gutter">
                  <p class="md-layout-item atk">{{sharp}}</p>
                  <div class="md-layout-item cri2">会心：<span class="smallEm">{{Math.floor(sharp * critical[2].magnification)}}</span></div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item cri1">負会心：<span class="smallEm">{{Math.floor(sharp * critical[1].magnification)}}</span></div>
                  <div class="md-layout-item cri3">超1：<span class="smallEm">{{Math.floor(sharp * critical[3].magnification)}}</span></div>
                </div>                
                <div class="md-layout md-gutter">
                  <div class="md-layout-item cri4">超2：<span class="smallEm">{{Math.floor(sharp * critical[4].magnification)}}</span></div>
                  <div class="md-layout-item cri5">超3：<span class="smallEm">{{Math.floor(sharp * critical[5].magnification)}}</span></div>
                </div>                
              </div>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </md-table-cell>
  </md-table-row>
  <md-table-row v-else>
    <md-table-cell style="font-size:16px;">{{rowHeader}}</md-table-cell>
    <md-table-cell v-for="(sharp, index) in [sharpGreen, sharpBlue, sharpWhite]" :key="index">
      <p class="atk">{{sharp}}</p>
      <div class="md-layout md-gutter">
        <div class="md-layout-item cri1">負会心：<span class="em">{{Math.floor(sharp * critical[1].magnification)}}</span></div>
        <div class="md-layout-item cri2">会心：<span class="em">{{Math.floor(sharp * critical[2].magnification)}}</span></div>
      </div>
      <div class="md-layout md-gutter">
        <div class="md-layout-item cri3">超1：<span class="em">{{Math.floor(sharp * critical[3].magnification)}}</span></div>
        <div class="md-layout-item cri4">超2：<span class="em">{{Math.floor(sharp * critical[4].magnification)}}</span></div>
        <div class="md-layout-item cri5">超3：<span class="em">{{Math.floor(sharp * critical[5].magnification)}}</span></div>
      </div>
    </md-table-cell>
  </md-table-row>
</template>
<script>
import { mapMutations } from 'vuex'
import {wepons, critical, sharp, APP_VERSION} from '../store/const.js'

export default {
  name: 'Item',
  props: ['item'],
  data () {
    return {
      critical: critical,
    }
  },
  directives: {
  },
  beforeMount() {
  },
  computed: {
    rowHeader() { return this.item.head; },
    sharpGreen(){ return this.item.data[0]; },
    sharpBlue(){ return this.item.data[1]; },
    sharpWhite(){ return this.item.data[2]; },
    getWindowWidth(){ return this.$store.state.window_width; },

  },
  methods: {
    ...mapMutations([
    ]),
  },
  filters: {
  }
}
</script>