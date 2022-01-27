<template>
  <div>
    <div class="mainTimerDiv">
      <div class="sec my-2">
        {{ timer }}
      </div>
      <div class="timer my-2" :style="`width:${timer * 10}%`"></div>
    </div>
    <h2 class="my-2 bg-blue-400 p-2 rounded-xl">{{ data.fakeData[step].title }}</h2>
    <div class="my-4 bg-blue-300 p-2 rounded-xl" v-for="(item, idx) in data.fakeData[step].choices" :key="idx">
      <div @click="selectedAnswer(item)">
        {{ item }}
      </div>
    </div>
    <div class="userChoices flex items-center justify-center">
      <div
        v-for="item in data.fakeData"
        :key="item.answer"
        class="border rounded"
        :ref="`answer${item.answer}`"
      ></div>
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
      timer: 10,
      timerKiller: null,
    };
  },
  methods: {
    stepTimer() {
      this.timerKiller = setInterval(() => {
        this.timer -= 1;
      }, 1000);
    },
    clearTimerAndGoNext() {
      clearInterval(this.timerKiller);
      this.timer = 10;
      this.stepTimer();
    },
    async selectedAnswer(payload) {
      this.clearTimerAndGoNext();
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
    timer(val) {
      if (val < 0) {
        this.clearTimerAndGoNext();
        this.$refs[
          `answer${this.data.fakeData[this.step].answer}`
        ][0].classList.add("wrong");
        this.userChoices.push(false);
        this.step += 1;
      }
    },
  },
  mounted() {
    this.stepTimer();
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
.timer {
  height: 15px;
  border-radius: 3px;
  background-color: darkseagreen;
}
.mainTimerDiv {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.mainTimerDiv .sec {
  text-align: center;
}
</style>
