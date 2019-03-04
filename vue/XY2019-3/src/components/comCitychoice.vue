<template>
  <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<section class="cityChoiceBox" id="cityChoiceBox" v-if='boxShow'>
			<article class="cityChoice-top transit" v-bind:class='{focus:isCancel}'>
				<transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
					<span class="mintui mintui-back" v-if='!isCancel' v-on:click='cityFun'></span>
				</transition>
				<input type="text" class="search-input" placeholder="中文/拼音/首写字母" v-model.trim='ssval' v-on:focus='search' />
				<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
					<i v-if='isCancel' v-on:click='isCancel=false' class="cancel">取消</i>
				</transition>
			</article>
			<article class="city-Box" v-show='!isCancel'>
				<div class="city-sidaber" id="city-sidaber" v-show='!isCancel'>
					<p v-for="(sidaber,index) in sidabers" v-on:touchstart='mousedownFun(index)' v-on:touchend='mouseupFun(index)' v-text='sidaber'></p>
				</div>
				<div class="host-city">
					<h3>热门城</h3>
					<span v-for='(item,index) in hostCitys' v-text='item.split("|")[0]' v-on:click='cityactive(index,hostCitys)'></span>
				</div>
				<div class="city-content">
					<h3>A</h3>
					<p v-for='(item,index) in cityA'><i v-on:click='cityactive(index,cityA)'>{{item.split('|')[0]}}</i></p>
					<h3>B</h3>
					<p v-for='(item,index) in cityB'><i v-on:click='cityactive(index,cityB)'>{{item.split('|')[0]}}</i></p>
					<h3>C</h3>
					<p v-for='(item,index) in cityC'><i v-on:click='cityactive(index,cityC)'>{{item.split('|')[0]}}</i></p>
					<h3>D</h3>
					<p v-for='(item,index) in cityD'><i v-on:click='cityactive(index,cityD)'>{{item.split('|')[0]}}</i></p>
					<h3>E</h3>
					<p v-for='(item,index) in cityE'><i v-on:click='cityactive(index,cityE)'>{{item.split('|')[0]}}</i></p>
					<h3>F</h3>
					<p v-for='(item,index) in cityF'><i v-on:click='cityactive(index,cityF)'>{{item.split('|')[0]}}</i></p>
					<h3>G</h3>
					<p v-for='(item,index) in cityG'><i v-on:click='cityactive(index,cityG)'>{{item.split('|')[0]}}</i></p>
					<h3>H</h3>
					<p v-for='(item,index) in cityH'><i v-on:click='cityactive(index,cityH)'>{{item.split('|')[0]}}</i></p>
					<h3>J</h3>
					<p v-for='(item,index) in cityJ'><i v-on:click='cityactive(index,cityJ)'>{{item.split('|')[0]}}</i></p>
					<h3>K</h3>
					<p v-for='(item,index) in cityK'><i v-on:click='cityactive(index,cityK)'>{{item.split('|')[0]}}</i></p>
					<h3>L</h3>
					<p v-for='(item,index) in cityL'><i v-on:click='cityactive(index,cityL)'>{{item.split('|')[0]}}</i></p>
					<h3>M</h3>
					<p v-for='(item,index) in cityM'><i v-on:click='cityactive(index,cityM)'>{{item.split('|')[0]}}</i></p>
					<h3>N</h3>
					<p v-for='(item,index) in cityN'><i v-on:click='cityactive(index,cityN)'>{{item.split('|')[0]}}</i></p>
					<h3>P</h3>
					<p v-for='(item,index) in cityP'><i v-on:click='cityactive(index,cityP)'>{{item.split('|')[0]}}</i></p>
					<h3>Q</h3>
					<p v-for='(item,index) in cityQ'><i v-on:click='cityactive(index,cityQ)'>{{item.split('|')[0]}}</i></p>
					<h3>R</h3>
					<p v-for='(item,index) in cityR'><i v-on:click='cityactive(index,cityR)'>{{item.split('|')[0]}}</i></p>
					<h3>S</h3>
					<p v-for='(item,index) in cityS'><i v-on:click='cityactive(index,cityS)'>{{item.split('|')[0]}}</i></p>
					<h3>T</h3>
					<p v-for='(item,index) in cityT'><i v-on:click='cityactive(index,cityT)'>{{item.split('|')[0]}}</i></p>
					<h3>W</h3>
					<p v-for='(item,index) in cityW'><i v-on:click='cityactive(index,cityW)'>{{item.split('|')[0]}}</i></p>
					<h3>X</h3>
					<p v-for='(item,index) in cityX'><i v-on:click='cityactive(index,cityX)'>{{item.split('|')[0]}}</i></p>
					<h3>Y</h3>
					<p v-for='(item,index) in cityY'><i v-on:click='cityactive(index,cityY)'>{{item.split('|')[0]}}</i></p>
					<h3>Z</h3>
					<p v-for='(item,index) in cityZ'><i v-on:click='cityactive(index,cityZ)'>{{item.split('|')[0]}}</i></p>
				</div>
				<div v-show='zimShow' class="zimShow" v-text='zimText'></div>
			</article>
			<article class="search-box" id="search-box" v-show='isCancel'>
				<p class="sousuo" v-for='(item,index) in sousuos' v-on:click='cityactive(index,sousuos)'>{{item.split('|')[0]}}</p>
			</article>
		</section>
	</transition>
