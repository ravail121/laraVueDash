<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="screen-fade"></div>
    <div class="spinner-container">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading:true
    };
  },
};
</script>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Adjust z-index to make sure it appears on top */
}

.screen-fade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
}

.spinner-container {
  z-index: 1; /* Place the spinner above the screen fade */
}
</style>
