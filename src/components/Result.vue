<template>
  <div v-if="answers.length > 0">
    {{ answers }}
  </div>
</template>

<script>
export default {
  props: {
    answers: {
      type: Array,
    },
  },
};
</script>

<style></style>
