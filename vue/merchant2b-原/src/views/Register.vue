<template>
  <div class="login">
    <base-header :title="title"></base-header>
    <div class="login-content bg-white">
      <flexbox align="center" class="vux-1px-b display-flex">
        <span class="common-bg-icon user-phone"></span>
        <x-input type="number" name="userphone" placeholder="请填写手机号" autocomplete="off"
                 v-on:input="judgebtnView" v-model.trim="userphone" class="fs-30"></x-input>
      </flexbox>
      <flexbox class="vux-1px-b display-flex" justify="space-between">
        <flexbox align="flex-start center" class="verbtn">
          <span class="common-bg-icon user-code"></span>
          <x-input type="text" name="verification" placeholder="短信验证码" autocomplete="off" v-on:input="judgebtnView"
                   v-model.trim="verification" class="fs-30">
            <x-button slot="right" type="primary" mini class='txt-blue fs-26' v-if="verCodeShow" @click.native="sndCode">获取验证码
            </x-button>
            <x-button v-else slot="right" type="primary" mini class='txt-gray'>
              <countdown v-model="time" :start="start" @on-finish="finish"></countdown>s
            </x-button>
          </x-input>
        </flexbox>
      </flexbox>
      <flexbox class="display-flex" justify="space-between">
        <flexbox align="flex-start center">
          <span class="common-bg-icon user-pwd"></span>
          <x-input :type="phoneType" name="password" placeholder="密码6~20位，数字、字母或符号" autocomplete="off" v-on:input="judgebtnView" v-model.trim="password" class="fs-30"></x-input>
        </flexbox>
        <span class="is-show-pwd common-bg-icon" @click="changeShow" :class="isShow"></span>
      </flexbox>
    </div>
    <div v-transfer-dom>
      <popup v-model="showAgree" position="right" should-scroll-top-on-show>
        <group>
          <cell value-align="left" class="register">
            <p class="fs-26 txt-center bold txt-black lh-48">顺丰金融用户服务协议(企业用户版)</p>
            <p class="fs-26 txt-black lh-36 bold mt20">重要提示：</p>
            <p class="fs-26 txt-black lh-36 bold mt20 indent">
              深圳市顺恒融丰投资有限公司（以下简称"顺丰金融"）依据本协议的规定为顺丰金融的企业用户提供服务。本协议在用户和顺丰金融之间具有合同上的法律效力。</p>
            <p class="fs-26 txt-black lh-40 bold mt20 indent">
              顺丰金融在此特别提醒贵司：在决定成为顺丰金融企业用户之前，请您认真阅读、充分理解本协议的各项条款，特别是其中所涉及的免除及限制顺丰金融责任的条款、对企业用户权利限制等条款后，再作出接受或不接受本协议的审慎决定。贵司必须在不加修改地无条件完全接受和认可本协议所包含的条款、条件（包括但不限于本协议的条款、条件以及顺丰金融已经发布或将来可能发布的各类规则、通知、公告、声明和风险提示等），并且遵守有关互联网及/或本平台的相关法律、规定与规则的前提下，才能成功注册成为顺丰金融企业用户，否则贵司无权使用顺丰金融于本协议下所提供的服务。如贵司不同意本协议的任何内容，请勿注册或使用顺丰金融。如贵司进入注册程序并勾选"我同意"按钮，即表示贵司已充分理解并完全接受本协议的所有内容。此后，贵司不得以未阅读本协议内容作任何形式的抗辩。</p>
            <p class="fs-26 txt-dark lh-40 mt20 indent">本协议一经企业用户点击"完成注册"按钮后，立即成立生效，本协议即构成贵司与顺丰金融之间合法有效的法律合同。</p>
            <p class="fs-26 txt-dark lh-40 mt20 indent">
              为了保障贵司的权益，贵司在自愿注册使用顺丰金融服务前，必须仔细阅读并充分理解知悉本协议所有条款。贵司一经注册或使用顺丰金融的服务，即视为对本协议全部条款已充分理解并完全接受，如有违反而导致任何法律后果的发生，贵司将以自身的名义独立承担相应的法律责任。</p>
            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第一章</b>定义及解释</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第一条</b>顺丰金融平台：指由顺丰金融运营的，名称为"顺丰金融"的公众号、移动互联网APP等由顺丰金融运营的各类互联网平台的统称，平台作为信息中介服务机构，为其实名注册的用户提供居间服务。顺丰金融平台与顺丰金融视为一个法律主体。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第二条</b>用户/平台用户：指通过企业用户的法定代表人身份及企业基本信息进行企业用户的身份实名验证，并通过顺丰金融在线签署《顺丰金融用户服务协议》后成功注册成为顺丰金融企业用户的具有完全民事行为能力的企业法人。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第三条</b>用户账户：除另有约定外，用户账户仅指平台用户与深圳市顺恒融丰投资有限公司开立的线上交易虚拟账户。</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第四条</b>本协议：指平台用户在注册成为本平台用户时与平台以在线点击确认方式签署的《顺丰金融用户服务协议》（包括对其做出的任何有效变更及补充）。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第五条</b>网络支付合作协议：指平台用户在申请使用顺手富服务时以在线点击确认方式签署的《顺丰恒通支付有限公司网络支付合作协议》（包括对其做出的任何有效变更及补充），以及在顺手富页面上已发布或将来可能发布的任何经平台公示生效的规范性文件（包括但不限于各类规则、通知、公告、声明等）。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第六条</b>中国法律：指中华人民共和国法律，为本协议之目的，不包括香港特别行政区、澳门特别行政区和台湾地区法律。</p>
            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第二章</b>顺丰金融服务的确认和接纳</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第七条</b>顺丰金融服务是由顺丰金融通过顺丰金融平台向用户提供的服务，具体服务内容主要包括：交易信息发布、提供交易管理服务、提供用户服务、支付结算等，详情以顺丰金融当时提供的服务内容为准。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第八条</b>本协议内容包括本协议全部条款（包括对其作出的任何有效变更及补充）及本平台已经发布的或将来可能发布的各类规则、通知、公告、声明。所有规则、通知、公告、声明为本协议不可分割的一部分，与本协议正文具有同等法律效力。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第九条</b>用户一经注册成功即视为用户同意本平台在将来任何时刻有权根据公司业务需求、互联网及互联网金融的发展或中国法律、法规的变化，不时地制定、修改用户服务条款或平台各类规则，并在平台上予以公布。顺丰金融特别提醒用户，在本协议履行过程中，顺丰金融可根据情况对本协议进行修改。一旦本协议的内容发生变动，顺丰金融将通过顺丰金融平台公布最新的协议，并不再向用户作个别通知。如果用户不同意顺丰金融对本协议所做的修改，用户有权停止使用顺丰金融服务。如果用户继续使用顺丰金融服务，则表明用户接受顺丰金融对本协议所做的修改，各方应遵照修改后的协议执行。用户的权利以及义务的表述，均以最新的服务条款为准。用户应不时地关注本协议及附属规则的变更。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第十条</b>本协议的效力范围及于顺丰金融的一切产品和服务，用户在享受顺丰金融任何单项服务时，应当接受本协议的约束。<b>为避免疑义，当用户使用顺丰金融各单项服务时，如顺丰金融或相关当事方要求用户需签署同意额外的协议、公告及/或规则（以下简称"单项协议"），用户应当以平台要求的方式签署单项协议后方可使用该单项服务。如本协议和单项协议存在任何不一致，或单项协议在本协议基础上约定了其他服务条款，例如单项协议的服务条款对用户开立支付账户、使用支付账户服务等约定了各项规则，则应当以单项协议的约定为准。除另有约定外，用户的使用单项服务行为视为用户对该单项服务的服务条款以及顺丰金融在该单项服务中发出的各类协议、公告及/或规则的同意。</b>
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第十一条</b>顺丰金融对于用户的通知及任何其他的协议、告示或其他关于用户使用用户账户及服务的通知，用户同意顺丰金融可通过顺丰金融平台公告、电子邮件、用户法定代表人手机短信等电子方式或常规的信件传递等方式进行，该等通知于发送之日视为已送达收件人。因信息传输等原因导致用户未在前述通知发出当日收到该等通知的，顺丰金融不承担责任。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第十二条</b>顺丰金融可以依其判断决定暂时停止提供、限制或改变顺丰金融服务，只要用户仍然使用顺丰金融服务，即表示用户仍然同意本协议。若用户不同意顺丰金融上述限制或改变顺丰金融服务的，用户应当终止接受或使用顺丰金融提供的服务。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第三章</b>用户使用限制说明</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第十三条</b>顺丰金融的用户必须是依据中国法律规定合法成立有效存续，符合中国法律规定的具有完全民事权利和民事行为能力，能够独立承担民事责任的企业法人。若贵司不符合此条件，请立即停止注册或停止使用本服务。在使用顺丰金融提供的服务前，用户必须先在顺丰金融平台完成注册，成为顺丰金融的用户。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第十四条</b>用户承诺以下事项：</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （1）用户必须依顺丰金融要求提供用户真实、最新、有效及完整的资料，并保证电子邮件地址、联系电话、联系地址、邮政编码等内容的有效性及安全性，保证顺丰金融及其他用户可以通过上述联系方式与用户进行联系。如因违背上述承诺，造成的任何法律后果，用户都将自行承担责任。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              若用户提供任何不真实、不准确、不完整或不能反映当前实际情况的资料，或顺丰金融有合理理由怀疑该等资料不真实、不准确、不完整或不能反映当前情况，顺丰金融有权拒绝用户的申请或者撤销用户的用户资格，并拒绝用户在目前或将来以任何形式使用顺丰金融用户服务，并不予任何赔偿或者退还任何已收取的服务费用。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              如因用户未及时更新基本资料，导致顺丰金融服务无法提供或提供时发生任何错误，用户不得将此作为取消交易或拒绝付款的理由，顺丰金融亦不承担任何责任。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（2）用户保证并承诺通过顺丰金融平台进行交易的资金来源合法。</p>
            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第四章</b>顺丰金融服务内容</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第十五条</b>顺丰金融的部分内容需要用户根据顺丰金融要求完成企业身份认证及银行卡认证，未进行身份认证及/或银行卡认证的用户将无法使用该部分顺丰金融服务。因未能完成认证而无法享受顺丰金融服务造成的损失，顺丰金融不承担任何责任。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第十六条</b>顺丰金融将为用户提供信息发布服务。顺丰金融向用户提供的各种信息及资料仅为参考，用户应依其独立判断做出决策。用户据此进行交易的，产生的风险由用户自行承担，用户无权据此向顺丰金融提出任何法律主张。在交易过程中，用户之间发生的纠纷，由纠纷各方自行解决，顺丰金融不承担任何责任。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第十七条</b>顺丰金融将为用户提供以下交易管理服务：</p>
            <p class="fs-26 txt-dark lh-40 mt20">（1）用户账户开立：用户在顺丰金融平台进行注册后将生成用户账户，用户账户将记载用户在顺丰金融平台的投融资活动。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （2）交易状态展示：用户确认，用户在顺丰金融平台上按交易流程所确认的状态，将成为顺丰金融为用户进行相关交易或操作（包括但不限于支付或收取款项、冻结资金、订立合同等）的唯一且不可撤销的依据。用户同意相关指令的执行时间以顺丰金融在其系统中进行实际操作的时间为准。因用户未能及时对交易状态进行修改、确认或未能提交相关申请而造成的损失由用户自行负责，顺丰金融不承担任何责任。用户同意顺丰金融有权依据本协议及/或顺丰金融相关纠纷处理规则等约定对相关事项进行处理。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （3）交易指令传递：用户理解并同意，顺丰金融向符合条件的用户提供服务。顺丰金融对在顺丰金融平台上进行的投融资等交易行为不承担任何责任，顺丰金融无法也没有义务保证用户在发出投融资意向后，能够实际投融资成功，用户因前述原因导致的损失（包括但不限于利息、手续费等损失）由用户自行承担，顺丰金融不承担责任。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （4）交易安全设置：顺丰金融有权基于交易安全等方面的考虑不时设定涉及交易的相关事项，包括但不限于交易限额、交易次数等，用户了解顺丰金融的前述设定可能会对交易造成一定不便，并对此没有异议。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（5）其他交易管理服务：系指网络支付合作协议以及顺丰金融单项服务中的各类协议、公告及/或规则中载明的各类交易管理服务。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              如果顺丰金融发现因系统故障或其他任何原因导致的处理错误，无论有利于顺丰金融还是有利于用户，顺丰金融都有权纠正该错误。如果该错误导致用户实际收到的款项多于应获得的金额，则无论错误的性质和原因为何，顺丰金融保留纠正不当执行的交易的权利，用户应根据顺丰金融向用户发出的有关纠正错误的通知的具体要求返还多收的款项或进行其他操作。用户理解并同意，用户因前述处理错误而多付或少付的款项均不计利息，顺丰金融不承担因前述处理错误而导致的任何损失或责任（包括用户可能因前述错误导致的利息、汇率等损失）。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              用户通过顺丰金融平台进行各项交易或接受交易款项时，若用户未遵从本协议条款或顺丰金融公布的交易规则中的操作指示，顺丰金融不承担任何责任。若发生上述状况而款项已先行拨入用户账户下，用户同意顺丰金融有权直接从相关用户账户中扣回款项及禁止用户要求支付此笔款项之权利。此款项若已汇入用户的银行账户，用户同意顺丰金融有向用户事后索回的权利，由此产生的追索费用由用户承担。</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第十八条</b>顺丰金融将为用户提供以下客户服务：</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （1）银行卡认证：为使用顺丰金融或顺丰金融委托的第三方机构提供的充值、取现、代扣等服务，用户应按照顺丰金融平台规定的流程提交以用户本身名义登记的有效银行借记卡等信息，经由顺丰金融审核通过后，顺丰金融会将用户账户与前述银行账户进行绑定。如用户未按照顺丰金融规定提交相关信息或提交的信息错误、虚假、过时或不完整，或者顺丰金融有合理的理由怀疑用户提交的信息为错误、虚假、过时或不完整，顺丰金融有权拒绝为用户提供银行卡认证服务，用户因此未能使用充值、取现等服务而产生的损失自行承担。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（2）充值：用户可以使用顺丰金融指定的方式向用户账户充入资金，用于通过顺丰金融平台进行交易。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （3）取现：用户可以通过顺丰金融平台当时开放的取现服务将用户账户中的资金转入经过认证的银行卡账户中。顺丰金融将于收到用户的前述指示后，尽快通过第三方机构将相应的款项汇入用户经过认证的银行卡账户（根据用户提供的银行不同，会产生汇入时间上的差异）。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （4）查询：顺丰金融将对用户在顺丰金融平台的所有操作进行记录，不论该操作之目的最终是否实现。用户可以实时查询用户账户名下的交易记录。用户理解并同意用户最终收到款项的服务是由用户经过认证的银行卡对应的银行提供的，需向该银行请求查证。用户理解并同意通过顺丰金融平台查询的任何信息仅作为参考，不作为相关操作或交易的证据或依据；如该等信息与顺丰金融记录存在任何不一致，应以顺丰金融提供的书面记录为准。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              用户了解，上述第(1)项至第(4)项中的充值、取现、代收/代付服务涉及顺丰金融与银行、第三方支付机构等第三方机构的合作。用户同意：(a)受银行、第三方支付机构等第三方仅在工作日进行资金代扣及划转的现状等各种原因所限，顺丰金融不对前述服务的资金到账时间做任何承诺，也不承担与此相关的责任，包括但不限于由此产生的利息、货币贬值等损失；(b)用户一经使用前述服务，即表示用户不可撤销地授权顺丰金融进行相关操作，且该等操作是不可逆转的，用户不能以任何理由拒绝付款或要求取消交易；(c)基于当前用户的账户体系等原因，用户同意顺丰金融视情况为用户开通上述功能和服务。</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold">用户进一步了解，在使用顺丰金融平台顺手富服务中的开户、支付结算等服务时，应当以网络支付合作协议中相关服务条款的约定为准。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （5）登录与客服：用户每次使用顺丰金融服务应直接登录顺丰金融平台，而不要通过邮件或其他网站提供的链接登录或通过其他第三方软件进行跳转的方式登录。用户每次拨打顺丰金融客户电话应拨打顺丰金融官方平台提供的客服电话9533833（如顺丰金融以公告等形式发布新的客服电话，请届时拨打新的客服电话），而不要拨打其他任何电话。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （6）广告投放：用户同意，顺丰金融有权在提供顺丰金融服务过程中以各种方式投放各种商业性广告或其他任何类型的商业信息（包括但不限于在顺丰金融平台的任何页面上投放广告），并且，用户同意接受顺丰金融通过电子邮件、短信或其他方式向用户发送商品促销或其他相关商业信息。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （7）其他客户服务：系指《网络支付合作协议》(包括对其不时的修订)以及顺丰金融单项服务中的各类协议、公告及/或规则中载明的各类客户服务。</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第十九条</b>顺丰金融将为用户提供以下合同管理服务：</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （1）在顺丰金融平台交易需订立的合同采用电子合同方式。用户登录顺丰金融平台后，根据顺丰金融以及电子签约认证机构的相关规则进行个人身份及企业用户的实名验证，在用户的法定代表人以用户的名义完成企业实名验证后，在顺丰金融平台通过点击确认、使用电子签名签约或类似方式签署的电子合同即视为用户本人真实意愿并以用户本人名义签署的合同，具有法律效力。用户应妥善保管自己的用户账户密码、数字证书等账户信息，用户通过前述方式订立的电子合同对合同各方具有法律约束力，用户不得以其用户账户密码、数字证书、数字证书存储介质等账户信息被盗用或其他理由否认已订立的合同的效力或不按照该等合同履行相关义务。用户账户所有以用户密码登录及/或数字证书所进行的操作（包括订立合同、资金划转等）均视为用户本人的操作，用户本人对用户账户内的所有法律关系享受相应的权利，并承担相应的法律责任。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （2）用户根据本协议以及顺丰金融的相关规则签署电子合同后，不得擅自修改该合同。顺丰金融向用户提供电子合同的备案、查看、核对服务，如对电子合同真伪或电子合同的内容有任何疑问，用户可通过顺丰金融的平台进行核对。如对此有任何争议，应以顺丰金融记录的合同为准。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （3）用户不得私自仿制、伪造在顺丰金融平台上签订的电子合同或印章，不得用伪造的合同进行招摇撞骗或进行其他非法使用，否则由用户自行承担责任。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（4）除另有约定外，顺丰金融不提供任何纸质合同。</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第二十条</b>除外责任</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （1）在任何情况下，对于用户使用顺丰金融服务过程中涉及由第三方提供相关服务的责任由该第三方承担，顺丰金融不承担该等责任。顺丰金融不承担责任的情形包括但不限于：</p>
            <p class="fs-26 txt-dark lh-40 mt20">(i)因银行、(顺丰金融以外的)第三方支付机构、电子签约认证机构等第三方未按照用户和/或顺丰金融指令进行操作引起的任何损失或责任；</p>
            <p class="fs-26 txt-dark lh-40 mt20">(ii)因银行、(顺丰金融以外的)第三方支付机构、电子签约认证机构等第三方原因导致资金未能及时到账或未能到账引起的任何损失或责任；</p>
            <p class="fs-26 txt-dark lh-40 mt20">(iii)因银行、(顺丰金融以外的)第三方支付机构、电子签约认证机构等第三方对交易限额或次数等方面的限制而引起的任何损失或责任；</p>
            <p class="fs-26 txt-dark lh-40 mt20">(iv)因其他第三方的行为或原因导致的任何损失或责任。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（2）因用户自身的原因导致的任何损失或责任，由用户自行负责，顺丰金融不承担责任。顺丰金融不承担责任的情形包括但不限于：</p>
            <p class="fs-26 txt-dark lh-40 mt20">(i)用户未按照本协议或顺丰金融平台不时公布的任何规则进行操作导致的任何损失或责任；</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              (ii)因用户使用的银行卡的原因导致的损失或责任，包括用户使用未经认证的银行卡或使用非用户本人的银行卡或使用信用卡，用户的银行卡被冻结、挂失等导致的任何损失或责任；</p>
            <p class="fs-26 txt-dark lh-40 mt20">(iii)用户向顺丰金融发送的指令信息不明确、或存在歧义、不完整等导致的任何损失或责任；</p>
            <p class="fs-26 txt-dark lh-40 mt20">(iv)用户账户内余额不足导致的任何损失或责任；</p>
            <p class="fs-26 txt-dark lh-40 mt20">(v)其他因用户原因导致的任何损失或责任。</p>
            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第五章</b>服务费用</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第二十一条</b>当用户使用顺丰金融服务时，顺丰金融可能会向用户收取相关服务费用。各项服务收费以用户使用顺丰金融服务时顺丰金融平台上所公示之收费方式说明或双方另行签订的协议为准。顺丰金融保留制定及调整服务收费的权利。用户同意并且授权顺丰金融有权从用户账户直接扣收服务费用及/和与服务相关的其他任何费用，且扣收时无需另行通知或询证。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第二十二条</b>用户在顺丰金融进行交易而与其他方签订协议的，其他方有权按照协议的约定向用户收取相关费用。</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第二十三条</b>用户因进行交易而发生的所有应纳税赋，以及相关硬件、软件、通讯、网络服务及其他方面的费用均由用户自行承担。</p>

            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第六章</b>用户账户安全及管理</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第二十四条</b>用户可以通过其法定代表人的用户名和密码登录用户账户，使用顺丰金融服务。用户应妥善保管自己的用户名和密码，确保用户账户及密码的机密安全。用户了解并同意，确保用户账户及密码的机密安全是用户的责任。用户将对利用该用户账户及密码所进行的一切行动及言论，负完全的责任，并同意以下事项：
            </p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （1）用户不应对其他任何人泄露用户账户或密码，亦不可使用其他任何人的账户或密码。因黑客、病毒或用户的保管疏忽等非顺丰金融原因导致用户的用户账户遭他人非法使用的，顺丰金融不承担任何责任。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （2）顺丰金融通过用户账户及密码来识别用户的指令，用户确认，使用用户账户和密码登录后在顺丰金融的一切行为均代表用户本人。用户账户操作所产生的电子信息记录均为用户行为的有效凭据，并由用户本人承担由此产生的全部责任，且顺丰金融对用户账户记录的电子信息对应的所有行为均以用户本人为法律上的追索对象。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （3）冒用、盗用他人用户账户及密码，或以其他未经授权方式使用他人资料进行注册登记的，顺丰金融及其合法授权主体保留追究实际使用人和被冒用、盗用人连带责任的权利。</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （4）用户应根据顺丰金融的相关规则以及顺丰金融平台的相关提示创建一个安全密码，应避免选择过于明显的单词或日期，比如用户的姓名、昵称或者生日等；</p>
            <p class="fs-26 txt-dark lh-40 mt20">（5）用户不得将用户账户转让、赠与或授权给任何本人以外的第三方使用。</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第二十五条</b>用户注销或被吊销营业执照的，又或进入破产程序的，其在本协议项下的各项权利义务由其权利的承继人承担。若用户的民事权利能力或民事行为能力受到限制时，顺丰金融或其授权的主体有权根据有效法律文书（包括但不限于生效的法院判决等）的指示处置与用户账户相关的款项。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第二十六条</b>顺丰金融有权基于单方独立判断，在其认为可能发生危害交易安全等情形时，不经通知而先行暂停、中断或终止向用户提供本协议项下的全部或部分账户服务（包括收费服务），并将注册资料移除或删除，且无需对用户或任何第三方承担任何责任。前述情形包括但不限于：
            </p>
            <p class="fs-26 txt-dark lh-40 mt20">（1）顺丰金融认为用户提供的资料不具有真实性、有效性或完整性；</p>
            <p class="fs-26 txt-dark lh-40 mt20">（2）顺丰金融发现异常交易或有疑义或有违法之虞时；</p>
            <p class="fs-26 txt-dark lh-40 mt20">（3）顺丰金融认为用户账户涉嫌洗钱、套现、传销、被冒用或其他顺丰金融认为有风险之情形；</p>
            <p class="fs-26 txt-dark lh-40 mt20">（4）顺丰金融认为用户已经违反本协议中规定的各类规则及原则；</p>
            <p class="fs-26 txt-dark lh-40 mt20">
              （5）顺丰金融基于交易安全等原因，根据其单独判断需先行暂停、中断或终止向用户提供本协议项下的全部或部分用户服务，并将注册资料移除或删除的其他情形；</p>
            <p class="fs-26 txt-dark lh-40 mt20">（6）用户在使用顺丰金融收费服务时未按规定向顺丰金融支付相应的服务费用。</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第二十七条</b>用户同意在必要时，顺丰金融无需进行事先通知即有权终止提供用户账户服务，并可能立即暂停、关闭或删除用户账户及该用户账户中所有相关资料及档案。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第二十八条</b>用户可随时更改用户的用户名和密码，但任何更改均须经顺丰金融接受，方为有效。</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第二十九条</b>用户因忘记密码或密码被盗向顺丰金融查询密码时，必须按照顺丰金融的要求提供完全、正确的注册信息，否则顺丰金融有权基于审慎原则而不予告知。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第三十条</b>如用户发现有他人冒用或盗用您的用户账户及密码或任何其他未经合法授权之情形时，应立即以有效方式通知顺丰金融，要求暂停相关服务，否则可能承担由此产生的连带责任。同时，用户理解顺丰金融对用户的请求采取行动需要合理期限，而在顺丰金融采取实际行动之前，用户应对任何或所有由未经授权人士使用此服务或此服务被用作未经授权用途负责，顺丰金融对已执行的指令及(或)所导致的用户的损失不承担任何责任。尽管有本条前述的约定，冒用或者盗用他人账户及密码的，顺丰金融及其合法授权主体保留追究冒用人、盗用人法律责任的权利。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20 bold"><b>第三十一条</b>顺丰金融不会通过电话、短信或电子邮件方式要求用户提供用户账户、密码或其他安全信息，如果用户收到声称来自顺丰金融的任何该等要求，用户不应对该等要求作出任何回应。否则，由此造成的损失由用户自行承担。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第七章</b>用户的守法义务及承诺</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第三十二条</b>用户承诺绝不为任何非法目的或以任何非法方式使用顺丰金融服务，并承诺遵守中国法律、法规及一切适用的互联网之国际惯例，遵守所有与顺丰金融服务有关的网络协议、规则和程序。若用户因以非法目的从事任何非法行为，由此对顺丰金融及任何第三方造成的损失，均有用户自行承担。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第三十三条</b>用户同意，由于用户违反本协议，或违反通过援引并入本协议并成为本协议一部分的文件，或由于用户使用顺丰金融服务违反了任何法律或第三方的权利而造成任何第三方进行或发起的任何补偿申请或要求（包括律师费用），用户会对顺丰金融及其关联方、合作伙伴、董事以及雇员给予全额补偿并使之不受损害。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第三十四条</b>用户保证严格遵守中国现行法律、法规、政府规章及其他应该遵守的规范性文件，不在顺丰金融平台从事危害国家安全、洗钱、套现、传销等任何违法活动或者其他有违社会公共利益或公共道德的行为。上述行为包括但不限于：
            </p>
            <p class="fs-26 txt-dark lh-40 mt20">（1）反对宪法所确定的基本原则，危害国家安全、泄漏国家秘密、颠覆国家政权、破坏国家统一的。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（2）侵害他人名誉、隐私权、商业秘密、商标权、著作权、专利权、其他知识产权及其他权益。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（3）违反依法律或合约所应负之保密义务。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（4）冒用、盗用他人名义，使用虚假信息，以其他未经授权方式使用他人资料或通过外挂注册程序等其他违法违规的方式使用顺丰金融服务。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（5）从事任何不法交易行为，如贩卖枪支、毒品、禁药、盗版软件或其他违禁物。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（6）提供赌博资讯或以任何方式引诱他人参与赌博。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（7）涉嫌洗钱、套现或进行传销活动的。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（8）从事任何可能含有电脑病毒或是可能侵害顺丰金融服务系統、资料等行为。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（9）利用顺丰金融服务系统进行可能对互联网或移动网正常运转造成不利影响之行为。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（10）侵犯顺丰金融的商业利益，包括但不限于发布非经顺丰金融许可的商业广告。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（11）利用顺丰金融服务上传、展示或传播虚假的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（12）其他顺丰金融有正当理由认为不适当之行为。</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第三十五条</b>用户保证合法使用顺丰金融提供的资讯或服务，遵守所有与顺丰金融服务有关的协议、规则和程序。未经顺丰金融事先书面授权，不使用任何非法手段擅自进入顺丰金融的未公开系统。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第三十六条</b>用户保证拥有合法的权利和资格在顺丰金融发布交易信息并进行交易，且保证前述行为不侵害任何第三方合法权益；保证自己的行为不会导致顺丰金融遭受任何第三方提起的索赔、诉讼或行政责任。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第三十七条</b>用户承诺在国家生效法律文书或行政处罚决定确认自己存在违法行为，或者本平台有足够事实依据可以认定自己存在违法或违反本协议的行为，以及自己存在违约的情况下，顺丰金融有权将相关信息计入任何与自己相关的信用资料，以及对自己的用户账户采取暂停或关闭等措施，而无需承担任何责任。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第三十八条</b>顺丰金融有权依其独立判断删除顺丰金融平台内各类不符合法律政策或不真实或不适当的信息内容，顺丰金融无需通知用户并无需承担任何法律责任。若用户未遵守本协议项下任何保证与承诺的，顺丰金融有权依其独立判断暂定或关闭用户账户，并无需承担任何法律责任。
            </p>

            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第八章</b>账户注销、限制访问及服务中断或故障</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第三十九条</b>用户决定不再使用用户账户时，应首先清偿所有应付款项（包括但不限于服务费、管理费等），再将用户账户下所对应的可用款项（如有）全部提现或者向顺丰金融发出其它合法的支付指令，并向顺丰金融申请注销（或永久冻结）该用户账户，经顺丰金融审核同意后可正式注销用户账户。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第四十条</b>用户账户和密码仅限于用户本人使用，用户不得以任何形式转让或出借、出租给他人使用，如果发现同一用户账户和密码在同一时间内被多人同时登录使用，顺丰金融有权暂停、终止或限制该用户访问直至取消该用户的用户资格，并不予任何赔偿或者退还任何已收取的服务费用。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第四十一条</b>用户同意，如用户账户未完成银行卡认证、且已经连续超过365天未登录的，顺丰金融无需进行事先通知即有权终止提供用户账户服务，并可能立即暂停、关闭或删除用户账户及该用户账户中所有相关资料及档案。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第四十二条</b>无论顺丰金融是否收费，只要用户利用顺丰金融从事违法活动或者严重违反本协议的约定，顺丰金融可在不发出任何通知的情况下立即使用户账户无效，或撤销用户账户以及在用户账户内的所有相关资料和档案，和/或禁止用户进一步接入该等档案或服务。账号终止后，顺丰金融没有义务为用户保留原账号中或与之相关的任何信息，或转发任何未曾阅读或发送的信息给用户或第三方。此外，顺丰金融亦不会就终止用户账户使用而对用户或任何第三者承担任何责任。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第四十三条</b>用户同意，本协议项下任何情形导致用户账户的暂停、中断或终止不代表用户责任的终止，用户仍应对其使用顺丰金融服务期间的行为承担可能的违约或损害赔偿责任，同时顺丰金融仍可保有用户的相关信息。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第四十四条</b>用户同意，基于互联网的特殊性，顺丰金融不担保服务不会中断，也不担保服务的及时性和/或安全性。系统因相关状况无法正常运作，使用户无法使用任何顺丰金融服务或使用任何顺丰金融服务时受到任何影响时，顺丰金融对用户或第三方不负任何责任，前述状况包括但不限于：
            </p>
            <p class="fs-26 txt-dark lh-40 mt20">（1）顺丰金融系统停机维护期间。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（2）电信设备出现故障不能进行数据传输的。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（3）由于黑客攻击、网络供应商技术调整或故障、平台升级、银行方面的问题等原因而造成的顺丰金融服务中断或延迟。</p>
            <p class="fs-26 txt-dark lh-40 mt20">（4）因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成顺丰金融系统障碍不能执行业务的。</p>

            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第九章</b>责任范围及限制</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold"><b>第四十五条</b>顺丰金融未对任何顺丰金融服务提供任何形式的保证，包括但不限于以下事项：</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold">（1）顺丰金融服务将符合用户的任何需求。</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold">（2）顺丰金融服务将不受干扰、及时提供或免于出错。</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold">（3）用户经由顺丰金融服务购买或取得之任何产品、服务、资讯或其他资料将完全符合用户的期望。</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold"><b>第四十六条</b>用户自顺丰金融及顺丰金融工作人员或经由顺丰金融服务取得的建议或资讯，无论其为书面或口头，均不构成顺丰金融对顺丰金融服务的任何保证。
            </p>

            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第十章</b>隐私权保护及授权条款</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第四十七条</b>顺丰金融对于用户提供的、顺丰金融自行收集的、经认证的信息将按照本协议予以保护、使用或者披露。未经顺丰金融事先书面同意，用户不得转让其在本协议项下的任何权利和义务。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第四十八条</b>顺丰金融可能自公开及私人资料来源收集用户的额外资料，以更好地掌握用户情况，并为用户度身订造顺丰金融服务、解决争议并有助确保在顺丰金融平台进行安全交易。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第四十九条</b>顺丰金融按照用户在顺丰金融平台上的行为自动追踪关于用户的某些资料。在不透露用户的隐私资料的前提下，顺丰金融有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第五十条</b>用户同意顺丰金融可使用关于用户的相关资料（包括但不限于顺丰金融持有的有关用户的档案中的资料，顺丰金融从用户目前及以前在顺丰金融平台上的活动所获取的其他资料以及顺丰金融通过其他方式自行收集的资料）以解决争议、对纠纷进行调停。用户同意顺丰金融可通过人工或自动程序对用户的资料进行评价。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第五十一条</b>顺丰金融依据适用中国法律采用行业标准和惯例以保护用户的资料。用户因履行本协议提供给顺丰金融的信息，顺丰金融不会出售或免费共享给任何第三方，以下情况除外：
            </p>
            <p class="fs-26 txt-dark lh-40 mt20">（1）提供独立服务且仅要求服务相关的必要信息的供应商，如印刷厂、邮递公司等；</p>
            <p class="fs-26 txt-dark lh-40 mt20">（2）具有合法调阅信息权限并从合法渠道调阅信息的政府部门或其他机构，如公安机关、法院；</p>
            <p class="fs-26 txt-dark lh-40 mt20">（3）顺丰金融的关联实体；</p>
            <p class="fs-26 txt-dark lh-40 mt20">（4）经平台使用方或平台使用方授权代表同意的第三方。</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第五十二条</b>顺丰金融有义务根据有关法律要求向司法机关和政府部门提供用户的资料。在用户未能按照与顺丰金融签订的协议或者与顺丰金融其他用户签订的协议等其他法律文本的约定履行自己应尽的义务时，顺丰金融有权根据自己的判断，或者与该笔交易有关的其他用户的请求披露用户的信息和资料，并做出评论。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第五十三条</b>顺丰金融有义务根据有关法律要求向司法机关和政府部门提供用户的资料。在用户未能按照与顺丰金融签订的协议或者与顺丰金融其他用户签订的协议等其他法律文本的约定履行自己应尽的义务时，顺丰金融有权根据自己的判断，或者与该笔交易有关的其他用户的请求披露用户的信息和资料，并做出评论。<b>用户严重违反顺丰金融相关规则的，顺丰金融有权将用户提供的及顺丰金融自行收集的用户的信息和资料编辑入顺丰金融黑名单，并将该黑名单对第三方披露，且顺丰金融有权将用户提交或顺丰金融自行收集的用户的资料和信息与任何第三方进行数据共享，以便顺丰金融和第三方催收逾期借款及对用户的其他申请进行审核之用，由此可能造成的用户的任何损失，顺丰金融不承担法律责任。</b>
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第五十四条</b>用户授权顺丰金融，除法律另有规定之外，将用户提供给顺丰金融的信息、享受顺丰金融服务产生的信息（包括本协议签署之前提供和产生的信息）以及顺丰金融根据本条约定查询、收集的信息，用于顺丰金融及其因服务必要委托的合作伙伴为本人提供服务、推荐产品、开展市场调查与信息数据分析。
            </p>

            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第十一章</b>知识产权的保护</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第五十五条</b>顺丰金融平台上所有内容，包括但不限于文字、著作、图片、图表、软件、视频、音频、档案、资讯、资料、平台架构、平台画面的安排、网页设计，广告以及平台为用户提供的其它信息或资料均由顺丰金融或其他权利人依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第五十六条</b>非经顺丰金融或其他权利人书面同意，任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表顺丰金融平台程序或内容。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第五十七条</b>未经顺丰金融的明确书面同意，用户不得下载或修改平台或其任何部分。用户不得对顺丰金融平台或其内容进行转售或商业利用；不得收集和利用产品目录、说明和价格；不得对顺丰金融平台或其内容进行任何衍生利用；不得为其他商业利益而下载或拷贝用户账户信息或使用任何数据采集、Robots或类似的数据收集和摘录工具。未经顺丰金融的书面许可，严禁对顺丰金融平台的内容进行系统获取以直接或间接创建或编辑文集、汇编、数据库或人名地址录（无论是否通过Robots、Spiders、自动仪器或手工操作）。另外，严禁为任何未经本使用条件明确允许的目的而使用顺丰金融平台上的内容和材料。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第五十八条</b>未经顺丰金融明确书面同意，用户不得以任何商业目的对顺丰金融平台或其任何部分进行复制、复印、仿造、出售、转售、访问、或以其他方式加以利用。未经顺丰金融明确书面同意，用户不得用frame或运用frame技巧把顺丰金融或其关联公司的商标、标识或其他专有信息（包括图像、文字、网页设计或形式）据为己有。未经顺丰金融明确书面同意，用户不得以Meta
              Tags或任何其他"隐藏文本"方式使用顺丰金融或其关联公司的名字和商标。任何未经授权的使用都会终止顺丰金融所授予的允许或许可。</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第五十九条</b>尊重知识产权是用户应尽的义务，如有违反，用户应对顺丰金融承担损害赔偿等法律责任。</p>
            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第十二章</b>免责声明</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold"><b>第六十条</b>除非另有书面协议约定，顺丰金融在任何情况下，对用户使用本平台服务而产生的任何形式的直接或间接损失均不承担法律责任，包括但不限于资金损失、利润损失、营业中断损失等。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20 bold"><b>第六十一条</b>用户可以在某些单项服务中提供或发布信息，该等信息主要由用户自行提供或发布，顺丰金融无法保证所有用户信息的真实、及时和完整。用户在顺丰金融平台发布的各类信息，不代表顺丰金融对其信息真实性、合法性作出的任何保证或担保，用户应对自己的判断承担全部责任。任何因为交易而产生的风险概由各交易方自行承担。
            <p class="fs-26 txt-dark lh-40 mt20 bold"><b>第六十二条</b>任何顺丰金融之外的第三方机构或个人所提供的服务，其服务品质及内容由该第三方自行、独立负责。</p>
            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第十三章</b>风险揭示</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold"><b>第六十三条</b>作为信息中介服务机构，顺丰金融将尽其最大努力履行服务机构的服务义务。用户自顺丰金融及其工作人员或经由顺丰金融服务取得的建议或信息，无论其是否为书面或口头形式，均不构成顺丰金融对其提供服务的保证。顺丰金融将恪尽职守，履行诚实、信用、谨慎的义务，但用户在资金管理、运用过程中，仍然存在本协议项下的风险。在此，顺丰金融提示用户，顺丰金融不对任何用户及/或任何交易提供任何担保或条件，无论是明示、默示或法定的。顺丰金融平台项下的投资存在一定的投资风险，适合风险识别、评估、承受能力与所投款项相适应的合格投资人。据此，用户在做出任何投资决定之前，均应评估自身是否适合投资，并仔细阅读相关的风险揭示事项。用户依赖用户的独立判断进行交易，用户应对其作出的判断承担全部责任。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20 bold"><b>第六十四条</b>用户了解并认可，任何通过顺丰金融进行的交易并不能避免以下风险，顺丰金融不能也没有义务为如下风险负责：</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold">（1）宏观经济风险：因宏观经济形势变化，可能引起价格等方面的异常波动，用户有可能遭受损失；</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold">（2）政策风险：有关法律、法规及相关政策、规则发生变化，可能引起价格等方面异常波动，用户有可能遭受损失；</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold">（3）违约风险：因其他交易方无力或无意愿按时足额履约，用户有可能遭受损失；</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold">（4）利率风险：市场利率变化可能对购买或持有产品的实际收益产生影响；</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold">（5）不可抗力因素导致的风险；</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold">
              （6）因用户的过错导致的任何损失，该过错包括但不限于：决策失误、操作不当、遗忘或泄露密码、密码被他人破解、用户使用的计算机系统被第三方侵入、用户委托他人代理交易时他人恶意或不当操作而造成的损失。</p>
            <p class="fs-26 txt-dark lh-40 mt20 bold"><b>第六十五条</b>以上并不能揭示用户通过顺丰金融进行交易的全部风险及市场的全部情形。用户在做出交易决策前，应全面了解相关交易，谨慎决策，并自行承担全部风险。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第十四章</b>赔偿</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第六十六条</b>用户因违反本协议或本协议项下的其他文件，或违反了任何法律、法规的规定，给顺丰金融造成损失的，应予赔偿，赔偿范围包括但不限于顺丰金融的直接损失、间接损失以及维权费用等。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第六十七条</b>用户因违反前款规定而侵害了第三方的权利，导致顺丰金融遭受任何第三方提起的索赔、诉讼或行政责任，用户承诺无条件承担相应责任并使顺丰金融免责。若因此给顺丰金融造成损失的，应予赔偿，赔偿范围包括但不限于顺丰金融的维权费用、名誉损失以及顺丰金融向第三方支付的补偿金等。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20 txt-center bold"><b>第十五章</b>条款的解释、法律适用及争端解决</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第六十八条</b>本协议是由用户与顺丰金融共同签订的，适用于用户在顺丰金融的全部活动。本协议内容包括但不限于协议正文条款及已经发布的或将来可能发布的各类规则，所有条款和规则为协议不可分割的一部分，与协议正文具有同等法律效力。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第六十九条</b>本协议不涉及用户与顺丰金融的其他用户之间因线上交易而产生的法律关系及法律纠纷。但用户在此同意将全面接受并履行与顺丰金融其他用户在顺丰金融签订的任何电子法律文本，并承诺按照该等法律文本享有和（或）放弃相应的权利、承担和（或）豁免相应的义务。用户间的纠纷及争议需要顺丰金融提供相应资料时，顺丰金融仅接受来自司法机关的请求。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第七十条</b>如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，则应认为该条款可与本协议相分割，并可被尽可能接近各方意图的、能够保留本协议要求的经济目的的、有效的新条款所取代，而且，在此情况下，本协议的其他条款仍然完全有效并具有约束力。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第七十一条</b>本协议及其修订的有效性、履行与本协议及其修订效力有关的所有事宜，将受中国法律管辖，任何争议仅适用中国法律。</p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第七十二条</b>本协议签订地为中国深圳市。因本协议所引起的用户与顺丰金融的任何纠纷或争议，首先应友好协商解决，协商不成的，用户在此完全同意将纠纷或争议提交顺丰金融所在地有管辖权的人民法院诉讼解决。
            </p>
            <p class="fs-26 txt-dark lh-40 mt20"><b>第七十三条</b>本协议的解释、修改及更新权均属于顺丰金融所有。</p>
            <p class="fs-26 txt-dark lh-40 mt20 txt-right bold">用户：通过在线点击确认的方式签署</p>
          </cell>
        </group>
        <div class="agreeBtn">
          <flexbox-item>
            <x-button @click.native="imAgreeVal" type="warn">我已阅读并同意</x-button>
          </flexbox-item>
        </div>
      </popup>
    </div>
    <div class="login-button mrgintop20">
      <flexbox align="flex-start center" class="fs-26 lh-48">
        <check-squarebox @updateValue="getSquareVal" :imAgree="sfAgreement"></check-squarebox>
        阅读并同意<span class="fs-26 txt-blue" @click="sfAgree">《顺丰金融用户服务协议》</span>
      </flexbox>
      <x-button type="warn" class="login-btn" @click.native="submitBtn" :disabled="disabled">立即注册</x-button>
    </div>
    <toast v-model="showSuccess" :type="success" :text="showMsg"></toast>
  </div>
