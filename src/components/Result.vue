<template>
  <div v-if="answers.length > 0" class="flex flex-col text-right">
    <div class="animate-bounce duration-75">
      <span v-if="truthyLength < items.fakeData.length / 2"> خیلی داغونی نصف کمتر زدی :/ </span>
      <span v-else-if="truthyLength == items.fakeData.length"> بابا باریکلا آفرین </span>
      <span v-else> پررو نشو ولی حالا بد هم نبود آفرین </span>
    </div>
    <button class="p-3 bg-green-300 rounded-xl mt-4" type="button" @click="reset()">
      شروع دوباره
    </button>
  </div>
</template>

<script>
import questions from "../../config/data.json";

export default {
  props: {
    answers: {
      type: Array,
    },
  },
  data() {
    return {
      items: questions,
      truthyLength: 0,
    };
  },
  methods:{
    reset(){
      this.$emit('reset',true)
      this.truthyLength = 0
    }
  },
  created() {
    this.truthyLength = this.answers.filter(Boolean).length;
  },
};
</script>

<style scoped>
* {
  direction: rtl;
}
</style>
