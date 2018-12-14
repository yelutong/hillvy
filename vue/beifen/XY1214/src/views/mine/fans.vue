<template>
  <div class="wrapper page-fans">
    <div class="lay-head white">
      <img class="img" src="https://pic.xjjxsd.cn/static/applet/fans-bg.png" />
    </div>
    <div class="lay-total white">
      <div class="item">
        <span class="tag">成功邀请好友数</span>
        <span class="num">{{ fansInfo.num }}</span>
      </div>
      <hr class="line" />
      <div class="item">
        <span class="tag">好友累计存入</span>
        <span class="num">{{ fansInfo.gold }}</span>
      </div>
    </div>
    <div class="lay-detail white">
      <div class="row hd">
        <span class="tag tag-1">名称</span>
        <span class="tag tag-2">电话</span>
        <span class="tag tag-3">活跃度</span>
        <span class="tag tag-4">分享时间</span>
      </div>
      <div class="row bd" v-for="(item, index) in fansInfo.arrFans " :key="index">
        <span class="tag tag-1">{{ item.name }}</span>
        <span class="tag tag-2">{{ item.phone }}</span>
        <span class="tag tag-3">
          <i class="ico i-lv" v-for="(im, dex) in item.level" :key="dex"></i>
        </span>
        <span class="tag tag-4">{{ item.date }}</span>
      </div>
    </div>
    <v-nodata v-if="noFans" bgcolor="grey" text="- 您还没有粉丝 -" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import vNodata from "@/components/v-nodata";
export default {
  data() {
    return {
      fansInfo: {
        num: 0,
        gold: "0.00",
        arrFans: []
      },
      noFans: false
    };
  },
  components: {
    "v-nodata": vNodata
  },
  computed: {
    ...mapState(["token"])
  },
  created() {
    // 获取我的粉丝数据
    this.getMyFans();
  },
  methods: {
    // 切割字符串变*号
    hideString(str, type) {
      str = str.toString();
      let len = str.length;
      if (type === "name") {
        if (len <= 1) {
          return str;
        } else if (len <= 2) {
          return str[0] + "*";
        } else {
          return str[0] + "*" + str[len - 1];
        }
      } else if (type === "phone") {
        let arr = [];
        str = str.split("");
        str.forEach((val, index) => {
          if (index >= 3 && index <= 6) {
            arr.push("*");
          } else {
            arr.push(val);
          }
        });
        return arr.join("");
      }
    },
    // 获取我的粉丝数据
    getMyFans() {
      this.$axios
        .get(this.api.getMyFans, { headers: { access_token: this.token } })
        .then(res => {
          const resData = res.data;
          if (resData.code !== 100 || !resData.data) {
            this.noFans = true;
            this.showTip("数据异常，请重试");
            return;
          }
          // 成功后对数据重组
          const objData = resData.data;
          const fansInfo = this.fansInfo;
          fansInfo.num = objData.fansCount;
          fansInfo.gold = objData.totalReward ? objData.totalReward : 0;
          let arr = [];
          if (!objData.fans || objData.fans.length === 0) {
            this.noFans = true;
          } else {
            this.noFans = false;
            objData.fans.forEach(val => {
              arr.push({
                name: this.hideString(val.name, "name"),
                phone: this.hideString(val.mobile, "phone"),
                level: +val.level,
                date: this.dateFormat(val.createDate, "YYYY-MM-DD")
              });
            });
          }
          fansInfo.arrFans = arr;
        })
        .catch(res => {
          this.noFans = true;
          this.showTip("获取我的粉丝信息失败");
        });
    }
  }
};
</script>

<style lang="stylus">
@import '../../assets/css/media';
@import '../../assets/css/fans';
</style>
