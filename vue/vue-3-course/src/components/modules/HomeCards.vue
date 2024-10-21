<script lang="ts" setup>
import HomeCard from "./HomeCard.vue";
</script>

<template>
  <section class="py-4 container-xl lg:container m-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
      <HomeCard
        bgColor="bg-gray-100"
        title="For Developers"
        subtitle="Browse our Vue jobs and start your career today"
        btnText="Browse Jobs"
        btnHref="/jobs"
      />
      <HomeCard
        bgColor="bg-green-100"
        title="For Employers"
        subtitle="List your job to find the perfect developer for the role"
        btnText="Add Job"
        btnHref="/jobs/add"
      />
    </div>
  </section>
</template>
