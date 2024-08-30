<template>
  <div class="container">
    <img src="./assets/logo.svg" />
    <h1>Task list</h1>
    <div class="top-section">
      <input
        v-model="newTask"
        :placeholder="searchMode ? 'Search tasks' : 'Add new task'"
        @keydown.enter="searchMode ? searchData() : createTask()" />
      <button
        @click="
          searchMode
            ? (fetchData(), (searchMode = !searchMode))
            : (searchMode = !searchMode)
        ">
        current state: {{ searchMode ? "search data" : "add data" }}
      </button>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="item in data" :key="item.id">
        <span v-if="!item.editable">{{ item.content }}</span>
        <input v-else v-model="item.content" />
        <div class="actions">
          <button
            @click="
              item.editable
                ? saveTask(item.id, item.content)
                : editTask(item.id)
            "
            class="icon icon--save">
            {{ item.editable ? "Save ✅" : "📝" }}
          </button>
          <button
            @click="
              item.editable ? (item.editable = false) : deleteTask(item.id)
            "
            class="icon">
            {{ item.editable ? "Exit ❌" : "❌" }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const data = ref([]);
const loading = ref(true);
const searchMode = ref(false);
const error = ref(null);
const newTask = ref("");

function editTask(id) {
  const task = data.value.find((task) => task.id === id);
  task.editable = !task.editable;
}

function saveTask(id, content) {
  const task = data.value.find((task) => task.id === id);
  task.editable = false;
  axios.put(`http://localhost:3002/api/tasks/${id}`, { content });
}

const deleteTask = async function (id) {
  try {
    await axios.delete(`http://localhost:3002/api/tasks/${id}`);
    data.value = data.value.filter((item) => item.id !== id);
  } catch (err) {
    error.value = "Failed to delete task";
  }
};

const createTask = async () => {
  if (!newTask.value.trim()) return;
  try {
    const response = await axios.post("http://localhost:3002/api/tasks", {
      content: newTask.value,
    });
    data.value.push(response.data);
    newTask.value = "";
  } catch (err) {
    error.value = "Failed to create task";
  }
};

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:3002/api/tasks");
    data.value = response.data;
  } catch (err) {
    error.value = "Failed to load data";
  } finally {
    loading.value = false;
  }
};

const searchData = async () => {
  try {
    const response = await axios.get("http://localhost:3002/api/tasks", {
      params: {
        search: newTask.value,
      },
    });
    data.value = response.data;
  } catch (err) {
    error.value = "Failed to search data";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style>
.container {
  padding: 0 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
}
h1 {
  color: black;
  font-style: normal;
  font-weight: bold;
}

img {
  max-height: 25px;
}

input {
  max-width: 400px;
  padding: 0.75em;
  border-radius: 8px;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.icon {
  height: 40px;
  font-size: 14px;
  color: red;
  cursor: pointer;
}

.icon--save {
  color: green;
}

.top-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.top-section button {
  height: 40px;
  background-color: #3d76b8;
  border-radius: 8px;
  color: #fff;
  font-weight: semibold;
  border: none;
}
</style>
