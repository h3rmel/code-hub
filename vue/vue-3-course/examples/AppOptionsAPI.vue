<!-- Options API -->
<script lang="ts">
export default {
  data() {
    return {
      name: "Isaac Hermel",
      status: "active",
      tasks: [
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: true },
        { id: 3, title: "Task 3", completed: false },
        { id: 4, title: "Task 4", completed: true },
      ],
      link: "https://google.com",
    };
  },
  methods: {
    toggleStatus() {
      if (this.status === "active") {
        this.status = "pending";
      } else if (this.status === "pending") {
        this.status = "inactive";
      } else {
        this.status = "active";
      }
    },
  },
};
</script>

<template>
  <h1>Hello {{ name }}</h1>
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'pending'">User is pending</p>
  <p v-else>User is inactive</p>
  <!-- <button v-on:click="toggleStatus">Change status</button> -->
  <button @click="toggleStatus">Change status</button>
  <hr />
  <h3>Tasks</h3>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      - {{ task.title }} - {{ task.completed ? "Completed" : "Not completed" }}
    </li>
  </ul>
  <hr />
  <a :href="link" target="_blank">Click for Google</a>
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
</style>
