/**
 * Created by sf5 on 6/13/18.
 */

export default {
  install (Vue, options) {
    Vue.prototype.OCR = function (certType, callback) {


      function setOCR() {

        window.wx.chooseImage({
          count: 1, // 默认9，这里每次只处理一张照片
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            let localIds = res.localIds[0].toString();
            wx.getLocalImgData({
              localId: localIds, // 图片的localID
              success: function (res) {
                 let imgUrl = res.localData;
                 if(Vue.$UA.android){
                   imgUrl='data:image/jpeg/png;base64,'+imgUrl;
                 }

                Vue.$post('OCR100001', {certType:certType,certImg:imgUrl,isSave:"Y"}, function (data) {
                  callback.apply(this,data);

                }, function (data) {
                    console.log("OCR"+data);
                });

              }
            });
            // $scope.imgUrl = res.localIds[0];
            // console.log($scope.imgUrl);
            // $scope.$apply();
          }
        });
      }
    };
  }
}




let data = {
  certType: "",//	string	证件类型（营业执照：biz_licence,银行卡：bank_card,身份证：id_card）
  imgPath: "",//	string	如果请求参数为isSave=Y，则返回内网路径
  //营业执照：biz_licence的返回
  certNo: "",//	string	统一社会信用代码/注册号
  companyName: "",//	string	公司名称
  companyType: "",//	string	公司类型
  address: "",//	string	营业地址
  representive: "",//	string	法定代表人/出资人
  capital: "",//	string	注册资本
  foundDate: "",//	string	成立日期
  expireDate: "",//	string	营业期限
  orgType: "",//	string	组成形式（可能为空）
  businessScope: "",//	string	经营范围（可能为空）
  //银行卡：bank_card的返回
  bankName: "",//	string	银行名称
  cardNo: "",//	string	卡号
  cardName: "",//	string	卡名称
  cardType: "",//	string	卡类型
  validTerm: "",//	string	有效期
  //身份证：id_card的返回
  face: "",//	string	当前为哪一面（人像面：1，国徽面：2）
  //人像面返回
  idNo: "",//	string	身份证号
  name: "",//	string	姓名
  gender: "",//	string	性别（男：man,女：female）
  nationality: "",//	string	籍贯
  birthDate: "",//	string	地址
  //国徽面返回
  issued: "",//	string	发证机关
  valid: "",//	string	有效期（格式：yyyy.mm.dd-yyyy.mm.dd）
};
