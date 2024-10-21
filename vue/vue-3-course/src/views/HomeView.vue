<script lang="ts" setup>
import { Hero, HomeCards, JobList } from "@/components";
</script>

<template>
  <Hero />
  <HomeCards />
  <JobList :limit="6" :showButton="true" />
</template>
