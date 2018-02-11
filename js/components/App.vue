<style lang="scss" scoped>
header {
}
.mainContent {
  table {
    border-collapse: collapse;
    border: 1px solid #3f3f3f;

    th,td {
      padding: 8px;  
      border: 1px solid #3f3f3f;
    }

    th {
      background: #565656;
      font-weight: bold;
      color: #cfcfcf;
    }

    td {
    }
  }
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
            <select name="wep_atk_max" type="number" @change.prevent="onChangeWeponAtackMin">
              <option v-for="atack in atacks.concat().reverse()" :value="atack">{{Math.floor(atack * wepon_magnification) }}</option>
            </select>
            ～
            <select name="wep_atk_min" type="number" @change.prevent="onChangeWeponAtackMax">
              <option v-for="atack in atacks" :value="atack">{{Math.floor(atack * wepon_magnification) }}</option>
            </select>
          </dd>
        </dl>
      </form>
      <div class="mainContent">
        <div class="sharp_list">
          <table>
            <thead>
              <th>基礎攻撃力 / 切れ味</th>
              <th>切れ味：緑</th>
              <th>切れ味：青</th>
              <th>切れ味：白</th>
            </thead>
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
      atacks: [ 250, 240, 230, 220, 210, 200, 190, 180, 170, 160, 150, 140, 130, 120, 110, 100, 90, 80],
      sharp: sharp,
      sharp_table: [],
      critical_table: [],
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
