<template>
  <div class="wrapper page-buy">
  
  <mt-header title="购物车" fixed class="txt-black bg-white">
    <mt-button @click="changeStatus('1')" class="txt-black fs-14 txt-edit" slot="right" v-if="canEdit&&isShowList">编辑</mt-button>
    <mt-button @click="changeStatus('0')" class="txt-black fs-14 txt-edit" slot="right" v-if="!canEdit">取消</mt-button>
  </mt-header>

    <div class="lay-goods pb42 mt50" v-if="isShowList">
      <div class="items mb10 white pd15" v-for="(items,index) in goodsArr" :key="index">
        <div class="relative h40 pdl25 fs-13">
        <input type="checkbox" class="check goods-check shoreCheck" @click="checkAll(items)" v-model="checkallList" :value="items.storeId" />{{ items.storeName }}
        </div>
        <div class="item pdl40" v-for="(item, index) in items.goodsBuyInfo" :key="index">
          <input type="checkbox" class="check goods-check goodsCheck" v-model="checked" :value="item.id"/>
        <div class="img-box">
          <img class="img" :src="item.img" />
        </div>
        <div class="info-box">
          <div class="title fs-12">
            {{ item.name }}
          </div>
          <div class="price-num">
            <span class="price fs-15">￥{{ item.price }}</span>
            <div class="change-num">
              <span class="rdu" @click="changeNum('rdu', item)">-</span>
              <span class="num">{{ item.num }}</span>
              <span class="add" @click="changeNum('add', item)">+</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

    <div class="lay-action fix-btom pay-act-btom fix-b50 justify-content-space-between" v-if="isShowList">
      <div class="relative h40 pdl40">
        <input type="checkbox" class="ml15 check goods-check shopCheck" v-model="allSelect" @click="totalSelect"/>全选
        </div>
      <div class="price-info flex1" v-if="canEdit">
        <span class="tag">合计：</span>
        <span class="total" v-model="num">￥{{ totalPrice }}</span>
      </div>
      <button v-if="canEdit" class="btn-submit per30" @click="makeOrder">去结算</button>
      <button v-if="!canEdit" class="btn-submit per30" @click="deleteCart">删除</button>
    </div>
    <v-nodata v-if="!isShowList" bgcolor="grey" text="- 购物车空空如也 -" />
    <v-footer active="goodsCart"/>
  </div>
</template>

