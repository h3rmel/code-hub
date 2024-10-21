<script lang="ts" setup>
import type { IJob } from "@/types/jobs";
import { defineProps, type PropType, ref, computed, type Ref } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  job: {
    type: Object as PropType<IJob>,
    required: true,
  },
});

const showFullDescription: Ref<boolean> = ref(false);

const truncatedDescription = computed(() => {
  let description = props.job.description;

  if (!showFullDescription.value)
    description = description.substring(0, 150) + "...";
  else description = props.job.description;

  return description;
});

function toggleFullDescription() {
  showFullDescription.value = !showFullDescription.value;
}
</script>

<template>
  <article class="bg-white rounded-xl shadow-md relative">
    <div class="p-4 flex flex-col gap-4">
      <div>
        <div class="text-gray-600 my-2">{{ job.type }}</div>
        <h3 class="text-xl font-bold">{{ job.title }}</h3>
      </div>

      <div class="text-justify">
        {{ truncatedDescription }}
        <button
          @click="toggleFullDescription"
          class="text-green-500 hover:text-green-600"
        >
          {{ showFullDescription ? "Show Less" : "Show More" }}
        </button>
      </div>

      <h3 class="text-green-500 mb-2">{{ job.salary }} / Year</h3>

      <div class="border border-gray-100"></div>

      <div class="flex flex-col lg:flex-row justify-between items-center">
        <div class="text-orange-600">
          <i class="pi pi-map-marker text-orange-500"></i>
          {{ job.location }}
        </div>
        <RouterLink
          :to="'/jobs/' + job.id"
          class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Read More
        </RouterLink>
      </div>
    </div>
  </article>
</template>
