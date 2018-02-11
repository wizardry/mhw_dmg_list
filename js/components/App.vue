<style lang="scss" scoped>
.form {
  margin-top: 40px;
  background: #f1f1f1;
  color: #363636;
}
.md-app {
  max-height: 400px;
  border: 1px solid rgba(#000, .12);
}

.large {
  .md-app {
    max-height: none;
  }
}
footer {
  text-align: right;
  padding: 4px 16px;
  font-size: 12px;
}

</style>
<template>
  <div class="page-container" v-bind:class="{large: getWindowWidth > 1024}">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary" style="top: -60px">
        <span class="md-title">MHW攻撃力簡易リスト</span>
      </md-app-toolbar>
      <md-app-content style="margin-top: 40px">
        <section class="materialCalcApp">
          <form>
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <md-field>
                  <label for="wepon_type">武器種別</label>
                  <md-select name="wepon_type" id="wepon_type" v-model="wepon_type" @change.prevent="onChangeWeponType">
                    <md-option v-for="wepon in wepons" :value="wepon.id">{{wepon.name}}</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <md-field>
                  <label>武器攻撃力</label>
                  <md-select name="wep_atk_max" type="number" v-model="min_atk" @change.prevent="onChangeWeponAtackMin">
                    <md-option v-for="atack in atacks.concat().reverse()" :value="atack">{{Math.floor(atack * wepon_magnification) }}</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item md-size-10" style="text-align:center;">
                <div style="padding-top: 30px">～</div>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <md-select name="wep_atk_min" type="number" v-model="max_atk" @change.prevent="onChangeWeponAtackMax">
                    <md-option v-for="atack in atacks" :value="atack">{{Math.floor(atack * wepon_magnification) }}</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
          </form>
          <div class="mainContent">
            <div class="sharp_list">
              <md-table>
                <md-table-row v-if="getWindowWidth < 1024">
                  <md-table-head style="width:2em">atk</md-table-head>
                  <md-table-head></md-table-head>
                </md-table-row>
                <md-table-row v-else>
                  <md-table-head>基礎攻撃力 / 切れ味</md-table-head>
                  <md-table-head>切れ味：緑</md-table-head>
                  <md-table-head>切れ味：青</md-table-head>
                  <md-table-head>切れ味：白</md-table-head>
                </md-table-row>
                <item v-for="(item, index) in items" :key="index" :item="item"></item>
              </md-table>
            </div>
          </div>
        </section>
      </md-app-content>
    </md-app>
    <footer>developper by <a href="https://twitter.com/wiz_rein" target="_blank">wiz_rein</footer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { MdApp, MdContent } from 'vue-material/dist/components'
import Item from './Item.vue'
import {wepons, critical, sharp, APP_VERSION} from '../store/const.js'

export default {
  name: 'Reveal',
  components: { Item },
  data () {
    return {
      menuVisible: false,
      wepons: wepons,
      wepon_type: this.$store.state.wepon_type,
      min_atk: this.$store.state.min_atk,
      max_atk: this.$store.state.max_atk,
      atacks: [ 250, 240, 230, 220, 210, 200, 190, 180, 170, 160, 150, 140, 130, 120, 110, 100, 90, 80],
      sharp: sharp,
    }
  },
  directives: {
  },
  beforeMount() {
  },
  computed: {
    wepon_magnification() {
      console.log('wepon_magnification')
      return wepons.find( (wepon)=> {
        return wepon.id == this.$store.state.wepon_type
      }).magnification
    },

    items () {
      const min = this.$store.state.min_atk;
      const max = this.$store.state.max_atk;

      let infiniteFlg = false;

      // itemsは連想配列
      // minから10刻みでmaxまでの配列に更に切れ味or会心率のパターン分の列ができる。
      let itemData = [];

      for (var i = min; i <= max; i = i+10) {
        itemData.push({
          head:Math.floor(i * this.wepon_magnification),
          data:[
            Math.floor(i*sharp[3].phy * this.wepon_magnification),
            Math.floor(i*sharp[4].phy * this.wepon_magnification),
            Math.floor(i*sharp[5].phy * this.wepon_magnification)
          ]
        });
        if(infiniteFlg != i){
          infiniteFlg = i
        }else{
          // debugger
        }
      };

      console.log(min, max, itemData)
      return itemData;
    },
    getWindowWidth() { return this.$store.state.window_width; },
    getWindowHeight() { 
      console.log(window.innerHeight);
      return window.innerHeight; },

  },
  methods: {
    onChangeWeponType(e) {
      const formdata = e.target.value
      this.changeWeponType(parseInt(formdata));
    },
    onChangeWeponAtackMin(e) {
      this.changeMinAtk(parseInt(e.target.value));
    },
    onChangeWeponAtackMax(e) {
      this.changeMaxAtk(parseInt(e.target.value));
    },
    ...mapMutations([
      'changeWeponType',
      'changeMinAtk',
      'changeMaxAtk'

    ])
  },
  filters: {
  }
}
</script>
