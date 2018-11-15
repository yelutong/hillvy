<template>
    <div>
     <base-header></base-header>
     <base-footer></base-footer>
    </div>
</template>

<script>
import BaseHeader from "../views/header"
import BaseFooter from "../views/footer"
export default{
        props:["placeholder"],
        components: { BaseHeader,BaseFooter },
        data:function () {
            return {
                username:""
            }
        },
        methods:{
            userNameChange(){
                this.$store.state.user_name = this.username;
            }
        }
    }
</script>