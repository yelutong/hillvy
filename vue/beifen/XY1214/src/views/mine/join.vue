<template>
  <div class="wrapper white page-join">
    <div class="lay-info">
      <div class="v-cell-box info-type">
        <div class="lay-cell">
          <div class="tit">入驻类型</div>
          <div class="con">
            <div class="item" :class="{checked:item.checked}" v-for="(item, index) in joinType" :key="index" @click="choseJoinType(item)">
              <i class="i-cks" :class="{checked:item.checked}"></i>{{ item.title }}
            </div>
          </div>
        </div>
      </div>
      <v-cell type="input" title="联系电话" place="联系人手机号码" pro="phone" :iptCon="joinData.phone" @iptChange="changeData"></v-cell>
      <v-cell type="region" title="城 市" pro="city" :address="joinData.city" @iptChange="changeData"></v-cell>
      <v-cell type="input" title="详细地址" place="街道/小区/楼栋/序号" pro="adres" :iptCon="joinData.adres" @iptChange="changeData"></v-cell>
      <v-cell type="input" title="身份证号" place="身份证号码" pro="uidcode" :iptCon="joinData.uidcode" @iptChange="changeData"></v-cell>
      <div class="info-uid">
        <span class="tit">身份证</span>
        <div class="con">
          <div class="item" v-for="(item, index) in uidList" :key="index">
            <div class="add-box">
              <img class="img" v-if="item.img" :src="item.img" mode="scaleToFill" @click="delUidImg(item)" />
              <vue-core-image-upload v-else class="add" :crop="false" text="+" inputAccept="image/*" @imageuploaded="choseUidImg($event, index)"
                :credentials="false" :max-file-size="10485760" :multiple="false" inputOfFile="Filedata" :url="api.uploadImages"
                :headers="{access_token:token}">
              </vue-core-image-upload>
            </div>
            <div class="txt">{{ item.txt }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="lay-action fix-btom">
      <button class="btn-submit nordu" @click="submitJoin">提 交</button>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import {
    Toast
  } from "mint-ui";
  import VueCoreImageUpload from "vue-core-image-upload";
  import vCell from "@/components/v-cell";
  const qs = require("qs");
  export default {
    data() {
      return {
        joinType: [{
            title: "服务点",
            type: 2,
            checked: true
          },
          {
            title: "服务商",
            type: 3,
            checked: false
          }
        ],
        uidList: [{
            txt: "正面",
            img: "",
            imgId: ""
          },
          {
            txt: "反面",
            img: "",
            imgId: ""
          }
        ],
        joinData: {
          upgrade_type: 2,
          phone: "",
          city: [],
          adres: "",
          uidcode: "",
          positive_card_id: "",
          reverse_card_id: ""
        }
      };
    },
    components: {
      "v-cell": vCell,
      "vue-core-image-upload": VueCoreImageUpload
    },
    computed: {
      ...mapState(["token"])
    },
    methods: {
      // 父子通信
      changeData(data) {
        this.joinData[data.pro] = data.value;
      },
      // 选择切换服务类型
      choseJoinType(item) {
        if (!item.checked) {
          const joinType = this.joinType;
          joinType.forEach(val => {
            val.checked = false;
          });
          item.checked = true;
          this.joinData.upgrade_type = item.type;
        }
      },
      // 选择上传身份证照片
      choseUidImg(data, index) {
        const uidList = this.uidList;
        if (data.code !== 100 || !data.data || data.data.length === 0) {
          this.showTip("上传失败，请重试");
          return;
        }
        const arrData = data.data;
        uidList[index].img = arrData[0].imagePath;
        uidList[index].imgId = arrData[0].imgId;
      },
      // 删除身份证照片
      delUidImg(item) {
        item.img = "";
        item.imgId = "";
      },
      // 提交申请
      submitJoin() {
        const joinData = this.joinData;
        const uidList = this.uidList;
        // 检验数据先
        if (!joinData.upgrade_type) {
          this.showTip("请选择加入的类型");
          return;
        }
        if (joinData.phone.length !== 11) {
          this.showTip("请输入正确的手机号码格式");
          return;
        }
        if (joinData.city.length === 0) {
          this.showTip("请选择省市区地址");
          return;
        }
        if (joinData.adres === "") {
          this.showTip("请填写详细收货地址");
          return;
        }
        if (joinData.uidcode.length !== 18) {
          this.showTip("请输入18位身份证号码");
          return;
        }
        const hasUidImg = uidList.every(val => {
          return !!val.img;
        });
        if (!hasUidImg) {
          this.showTip("请上传身份证的正、反两面图片");
          return;
        }
        // 校验通过后，先上传图片到服务器拿到图片id
        const loading = Toast({
          message: "提交中...",
          iconClass: "loading",
          duration: 10000
        });
        this.$axios.post(this.api.applyJoin, qs.stringify({
          upgrade_type: joinData.upgrade_type,
          mobile: joinData.phone,
          province_name: joinData.city[0],
          city_name: joinData.city[1],
          area_name: joinData.city[2],
          detail_address: joinData.adres,
          card_no: joinData.uidcode,
          positive_card_id: uidList[0].imgId,
          reverse_card_id: uidList[1].imgId
        }), {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            access_token: this.token
          },
        }).then(res => {
          loading.close();
          const resData = res.data;
          if (resData.code !== 100) {
            this.showTip(resData.message);
            return;
          }
          // 成功后跳转成功页面
          this.$router.replace('/mine/joinstatus?status=justapply');
        }).catch(res => {
          loading.close();
          this.showTip('提交失败，请重试');
        });
      }
    }
  };

</script>

<style lang="stylus">
  @import '../../assets/css/join';

</style>