<script>
// 购物车
import { mapState } from "vuex";
import { Toast, Header } from "mint-ui";
import vFooter from "@/components/v-footer";
import vNodata from "@/components/v-nodata";
const qs = require("qs");
export default {
  data() {
    return {
      canEdit: true,
      list: [],
      allSelect: false,
      checkallList: [],
      checked: [],
      price:0,
      count:0,
      isShowList: false,
      goodsCarts:[],
      payPrice: 0,
      userCouponIds: [],
      goodsChannel: 1,
      isUseIntegral:0,
      num: '',
      id: this.getUrlParam("id"),
      showAddress: null,
     // goodsBuyInfo: [],
      goodsArr: [],
      goodsTips: "",
      uuid:''
    };
  },
  components: { 
    'v-footer': vFooter,
    "v-nodata": vNodata
  },
  computed: {
    ...mapState(["token"]),
    // 总价计算
    totalPrice() {
        this.payPrice = 0;
        for(let i of this.goodsArr){
          for(let k of i.goodsBuyInfo){
            if(this.checked.length>0){
              for(let j of this.checked){
                if(j==k.id){
                  this.payPrice += Number(k.price) * Number(k.num);
                }
              }
            }else{
              this.payPrice = 0;
            }
          }
        }
        return this.payPrice
    }
  },
  beforeCreate(){
    document.title = '购物车';
  },
  created() {
    this.getCartList();
  },
  watch: {
    checked(val, oldVal){
      console.log(val, oldVal);
      this.checkallList = this.uniq(this.checkallList);
      for(let i of this.goodsArr){
        let num = 0;
        for(let k of i.goodsBuyInfo){
          if(val.indexOf(k.id)>-1){
            console.log('包含:'+k.id);
             num++;
            if(num==i.goodsBuyInfo.length){
              this.checkallList.push(i.storeId);
            }
          }else{
            console.log('不包含:'+k.id);
            if(oldVal.indexOf(k.id)>-1){
              this.checkallList.splice(this.checkallList.indexOf(i.storeId),1);
            }
          }
        }
      }
      
      if(this.uniq(this.checkallList).length==this.goodsArr.length){
        this.allSelect = true
      }else{
        this.allSelect = false
      }

    }
  },
  methods: {
    deleteCart(){
      if(this.checked.length == 0){
        this.showTip("请选择商品");
      }else{
        console.log(this.checked.join(','));
        this.$axios
        .get(this.api.deleteGoods+this.checked.join(','),{
          headers: {"Authorization": this.token , "content-type": "application/json"}
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("未获取到商品信息");
            return;
          }else{
            this.showTip("删除成功");
            this.canEdit = true;
            this.goodsArr = [];
            this.getCartList();
          }
        })
        .catch(res => {
         // this.showTip("未获取到商品信息");
        });
      }
    },
    changeStatus(obj){
      console.log(0);
      if(obj=='1'){
        this.canEdit = false;
      }else{
        this.canEdit = true;
      }
    },
    totalSelect(){
      console.log(this.allSelect)
      if(this.allSelect){
        this.checkallList = [];
        this.checked = [];
      }else{
        this.checkallList = [];
        this.checked = [];
        for (let i of this.goodsArr){
          this.checkallList.push(i.storeId);
          for (let j of i.goodsBuyInfo){
            this.checked.push(j.id);
          }
        }
      }
    },
    checkAll(items) {
      this.checkallList = this.uniq(this.checkallList);

      if(this.checkallList.indexOf(items.storeId)>-1){//存在
        this.checkallList.splice(this.checkallList.indexOf(items.storeId),1);
        for (let j of items.goodsBuyInfo){
          if(this.checked.indexOf(j.id) > -1){
            this.checked.splice(this.checked.indexOf(j.id), 1);
          }
        }
      }else{//不存在
        this.checkallList.push(items.storeId);
        for (let k of items.goodsBuyInfo){
          this.checked.push(k.id);
        }
      }
      
      if (this.checkallList.length == this.goodsArr.length) {
        this.allSelect = true;
      }else{
        this.allSelect = false;
      }
    },
    getCartList(){
      this.$axios
        .get(this.api.getCartList,{
          headers: {"Authorization": this.token , "content-type": "application/json"}
        })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 1) {
            // this.showTip("未获取到商品信息");
            return;
          }else{
            console.log(resData);
            // 成功后赋值商品对象，并存进数组
            if(resData.content.length>0){
              this.isShowList = true;
              const objData = resData.content;
              for( let items of objData){
                let goodsBuyInfo = [];
                for( let item of items.goodsCarts){
                  let objGoodsData = {
                  'id':item.id,
                  'goodsId': item.goodsId,
                  'num': item.goodsCount,
                  'name': item.goodsName,
                  'price': item.price,
                  'img': this.api.urlPic+item.goodsPhoto.split(',')[0]
                  }
                  goodsBuyInfo.push(objGoodsData);
                }
                let itemInfo = {
                  'storeId':items.storeId,
                  'storeName': items.storeName,
                  "goodsBuyInfo":goodsBuyInfo
                }
               this.goodsArr.push(itemInfo)
              }
              console.log('21');
              console.log(this.goodsArr);
            }else{
              this.isShowList = false;
            }
          }
        })
        .catch(res => {
         // this.showTip("未获取到商品信息");
        });
    },
    // 改变数量
    changeNum(type, item) {
      if (type === "add") {
        item.num += 1;
      } else if (item.num >= 2) {
        item.num -= 1;
      }else{
        item.num = 1;
        this.showTip("亲，不能再减少了哦");
        return;
      }
      this.$axios
        .post(
          this.api.goodsCartUpdate,
          JSON.stringify({
           'goodsCount': item.num,
           'goodsId': item.goodsId,
           'id': item.id
          }),
          {
            headers: {
              "content-type": "application/json",
              "Authorization": this.token
            }
          }
        )
        .then(res => {
          console.log(res);
          const resData = res.data;
          if (resData.code !== 1) {
            this.showTip("修改数量失败");
            return;
          }
          this.showTip("修改数量成功");
        })
        .catch(res => {
          this.showTip("修改数量失败");
        });
    },
    // 结算下单
    makeOrder() {
      // 组合下单数据
      if (this.checked.length === 0) {
        this.showTip("请选择商品");
        return;
      }
      console.log(this.checked);
      let selectArr = [];
      for (let i of this.goodsArr){
        for (let j of i.goodsBuyInfo){
          if(this.checked.indexOf(j.id)>-1){
            selectArr.push(j);
          }
        }
      }
      this.$router.push({name:'cart', params: { selectArr: selectArr}});
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/pay-act-btom';
@import '../../assets/css/media';
@import '../../assets/css/buy';
</style>
