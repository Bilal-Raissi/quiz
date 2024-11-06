<template>
    <div :class="darkMode ? 'bg-dark text-white' : 'bg-body'">
        <div class="container d-flex align-items-center pt-3 ps-5">
            <i :class="quizData.icon"></i>
            <h3 class="mb-0">{{ quizData.title }}</h3>
        </div>

        <div class="container min-vh-100 d-flex flex-column justify-content-center align-items-center w-50">
            <div class="text-center">
                <p>Question {{ currentQuestionIndex + 1 }} of {{ quizData.questions.length }}</p>
                <h1>{{ currentQuestion.question }}</h1>

                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"
                        :style="{ width: progress + '%' }"></div>
                </div>
            </div>

            <!-- Buttons for Answers -->
            <div class="d-flex flex-column mt-4" style="width: 400px;">
                <button v-for="(answer, index) in currentQuestion.answers" :key="index"
                    class="btn btn-outline-light mb-3 text-start" :class="{ 'active': selectedAnswer === index }"
                    @click="selectAnswer(index)">
                    <i class="bi" :class="'bi-' + (index + 1) + '-square'"></i>
                    {{ answer }}
                </button>
                <button class="btn btn-primary btn-lg" @click="submitAnswer">Submit Answer</button>
            </div>

            <!-- Dark Mode Toggle -->
            <div class="form-check form-switch mt-5">
                <input class="form-check-input" type="checkbox" id="darkModeSwitch" v-model="darkMode">
                <label class="form-check-label" for="darkModeSwitch">
                    <i :class="darkMode ? 'bi bi-moon' : 'bi bi-sun'"></i>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute to access the route params
import quizzes from '../data/quizzes.json'; // Import quizzes.json

export default {
    setup() {
        const darkMode = ref(true); // For dark mode toggle
        const quizData = ref({}); // Initialize quiz data as an empty object
        const currentQuestionIndex = ref(0); // Track the current question index
        const selectedAnswer = ref(null); // Track the selected answer
        const score = ref(0); // Track the score
        const route = useRoute(); // Use useRoute to access the current route

        // Watch for changes in the route and update quizData accordingly
        watchEffect(() => {
            const quizId = route.params.quizSelected; // Get the selected quiz ID from the route params
            const selectedQuiz = quizzes.find(quiz => quiz.id === quizId);

            if (selectedQuiz) {
                quizData.value = selectedQuiz; // Update quizData when the correct quiz is found
            } else {
                console.error('Quiz not found'); // Handle error when quiz is not found
                quizData.value = {}; // Reset to an empty object if quiz is not found
            }
        });

        const selectAnswer = (index) => {
            selectedAnswer.value = index; // Set the selected answer
        };

        const submitAnswer = () => {
            if (selectedAnswer.value === null) {
                alert("Please select an answer!"); // Alert if no answer is selected
                return;
            }

            // Check if the selected answer is correct
            const isCorrect = selectedAnswer.value === currentQuestion.value.correctAnswerIndex; // Use currentQuestion.value
            if (isCorrect) {
                score.value++; // Increment the score if the answer is correct
            }

            // Move to the next question
            if (currentQuestionIndex.value < quizData.value.questions.length - 1) {
                currentQuestionIndex.value++;
                selectedAnswer.value = null; // Reset selected answer for the next question
            } else {
                // Show final score when quiz is completed
                alert(`Quiz completed! Your score is ${score.value} out of ${quizData.value.questions.length}`);
            }
        };

        // Get the current question based on the current index
        const currentQuestion = computed(() => {
            return quizData.value.questions ? quizData.value.questions[currentQuestionIndex.value] : {};
        });

        // Calculate the progress bar percentage
        const progress = computed(() => {
            return ((currentQuestionIndex.value + 1) / quizData.value.questions.length) * 100;
        });

        return {
            darkMode,
            quizData,
            currentQuestionIndex, // Track the current question index
            selectedAnswer, // Track the selected answer
            currentQuestion, // Access the current question
            progress, // Progress for the progress bar
            selectAnswer, // Method to select an answer
            submitAnswer, // Method to submit an answer
            score // Track the score
        };
    },
};
</script>
