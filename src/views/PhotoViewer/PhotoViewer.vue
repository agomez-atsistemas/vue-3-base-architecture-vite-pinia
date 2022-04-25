<template>
  <div class="PhotoViewer">
    <BreedSelector />
    <PhotoSlide />
  </div>
</template>

<script setup lang="ts">
  import BreedSelector from '@/views/PhotoViewer/components/BreedSelector.vue';
  import PhotoSlide from '@/views/PhotoViewer/components/PhotoViewSlide.vue';
</script>

<style scoped lang="scss">
.PhotoViewer {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow: hidden;
  padding: 2.5vmin 0;
}

@media (min-width: 900px) {
  .PhotoViewer {
    flex-direction: row;
  }
}
</style>
