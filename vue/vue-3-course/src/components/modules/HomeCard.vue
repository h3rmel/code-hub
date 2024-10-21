<script lang="ts" setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  bgColor: {
    type: String,
    default: "bg-gray-100",
  },
  title: {
    type: String,
    default: "For Developers",
  },
  subtitle: {
    type: String,
    default: "Browse our Vue jobs and start your career today",
  },
  btnText: {
    type: String,
    default: "Browse Jobs",
  },
  btnHref: {
    type: String,
    default: "/",
  },
});
</script>

<template>
  <article :class="`${bgColor} p-6 rounded-lg shadow-md`">
    <h2 class="text-2xl font-bold">{{ title }}</h2>
    <p class="mt-2 mb-4">{{ subtitle }}</p>
    <RouterLink
      :to="btnHref"
      class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
    >
      {{ btnText }}
    </RouterLink>
  </article>
</template>
