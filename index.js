let app = Vue.createApp({
    data() {
      return {
      }
    },
    methods: {
        readFile() {
            window.open('cv/Kelly Kiprotich_Resume.pdf', '_blank') //to open in new tab
          },
          toggleCV(){
            this.showcv = !this.showcv
          },
      },
      async mounted() {
       
       },

})
app.component('showpdf',{
    props:['showcv'],
    computed: {
      
    },
    methods:
    {
   
    },
    template:`
    <aside class="cv-container">
      <div class="cv">
        <h1 class="cv-title spread">
          <span>
            CV
            <i class="icofont-cv-alt icofont-1x"></i>
          </span>
          <button @click="showcv"class="cv-close">&times;</button>
        </h1>
      </div>
    </aside>
    `
})
app.mount('#app')