<template>
  <div class="wrapper page-addresses">
    <vHeader title="地址管理"/>
    <div class="lay-adres mgt50">
      <div class="item" v-for="(item, index) in addressesList" :key="index">
        <div class="info" @click="selectAddress(item)">
          <div class="name-phone txt-black fs-14">{{ item.userName }} {{ item.phone }}</div>
          <div class="adres txt-gray mt5 fs-12">{{ item.areaInfo }} {{ item.address }}</div>
        </div>
        <div class="acts">
          <div class="act" @click="setAutoAddress(item)">
            <i class="ico i-cks" :class="{checked:item.isChecked===true}"></i>{{ item.isChecked===true?'默认地址':'设为默认' }}
          </div>
          <div class="act-box">
            <div class="act" @click="pageToAddEdit('edit', item.id)">
              <i class="ico i-edit"></i>编辑
            </div>
            <div class="act" @click="delAddress(item.id, index)">
              <i class="ico i-del"></i>删除
            </div>
          </div>

        </div>
      </div>
      <v-nodata v-if="noAddresses" bgcolor="grey" text="- 还没有收货地址 -" />
    </div>
    <div class="lay-action fix-btom">
      <button class="btn-submit nordu full-screen" @click="pageToAddEdit('add')">+ 添加新地址</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { MessageBox } from "mint-ui";
import vNodata from "@/components/v-nodata";
import vHeader from "@/components/v-header";
const qs = require("qs");
export default {
  data() {
    return {
      from: this.getUrlParam("from"),
      noAddresses: false,
      addressesList: []
    };
  },
  components: { "v-nodata": vNodata, vHeader },
  computed: {
    ...mapState(["token", "autoAddress", "choseAddress"])
  },
  beforeCreate() {
    document.title = "收货地址";
  },
  created() {
    this.verToken();
  },
  methods: {
    ...mapActions(["atnAutoAddress", "atnChoseAddress"]),
    verToken(){
     if(!this.token){
      this.showTip("登录超时，请重新登录");
      this.$router.push({path: "/mine/login"});
     }else{
      // 加载收货地址列表
      this.getAddressesList();
     }
    },
    // 获取所有地址
    getAddressesList() {
      this.$axios
        .get(this.api.getaddressList, { headers: {"Authorization": this.token } })
        .then(res => {
          const resData = res.data;
          console.log(resData);
          if ( resData.code !== 1 || resData.content.length === 0) {
            this.noAddresses = true;
            this.addressesList = [];
            return;
          }else{
           this.noAddresses = false;
           this.addressesList = resData.content;
           console.log(this.addressesList);
          }
        })
        .catch(res => {
          //this.noAddresses = true;
          //this.showTip("获取地址列表失败");
        });
    },
    // 设为默认地址 实际上用的更新地址的接口
    setAutoAddress(item) {
    console.log(item);
      if (item.isChecked===false) {
      let ajaxData = {
          userName: item.userName,
          phone: item.phone,
          areaId: item.areaId,
          address: item.address,
          areaInfo: item.areaInfo,
          isChecked: true,
          id: item.id
        };

    console.log(ajaxData);
        this.$axios
          .post(
            this.api.updateAddrData,
            JSON.stringify(ajaxData),
            {
               headers: {"Authorization": this.token , "content-type": "application/json"}
            }
          )
          .then(res => {
            const resData = res.data;
            if (resData.code !== 1) {
              this.showTip("设置失败，请重试");
              return;
            }
            // 设置完毕重刷一遍列表，并且更改默认地址缓存
            this.atnAutoAddress(item);
            this.getAddressesList();
          })
          .catch(res => {
            this.showTip("设置失败，请重试");
          });
      }
    },
    // 新增||编辑收货地址
    pageToAddEdit(type, id) {
      this.$router.push(
        "/mine/address" + (type === "edit" ? "?addressId=" + id : "")
      );
    },
    // 删除收货地址
    delAddress(id, index) {
    console.log(id, index)
      MessageBox({
        title: "删除提示",
        message: "确定删除这条地址吗？",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          this.$axios
            .get(this.api.deleteAddr+id, {
              headers: { 'Authorization': this.token }
            })
            .then(res => {
              const resData = res.data;
              if (resData.code !== 1) {
                this.showTip("删除失败，请重试");
                return;
              }
              // 成功后去掉一项，并且判断是否为最后一条
              this.addressesList.splice(index, 1);
              if (this.addressesList.length === 0) {
                this.noAddresses = true;
                this.addressesList = [];
              }
              // 然后还要判断是不是删掉了点选的记录的那条，以防他直接返回
              const choseAddress = this.choseAddress;
              if (choseAddress && choseAddress.id === id) {
                this.atnChoseAddress(null);
              }
            })
            .catch(res => {
              this.showTip("删除失败，请重试");
            });
        }
      });
    },
    // 点选地址，带参数则返回商品下单页，不带参数则是从“我的地址”过来的，不用做操作
    selectAddress(item) {
      if (this.from === "goods") {
        // 设定手选地址的缓存
        this.atnChoseAddress(item);
        setTimeout(() => {
          this.$router.go(-1);
        }, 100);
      }
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/addresses';
</style>