</template>
<script>
  export default {
    name: 'register',
    data () {
      return {
        title: '注册企业会员',
        isShow: 'show-ok',
        phoneType: 'text',
        disabled: true,
        userphone: '',
        password: '',
        verification: '',
        showMsg: '',
        time: 60,
        start: false,
        sfAgreement: true,
        verCodeShow: true,
        success: 'success',
        showSuccess: false,
        showAgree: false
      }
    },
    beforeCreate () {
      document.title = '注册企业会员'
      this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-registerPage','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
         console.log(resp)
      }, resp => {
         console.log(resp)
      })
      if (this.$getTOKEN() && this.$getUserInfo()) {
        location.hash = '/'
      }
    },
    methods: {
      changeShow () {
        if (this.isShow === 'show-no') {
          this.phoneType = 'text'
          this.isShow = 'show-ok'
        } else {
          this.phoneType = 'password'
          this.isShow = 'show-no'
        }
      },
      judgebtnView () {
        if (this.userphone && this.password && this.verification) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      },
      sndCode () {
        let phoneReg = /^1[3-578]\d{9}$/
        if (phoneReg.test(this.userphone)) {
          this.$post('SMS100001', {
            'scene': 'REGISTER',
            'dealerFlag': 'GENERAL',
            'memberType': 'COMP',
            'mobileOrEmail': this.userphone
          }, resp => {
            console.log(resp.respData)
            this.verCodeShow = false
            this.start = true
            this.$vux.toast.text('短信验证码已发送', 'default')
          }, resp => {
            this.$vux.toast.text(resp.msg, 'default')
          })
        } else {
          this.$vux.toast.text('手机号格式不正确', 'default')
        }
      },
      finish (index) {
        this.start = false
        this.verCodeShow = true
        this.time = 60
      },
      showPosition (position) {
        this.position = position
        this.showPositionValue = true
      },
      sfAgree () {
        this.showAgree = true
        this.agreement = true
      },
      imAgreeVal () {
        this.showAgree = false
        this.sfAgreement = true
      },
      getSquareVal (val) {
        if (!val) {
          this.sfAgreement = false
        } else {
          this.sfAgreement = true
        }
      },
      checkSeqChar (password) {
        if (password) {
          var pwd = password.toUpperCase()
          var len = pwd.length
          for (var i = 0; i < len; ++i) {
            if (i + 3 < len) {
              var u1 = pwd.charCodeAt(i)
              var u2 = pwd.charCodeAt(i + 1)
              var u3 = pwd.charCodeAt(i + 2)
              var u4 = pwd.charCodeAt(i + 3)
              var m = u2 - u1
              if (m === 1 || m === -1){
                if ((u3 - u2 === m) && (u4 - u3 === m)) {
                  return true
                }
              }
            }
          }
        }
        return false
      },
      isRepeat4Times (password){
        if (password) {
          var pwd = password.toUpperCase()
          var len = pwd.length
          for (var i = 0; i < len; ++i) {
            if (i + 3 < len) {
              var u1 = pwd.charAt(i)
              var u2 = pwd.charAt(i + 1)
              var u3 = pwd.charAt(i + 2)
              var u4 = pwd.charAt(i + 3)
              if (u1 === u2 && u2 === u3 && u3 === u4){
                return true
              }
            }
          }
        }
        return false
      },
      isIncludeUsername (username, password) {
        if (password && username) {
          var idx = password.indexOf(username);
          if (idx >= 0) {
            return true
          }
        }
        return false
      },
      isIncludeBenWord (password) {
        var a = ['admin', 'pass']
        for (var i = 0; i < a.length; ++i) {
          if (this.isIncludeUsername(a[i], password)) {
            return true
          }
        }
        return false
      },
      submitBtn () {
        if (!this.sfAgreement) {
          this.$vux.toast.text('请阅读注册协议', 'default')
        } else {
          let phoneReg = /^1[3-578]\d{9}$/
          let pwdReg = /^[\x21-\x7E]{6,20}$/
          let verReg = /^\d{6}$/
          let continuous = /([0-9a-zA-Z])\1{3}$/
          if (phoneReg.test(this.userphone) && pwdReg.test(this.password) && !continuous.test(this.password) && verReg.test(this.verification)) {
            if (this.checkSeqChar(this.password)) {
              this.$vux.toast.text('密码中不能包含有连续四位及以上顺序(或逆序)数字或字母', 'default')
            } else if (this.isRepeat4Times(this.password)) {
              this.$vux.toast.text('密码中不能包含有连续四位及以上重复字符', 'default')
            } else if (this.isIncludeUsername(this.userphone,this.password)) {
              this.$vux.toast.text('不能将帐号名作为密码的一部分存在于密码', 'default')
            } else if (this.isIncludeBenWord(this.password)) {
              this.$vux.toast.text('常用禁忌词不能作为密码的一部分存在于密码中', 'default')
            } else {
              this.$post('REG100001', {'loginName': this.userphone,'loginPwd': this.password,'memberType': 'COMP','verifyCode': this.verification}, resp => {
              this.$setTOKEN('')
              this.$setUserInfo('')
              this.$setTOKEN(resp.respData.secretKey)
              this.$setUserInfo(resp.respData)
              this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-registerSucc','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
                 console.log(resp)
              }, resp => {
                 console.log(resp)
              })
              this.success = 'success'
              this.showSuccess = true
              this.showMsg = '注册成功'
              setTimeout(function () {
                location.hash = '/'
              }, 1500)
            }, resp => {
              this.$post('STAT100001',{'type': 'merchant2b','trigId':'ms-toB-registerFail','trigUid': this.$getUserInfo().wxOpenId,'trigBase': this.$getUserInfo().memberNo,'route':'','channel':'MS-WEIXIN'},resp => {
                 console.log(resp)
              }, resp => {
                 console.log(resp)
              })
              this.$vux.toast.text(resp.msg, 'default')
            })
            }
          } else {
            if (!phoneReg.test(this.userphone)) {
              this.$vux.toast.text('手机号格式不正确', 'default')
            } else if (!verReg.test(this.verification)) {
              this.$vux.toast.text('验证码格式不正确', 'default')
            } else if (!pwdReg.test(this.password)) {
              this.$vux.toast.text('密码必须由6~20位数字、字母或符号组成', 'default')
            } else if (continuous.test(this.password)) {
              this.$vux.toast.text('密码中不能包含有连续四位及以上重复数字或字母', 'default')
            }
          }
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../assets/scss/login.scss';

  .bold {
    font-weight: bold
  }

  .indent {
    text-indent: 2em
  }

  .mt20 {
    margin-top: .2rem
  }

  .register p b {
    margin-right: 1em;
    font-weight: bold
  }
</style>
