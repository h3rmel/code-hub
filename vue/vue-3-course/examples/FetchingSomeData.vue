<script lang="ts" setup>
import { ref, type Ref, onMounted } from "vue";

const tasks: Ref<{ id: number; title: string; completed: boolean }[]> = ref([]);

const newTaskData: Ref<{ title: string; completed: boolean }> = ref({
  title: "",
  completed: false,
});

function addTask() {
  if (newTaskData.value.title.trim() !== "") {
    tasks.value.push({
      id: tasks.value.length + 1,
      title: newTaskData.value.title,
      completed: newTaskData.value.completed,
    });
    newTaskData.value.title = "";
    newTaskData.value.completed = false;
  }
}

function deleteTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id);
}

onMounted(async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");

    const data = await response.json();

    tasks.value = data.map(
      (dataTask: {
        id: number;
        title: string;
        userId: string;
        completed: boolean;
      }) => ({
        id: dataTask.id,
        title: dataTask.title,
        completed: dataTask.completed,
      })
    );
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <main
    class="p-16 max-w-7xl mx-auto w-full min-h-screen flex flex-col space-y-4 items-center justify-center"
  >
    <h1 class="text-3xl font-semibold tracking-wider">Tasks</h1>
    <article class="card">
      <form @submit.prevent="addTask" class="card-body">
        <div class="form-group">
          <div class="form-field">
            <label for="newTaskTitle" class="form-label">Title</label>
            <input
              class="input"
              type="text"
              name="newTaskTitle"
              id="newTaskTitle"
              v-model="newTaskData.title"
            />
          </div>
          <div class="form-field">
            <label for="newTaskCompleted" class="flex cursor-pointer gap-2">
              <input
                type="checkbox"
                class="checkbox"
                name="newTaskCompleted"
                id="newTaskCompleted"
                v-model="newTaskData.completed"
              />
              <span>Completed</span>
            </label>
          </div>
          <div class="form-field">
            <div class="form-control">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </article>
    <!-- <p v-if="tasks.values.length === 0">Nothing to see here.</p> -->
    <div class="flex w-full overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <th>
              {{ task.id }}
            </th>
            <td>
              {{ task.title }}
            </td>
            <td>
              {{ task.completed ? "Completed" : "Not completed" }}
            </td>
            <td>
              <button
                class="btn btn-error btn-circle"
                @click="deleteTask(task.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
