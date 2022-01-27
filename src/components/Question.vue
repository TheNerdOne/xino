<template>
  <div>
    <h2>{{ data.fakeData[step].title }}</h2>
    <div v-for="(item, idx) in data.fakeData[step].choices" :key="idx">
      <div @click="selectedAnswer(item)">
        {{ item }}
      </div>
    </div>
    <div class="userChoices">
      <div
        v-for="item in data.fakeData"
        :key="item.answer"
        class="border rounded"
        :ref="`answer${item.answer}`"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      step: 0,
      userChoices: [],
    };
  },
  methods: {
    async selectedAnswer(payload) {
      await this.checkAnswer(payload);
      this.step++;
    },
    async checkAnswer(payload) {
      return new Promise((resolve) => {
        this.data.fakeData[this.step].answer == payload
          ? this.userChoices.push(true) &&
            this.$refs[
              `answer${this.data.fakeData[this.step].answer}`
            ][0].classList.add("right")
          : this.userChoices.push(false) &&
            this.$refs[
              `answer${this.data.fakeData[this.step].answer}`
            ][0].classList.add("wrong");
        resolve("resolve");
      });
    },
  },
  watch: {
    step(val) {
      if (val == 3) {
        this.$emit("end", { end: true, answers: this.userChoices });
      }
    },
  },
};
</script>

<style scoped>
.userChoices div {
  width: 10px;
  height: 10px;
  margin: auto 5px;
}
.userChoices {
  display: flex;
}
.rounded {
  border-radius: 100%;
}
.border {
  border: 1px solid;
}
.right {
  background-color: darkgreen;
}
.wrong {
  background-color: darkred;
}
</style>
