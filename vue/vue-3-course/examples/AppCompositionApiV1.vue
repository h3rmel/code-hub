<script lang="ts" setup>
import { onMounted, ref, type Ref } from "vue";

const name = "Isaac Hermel";
const status: Ref<"active" | "inactive" | "pending"> = ref("active");
const tasks: Ref<{ id: number; title: string; completed: boolean }[]> = ref([
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
]);
const newTask: Ref<{ title: string; completed: boolean }> = ref({
  title: "",
  completed: false,
});

function toggleStatus() {
  if (status.value === "active") {
    status.value = "pending";
  } else if (status.value === "pending") {
    status.value = "inactive";
  } else {
    status.value = "active";
  }
}

function addTask() {
  if (newTask.value.title.trim() !== '') {
    tasks.value.push({
      id: tasks.value.length + 1,
      title: newTask.value.title,
      completed: newTask.value.completed,
    });
    newTask.value.title = '';
    newTask.value.completed = false;
  }
}

function deleteTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id);
}


</script>

<template>
  <h1>Hello {{ name }}</h1>
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'pending'">User is pending</p>
  <p v-else>User is inactive</p>
  <button v-on:click="toggleStatus">Change status</button>
  <button @click="toggleStatus">Change status</button>
  <hr />
  <h3>Tasks</h3>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <span>
        - {{ task.title }} - {{ task.completed ? "Completed" : "Not completed" }}
      </span>
      <button @click="deleteTask(task.id)">
        x
      </button>
    </li>
  </ul>
  <hr />
  <form @submit.prevent="addTask">
    <label for="newTaskTitle">Title</label>
    <input type="text" name="newTaskTitle" id="newTaskTitle" v-model="newTask.title">
    <label for="newTaskCompleted">Completed</label>
    <input type="checkbox" name="newTaskCompleted" id="newTaskCompleted" v-model="newTask.completed">
    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
* {
  font-family: sans-serif;
}

h1 {
  font-size: 1.5rem;
}

ul {
  list-style: none;
}

button {
  display: inline-flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 1rem;
  border: 0;
  background-color: #007bff;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  font-weight: 300;
  transition: 300ms;
}

button:hover {
  background-color: #0056b3;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
