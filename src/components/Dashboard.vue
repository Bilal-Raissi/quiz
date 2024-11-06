<template>
  <div :class="darkMode ? 'bg-dark text-white' : 'bg-body'">
    <div class="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div class="text-center">
        <h1>Welcome to the <span class="fw-bold">Frontend Quiz!</span></h1>
        <p>Pick a subject to get started.</p>
      </div>

      <!-- Dynamically generate subject buttons -->
      <div class="d-flex flex-column mt-4" style="width: 300px;">
        <router-link v-for="quiz in quizzes" :key="quiz.id" :to="`/quiz/${quiz.id}`"
          class="btn btn-outline-light mb-3 text-start">
          <i :class="quiz.icon"></i> {{ quiz.title }}
        </router-link>
      </div>

      <!-- Dark Mode Toggle -->
      <div class="form-check form-switch mt-5">
        <input class="form-check-input" type="checkbox" id="darkModeSwitch" v-model="darkMode">
        <label class="form-check-label" for="darkModeSwitch">
          <i :class="darkMode ? 'bi bi-moon' : 'bi bi-sun'"></i>
        </label>
      </div>

      <!-- Router View -->
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import quizzesData from '../data/quizzes.json'; // Assuming you have your quizzes data in this JSON

export default {
  setup() {
    const darkMode = ref(true); // Default dark mode
    const quizzes = ref([]); // Initialize quizzes

    // Load quizzes data dynamically
    quizzes.value = quizzesData;

    return {
      darkMode,
      quizzes,
    };
  },
};
</script>