</template>
<script>
export default {
   data() {
      return{
		boxShow:false,
		isCancel:false,
		zimShow:false,
		ssval:'',
		zimText:'',
		sidabers:['热门','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'],
        citys:['北京|beijing|bj','上海|shanghai|sh','广州|guangzhou|gz','深圳|shenzhen|sz','南京|nanjing|nj','杭州|hangzhou|hz','天津|tianjin|tj','重庆|chongqing|cq','成都|chengdu|cd','青岛|qingdao|qd','苏州|shuzhou|sz','无锡|wuxi|wx','常州|changzhou|cz','温州|wenzhou|wz','武汉|wuhan|wh','长沙|changsha|cs','石家庄|shijiazhuang|sjz','南昌|nanchang|nc','三亚|sanya|sy','合肥|hefei|hf','郑州|zhengzhou|zz','保定|baoding|bd','唐山|tangshan|ts','秦皇岛|qinhuangdao|qhd','邯郸|handan|hd','邢台|xingtai|xt','张家口|zhangjiakou|zjk','承德|chengde|cd','衡水|hengshui|hs','廊坊|langfang|lf','沧州|cangzhou|cz','太原|taiyuan|ty','大同|datong|dt','阳泉|yangquan|yq','长治|changzhi|cz','晋城|jincheng|jc','朔州|shuozhou|sz','晋中|jinzhong|jz','运城|yuncheng|yc','忻州|xinzhou|xz','临汾|linfen|lf','吕梁|lvliang|ll','呼和浩特|huhehaote|hhht','包头|baotou|bt','乌海|wuhai|wh','赤峰|chifeng|cf','通辽|tongliao|tl','鄂尔多斯|eerduosi|eeds','呼伦贝尔|hulunbeier|hlbe','巴彦淖尔|bayannaoer|byne','乌兰察布|wulanchabu|wlcb','兴安盟|xinganmeng|xam','锡林郭勒盟|xilinguolemeng|xlglm','阿拉善盟|alashanmeng|alsm','沈阳|shenyang|sy','大连|dalian|dl','鞍山|anshan|as','抚顺|fushun|fs','本溪|benxi|bx','丹东|dandong|dd','锦州|jinzhou|jz','营口|yingkou|yk','阜新|fuxin|fx','辽阳|liaoyang|ly','盘锦|panjin|pj','铁岭|tieling|tl','朝阳|chaoyang|cy','葫芦岛|huludao|hld','长春|changchun|cc','吉林|jilin|jl','四平|siping|sp','辽源|liaoyuan|ly','通化|tonghua|th','白山|baishan|bs','松原|songyuan|sy','白城|baicheng|bc','延边朝鲜族自治州|ybcxzzzz|ybcxzzzz','哈尔滨|haerbin|heb','齐齐哈尔|qiqihaer|qqhe','鸡西|jixi|jx','鹤岗|hegang|hg','双鸭山|shuangyashan|sys','大庆|daqing|dq','伊春|yichun|yc','佳木斯|jiamusi|jms','七台河|qitaihe|qth','牡丹江|mudanjiang|mdj','黑河|heihe|hh','绥化|suihua|sh','大兴安岭|daxinganling|dxaldq','徐州|xuzhou|xz','南通|nantong|nt','连云港|lianyungang|lyg','淮安|huaian|ha','盐城|yancheng|yc','扬州|yangzhou|yz','镇江|zhenjiang|zj','泰州|taizhou|tz','宿迁|suqian|sq','宁波|ningbo|nb','嘉兴|jiaxing|jx','湖州|huzhou|hz','绍兴|shaoxing|sx','舟山|zhoushan|zs','衢州|quzhou|qz','金华|jinhua|jh','台州|taizhou|tz','丽水|lishui|ls','芜湖|wuhu|wh','蚌埠|bengbu|bb','淮南|huainan|hn','马鞍山|maanshan|mas','淮北|huaibei|hb','铜陵|tongling|tl','安庆|anqing|aq','黄山|huangshan|hs','滁州|chuzhou|cz','阜阳|fuyang|fy','宿州|suzhou|sz','巢湖|chaohu|ch','六安|luan|la','亳州|bozhou|bz','池州|chizhou|cz','宣城|xuancheng|xc','福州|fuzhou|fz','厦门|xiamen|xm','莆田|putian|pt','三明|sanming|sm','泉州|quanzhou|qz','漳州|zhangzhou|zz','南平|nanping|np','龙岩|longyan|ly','宁德|ningde|nd','景德镇|jingdezhen|jdz','萍乡|pingxiang|px','九江|jiujiang|jj','新余|xinyu|xy','鹰潭|yingtan|yt','赣州|ganzhou|gz','吉安|jian|ja','宜春|yichun|yc','抚州|fuzhou|fz','上饶|shangrao|sr','济南|jinan|jn','淄博|zibo|zb','枣庄|zaozhuang|zz','东营|dongying|dy','烟台|yantai|yt','潍坊|weifang|wf','济宁|jining|jn','泰安|taian|ta','威海|weihai|wh','日照|rizhao|rz','莱芜|laiwu|lw','临沂|linyi|ly','德州|dezhou|dz','聊城|liaocheng|lc','滨州|binzhou|bz','菏泽|heze|hz','开封|kaifeng|kf','洛阳|luoyang|ly','平顶山|pingdingshan|pds','安阳|anyang|ay','鹤壁|hebi|hb','新乡|xinxiang|xx','焦作|jiaozuo|jz','濮阳|puyang|py','许昌|xuchang|xc','漯河|luohe|lh','三门峡|sanmenxia|smx','南阳|nanyang|ny','商丘|shangqiu|sq','信阳|xinyang|xy','周口|zhoukou|zk','驻马店|zhumadian|zmd','济源|jiyuan|jiyuan','黄石|huangshi|hs','十堰|shiyan|sy','宜昌|yichang|yc','襄樊|xiangfan|xf','鄂州|ezhou|ez','荆门|jingmen|jm','孝感|xiaogan|xg','荆州|jingzhou|jz','黄冈|huanggang|hg','咸宁|xianning|xn','随州|suizhou|sz','恩施土家族苗族自治州|estjzmzzzz|estjzmzzzz','仙桃|xiantao|xt','潜江|qianjiang|qj','天门|tianmen|tm','神农架林区|shennongjia|snjlq','株洲|zhuzhou|zz','湘潭|xiangtan|xt','衡阳|hengyang|hy','邵阳|shaoyang|sy','岳阳|yueyang|yy','常德|changde|cd','张家界|zhangjiajie|zjj','益阳|yiyang|yy','郴州|chenzhou|cz','永州|yongzhou|yz','怀化|huaihua|hh','娄底|loudi|ld','湘西土家族苗族自治州|xxtjzmzzzz|xxtjzmzzzz','韶关|shaoguan|sg','珠海|zhuhai|zh','汕头|shantou|st','佛山|foushan|fs','江门|jiangmen|jm','湛江|zhanjiang|jz','茂名|maoming|mm','肇庆|zhaoqing|zq','惠州|huizhou|hz','梅州|meizhou|mz','汕尾|shanwei|sw','河源|heyuan|hy','阳江|yangjiang|yj','清远|qingyuan|qy','东莞|dongguan|dg','中山|zhongshan|zs','潮州|chaozhou|cz','揭阳|jieyang|jy','云浮|yunfu|yf','南宁|nanning|nn','柳州|liuzhou|lz','桂林|guilin|gl','梧州|wuzhou|wz','北海|beihai|bh','防城港|fangchenggang|fcg','钦州|qinzhou|qz','贵港|guigang|gg','玉林|yulin|yl','百色|baise|bs','贺州|hezhou|hz','河池|hechi|hc','来宾|laibin|lb','崇左|chongzuo|cz','海口|haikou|hk','三亚|sanya|sy','五指山|wuzhishan|wzs','琼海|qionghai|qh','儋州|danzhou|dz','文昌|wenchang|wc','万宁|wanning|wn','东方|dongfang|df','定安县|dingan|da','屯昌县|tunchang|tc','澄迈县|chengmai|cm','临高县|lingao|lg','白沙黎族自治县|bsnzzzx|bsnzzzx','昌江黎族自治县|cjlzzzx|cjlzzzx','乐东黎族自治县|ldlzzzx|ldlzzzx','陵水黎族自治县|lingshui|ls','保亭黎族苗族自治县|btlzmzzzx|btlzmzzzx','琼中黎族苗族自治县|qzlzmzzzx|qzlzmzzzx','西沙群岛|xishaqundao|xsqd','南沙群岛|nanshaqundao|nsqd','中沙群岛的岛礁及其海域|zhongshaqundao|zsqd','自贡|zigong|zg','攀枝花|panzhihua|pzh','泸州|luzhou|lz','德阳|deyang|dy','绵阳|mianyang|my','广元|guangyuan|gy','遂宁|suining|sn','内江|neijiang|nj','乐山|leshan|ls','南充|nanchong|nc','眉山|meishan|ms','宜宾|yibin|yb','广安|guangan|ga','达州|dazhou|dz','雅安|yaan|ya','巴中|bazhong|bz','资阳|ziyang|zy','阿坝藏族羌族自治州|abzzqzzzz|abzzqzzzz','甘孜藏族自治州|gzzzzzz|gzzzzzz','凉山彝族自治州|lsyzzzz|lsyzzzz','贵阳|guiyang|gy','六盘水|liupanshui|lps','遵义|zunyi|zy','安顺|anshun|as','铜仁|tongren|tr','黔西南布依族苗族自治州|qxnbyzmzzzz|qxnbyzmzzzz','毕节|bijie|bj','黔东南苗族侗族自治州|qdnmzdzzzz|qdnmzdzzzz','黔南布依族苗族自治州|qnbyzmzzzz|qnbyzmzzzz','昆明|kunming|km','曲靖|qujing|qj','玉溪|yuxi|yx','保山|baoshan|bs','昭通|zhaotong|zt','丽江|lijiang|lj','思茅|simao|sm','临沧|lincang|lc','楚雄彝族自治州|cxyzzzz|cxyzzzz','红河哈尼族彝族自治州|hhhnzyzzzz|hhhnzyzzzz','文山壮族苗族自治州|wszzmzzzz|wszzmzzzz','西双版纳傣族自治州|xsbndzzzz|xsbndzzzz','大理白族自治州|dlbzzzz|dlbzzzz','德宏傣族景颇族自治州|dhdzjpzzzz|dhdzjpzzzz','怒江傈僳族自治州|njlszzzz|njlszzzz','迪庆藏族自治州|dqzzzzz|dqzzzzz','拉萨|lasa|ls','昌都|changdudiqu|cd','山南|shannandiqu|sndq','日喀则|rikazediqu|rkzdq','那曲|naqudiqu|nqdq','阿里|alidiqu|aldq','林芝|linzhidiqu|lzdq','西安|xian|xa','铜川|tongchuan|tc','宝鸡|baoji|bj','咸阳|xianyang|xy','渭南|weinan|wn','延安|yanan|ya','汉中|hanzhong|hz','榆林|yulin|yl','安康|ankang|ak','商洛|shangluo|sl','兰州|lanzhou|lz','嘉峪关|jiayuguan|jyg','金昌|jinchang|jc','白银|baiyin|by','天水|tianshui|ts','武威|wuwei|ww','张掖|zhangye|zy','平凉|pingliang|pl','酒泉|jiuquan|jq','庆阳|qingyang|qy','定西|dingxi|dx','陇南|longnan|ln','临夏回族自治州|lxhzzzz|lxhzzzz','甘南藏族自治州|gnzzzzz|gnzzzzz','西宁|xining|xn','海东|haidongdiqu|hddq','海北藏族自治州|hbzzzzz|hbzzzzz','黄南藏族自治州|hnzzzzz|hnzzzzz','海南藏族自治州|hnzzzzz|hnzzzzz','果洛藏族自治州|glzzzzz|hlzzzzz','玉树藏族自治州|yszzzzz|yszzzzz','海西蒙古族藏族自治州|hxmgzzzzzz|hxmgzzzzzz','银川|yinchuan|yc','石嘴山|shizuishan|szs','吴忠|wuzhong|wz','固原|guyuan|gy','中卫|zhongwei|zw','乌鲁木齐|wulumuqi|wlmq','克拉玛依|kelamayi|klmy','吐鲁番|tulufandiqu|tlfdq','哈密|hamidiqu|hmdq','昌吉回族自治州|cjhzzzz|cjhzzzz','博尔塔拉蒙古自治州|betlmgzzz|betlmgzzz','巴音郭楞蒙古自治州|byglmgzzz|byglmgzzz','阿克苏|akesudiqu|aksdq','克孜勒苏柯尔克孜自治州|kzlskekzzzz|kzlskekzzzz','喀什|kashidiqu|ksdq','和田|hetian|ht','伊犁哈萨克自治州|ylhskzzz|ylhskzzz','塔城|tachengdiqu|tcdq','阿勒泰|aletaidiqu|altdq','石河子|shihezi|shz','阿拉尔|alaer|ale','图木舒克|tumushuke|tmsk','五家渠|wujiaqu|wjq','台北|taibei|tb','高雄|gaoxiong|gx','基隆|jilong|jl','台中|taizhong|tz','台南|tainan|tn','新竹|xinzhu|xz','嘉义|jiayi|jy','台北县|taibeixian|tbx','宜兰县|yilanxian|ylx','桃园县|taoyuanxian|tyx','新竹县|xinzhuxian|xzx','苗栗县|miaolixian|mlx','台中县|taizhongxian|tzx','彰化县|zhanghuaxian|zhx','南投县|nantouxian|ntx','云林县|yunlinxian|ylx','嘉义县|jiayixian|jyx','台南县|tainanxian|tnx','高雄县|gaoxiongxian|gxx','屏东县|pingdongxian|pdx','澎湖县|penghuxian|phx','台东县|taidongxian|tdx','花莲县|hualianxian|hlx','中西区|zhongxiqu|zxq','东区|dongqu|dq','九龙城区|jiulongchengqu|jlcq','观塘区|guantangqu|gtq','南区|nanqu|nq','深水埗区|shenshuibuqu|ssbq','黄大仙区|huangdaxianqu|hdxq','湾仔区|wanzaiqu|wzq','油尖旺区|youjianwangqu|yjwq','离岛区|lidaoqu|ldq','葵青区|kuiqingqu|kqq','北区|beiqu|bq','西贡区|xigongqu|xgq','沙田区|shatianqu|stq','屯门区|tunmenqu|tmq','大埔区|dabuqu|dbq','荃湾区|quanwanqu|qwq','元朗区|yuanlangqu|ylq','花地玛堂区|huadimatangqu|hdmtq','圣安多尼堂区|shenganduonitangqu|sadntq','大堂区|datangqu|dtq','望德堂区|wangdetangqu|wdtq','风顺堂区|fengshuntangqu|fstq','嘉模堂区|jiamotangqu|jmtq','圣方济各堂区|shengfangjigetangqu|sfjgtq'],
	    hostCitys:[]
	}
  },
  methods:{
		cityFun(){
			this.boxShow=!this.boxShow;
		},
		search(){
			this.isCancel=true;
			document.documentElement.scrollTop=0;
		},
	    hostCityss(){
	    	this.hostCitys = [
	    	'上海|shanghai|sh',
	    	'北京|beijing|bj',
	    	'杭州|hangzhou|hz',
	    	'广州|guangzhou|gz',
            '成都|chengdu|cd',
	    	'重庆|chongqing|cq',
	    	'南京|nanjing|nj',
	    	'天津|tianjin|tj',
	    	'深圳|shenzhen|sz',
	    	'厦门|xiamen|xm',
            '武汉|wuhan|wh',
	    	'西安|xian|xn'
	    	]
		},
		cityactive(index,cityss){
			this.boxShow=!this.boxShow;
			this.zimShow=false;
			this.$emit("tochildevent",cityss[index].split('|')[0])
		},
		mousedownFun(index){
			this.zimShow=!this.zimShow;
			this.zimText=this.sidabers[index]
		},
		mouseupFun(index){
			this.zimShow=!this.zimShow;
			var cityChoiceBox=document.getElementById('cityChoiceBox');
			var h3=cityChoiceBox.getElementsByTagName('h3');
			var timer=null;
			function scrT(iTarget){
				clearInterval(timer);
				document.ontouchstart=function(){
					clearInterval(timer);
				}
                timer=setInterval(function(){
	              var scrollT=document.documentElement.scrollTop||document.body.scrollTop,speed=0;
	              speed=Math.floor((iTarget-scrollT)/5);
	              if(scrollT==iTarget){
	              	clearInterval(timer);
	              }else{
	              	document.documentElement.scrollTop=scrollT+speed;
	              	document.body.scrollTop=scrollT+speed;
	              }
	          },30);
            }
          scrT(h3[index].offsetTop-50);
      }
  },
  computed:{
  	cityA(){
  		return this.citys.filter(function(item){
            return item.split('|')[1].substr(0,1)=='a';
  			//return item.py.substr(0,1)=='a';
  		});
  	},
  	cityB(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='b';
  		});
  	},
  	cityC(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='c';
  		});
  	},
  	cityD(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='d';
  		});
  	},
  	cityE(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='e';
  		});
  	},
  	cityF(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='f';
  		});
  	},
  	cityG(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='g';
  		});
  	},
  	cityH(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='h';
  		});
  	},
  	cityJ(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='j';
  		});
  	},
  	cityK(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='k';
  		});
  	},
  	cityL(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='l';
  		});
  	},
  	cityM(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='m';
  		});
  	},
  	cityN(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='n';
  		});
  	},
  	cityP(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='p';
  		});
  	},
  	cityQ(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='q';
  		});
  	},
  	cityR(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='r';
  		});
  	},
  	cityS(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='s';
  		});
  	},
  	cityT(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='t';
  		});
  	},
  	cityW(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='w';
  		});
  	},
  	cityX(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='x';
  		});
  	},
  	cityY(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='y';
  		});
  	},
  	cityZ(){
  		return this.citys.filter(function(item){
  			return item.split('|')[1].substr(0,1)=='z';
  		});
  	},
  	sousuos(){
  		var ssval=this.ssval;
  		return this.citys.filter(function(item){
  			return item.split('|')[1].indexOf(ssval)!=-1||item.split('|')[0].indexOf(ssval)!=-1||item.split('|')[2].indexOf(ssval)!=-1;
  		});
  	}
  },
  mounted(){
  	this.hostCityss();
  }
};
</script>

	