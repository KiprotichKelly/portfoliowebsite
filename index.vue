
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>

<script>
import {usePDF, VuePDF} from 'VuePDF'
export default {
  components: {
    VuePDF
  },
  setup(){
    const { pdf, pages, info } = usePDF("cv/Kelly Kiprotich_Resume.pdf")
    console.log(`Document has ${pages} pages`)
    console.log(`Document info: ${info}`)
    return {
      pdf
    }
  }
}
</script>
<template>
    <VuePDF :pdf="pdf" :page="1" />
  </template>
  