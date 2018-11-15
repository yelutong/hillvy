<template>  
  <footer class="footer"> 
    <ul>   
      <li v-for="lis in ul">{{lis.li}}</li>  
    </ul>  
    <p>Copyright © {{authorVal}} - 2016 All rights reserved  </p>
  </footer> 
</template>   

<script>  
export default {  
  name: 'footerDiv',  
  data () {   
    return {   
      ul: [
         { li: '琉璃之金' },    
         { li: '朦胧之森' },    
         { li: '缥缈之滔' },    
         { li: '逍遥之火' },    
         { li: '璀璨之沙' }   
      ]   
    }  
  },  

  computed: {   
    authorVal () {   
      return this.$store.state.author   
    }  
  }  
}
</script>