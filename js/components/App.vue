<style lang="scss" scoped>
header {
}
.mainContent {
}
footer {
}
</style>
<template>
  <section class="materialCalcApp">
    <!-- header -->
    <header>
      MHW攻撃力簡易リスト
    </header>
    <div class="appWrapper">
      <form>
        <dl>
          <dt>武器種別</dt>
          <dd>
            <select name="wepon_type" id="" @change.prevent="onChangeWeponType">
              <option v-for="wepon in wepons" :value="wepon.id">{{wepon.name}}</option>
            </select>
          </dd>
        </dl>
        <dl>
          <dt>武器攻撃力</dt>
          <dd>
            <select name="wep_atk_max" type="number" @change.prevent="onChangeWeponAtackMax">
              <option v-for="atack in atacks.concat().reverse()" :value="atack">{{atack * wepon_magnification }}</option>
            </select>
            ～
            <select name="wep_atk_min" type="number" @change.prevent="onChangeWeponAtackMin">
              <option v-for="atack in atacks" :value="atack">{{atack * wepon_magnification }}</option>
            </select>
          </dd>
        </dl>
        <dl>
          <dt>基礎攻撃力</dt>
          <dd>
            <input name="bas_atk_max" type="number" @change.prevent="onChangeBasicAtackMax">
            ～
            <input name="bas_atk_max" type="number" @change.prevent="onChangeBasicAtackMin">
          </dd>
        </dl>
      </form>
      <div class="mainContent">
        <div class="sharp_list" v-if="render_type == 0">
          <table>
            <item v-for="(item, index) in items" :key="index" :item="item"></item>
          </table>
        </div>
        <div class="critical_list" v-if="render_type != 0">
          <table>
            <item v-for="(item, index) in items" :key="index" :item="item"></item>
          </table>
        </div>
      </div>
    </div>
    <footer>developper by wiz_rein</footer>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import Item from './Item.vue'
import {wepons, critical, sharp, APP_VERSION} from '../store/const.js'

export default {
  components: { Item },
  data () {
    return {
      wepons: wepons,
      current_wepon: 0,
      atacks: [ 220, 210, 200, 190, 180, 170, 160, 150, 140, 130, 120, 110, 100, 90, 80],
      sharp: sharp,
      critical: critical,
      sharp_table: [],
      critical_table: [],
    }
  },
  directives: {
  },
  beforeMount() {
  },
  computed: {
    render_type() {
      return 0;
      return this.$store.state.render_type
    },

    wepon_magnification() {
      console.log('wepon_magnification')
      return wepons.find( (wepon)=> {
        return wepon.id == this.$store.state.wepon_type
      }).magnification
    },

    items () {
      const min = this.$store.state.min_atk;
      const max = this.$store.state.max_atk;
      debugger

      // itemsは連想配列
      // minから10刻みでmaxまでの配列に更に切れ味or会心率のパターン分の列ができる。
      let items = [];

      if (this.$store.state.render_type == 0) {
        for (var i = min; i < max; i+10) {
          items.push({
            head:i,
            data:[
              [i*sharp[3].phy],
              [i*sharp[4].phy],
              [i*sharp[5].phy]
            ]
          });
        };
      } else {
        for (var i = min; i < max; i+10) {
          items.push({
            head:i,
            data:critical.map( (d) => {
              return i * d.magnification 
            })
          });
        };
      }

      debugger
      console.log(items)
      return items;
    },
  },
  methods: {
    onChangeWeponType(e) {
      const formdata = e.target.wepon_type
      return null

    },
    ...mapMutations([
    ])
  },
  filters: {
  }
}
</script>
