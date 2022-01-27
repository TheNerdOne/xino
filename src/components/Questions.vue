<template>
  <div>
    <StartPage v-if="started == false" @begin="begin($event)" />
    <Question v-if="started" :data="questionList" @end="Result($event)" />
    <Result v-if="showResult" :answers="userAnswers" :key="resultKey" />
  </div>
</template>

<script>
import fakeData from "../../config/data.json";
import Question from "./Question.vue";
import Result from "./Result.vue";
import StartPage from "./StartPage.vue";
export default {
  components: { StartPage, Question, Result },
  data() {
    return {
      started: false,
      questionList: [],
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
  },
  mounted() {
    this.questionList = fakeData;
  },
};
</script>

<style></style>
