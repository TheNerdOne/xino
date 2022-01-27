<template>
  <div class="main-div">
      <button type="button" @click="started()">
          شروع
      </button>
  </div>
</template>

<script>
export default {
    methods:{
        started(){
            this.$emit('begin',true)
        }
    }
}
</script>

<style scoped>
.main-div{
    margin: auto;
    max-width: 100%;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.main-div button {
    background-color: #1572A1;
    padding: .5rem 1rem;
    color: #fff;
    border: 1px solid;
    border-radius: 3px;
    cursor: pointer;
}
</style>