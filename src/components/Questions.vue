<template>
  <div class="w-56 h-screen m-auto flex items-center justify-center">
    <StartPage v-if="started == false" @begin="begin($event)" />
    <Question v-if="started" @end="Result($event)" />
    <Result
      v-if="showResult"
      :answers="userAnswers"
      :key="resultKey"
      @reset="resetGame($event)"
    />
  </div>
</template>

<script>
import Question from "./Question.vue";
import Result from "./Result.vue";
import StartPage from "./StartPage.vue";
export default {
  components: { StartPage, Question, Result },
  data() {
    return {
      started: false,
      showResult: false,
      userAnswers: [],
      resultKey: 0,
    };
  },
  methods: {
    begin(payload) {
      this.started = payload;
    },
    Result(payload) {
      this.userAnswers = payload.answers;
      this.showResult = payload.end;
      this.resultKey += 1;
      this.started = null;
    },
    resetGame(payload) {
      if (payload) {
        this.started = false;
        this.showResult = false;
        this.userAnswers = [];
        this.resultKey = 0;
      }
    },
  },
};
</script>

<style></style>
