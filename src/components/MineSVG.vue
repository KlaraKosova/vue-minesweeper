<template>
  <svg width="26px" height="26px">
    <!-- base -->
    <rect fill="#000" width="14" height="14" x="6" y="6"></rect>
    <!-- highlight -->
    <rect fill="#fff" width="4" height="4" x="8" y="8"></rect>
    <!-- sides -->
    <rect fill="#000" height="2" width="10" x="8" y="4"></rect>
    <rect fill="#000" height="2" width="10" x="8" y="20"></rect>
    <rect fill="#000" height="10" width="2" x="4" y="8"></rect>
    <rect fill="#000" height="10" width="2" x="20" y="8"></rect>
    <!-- main axes spikes -->
    <rect fill="#000" height="4" width="2" x="12" y="0"></rect>
    <rect fill="#000" height="4" width="2" x="12" y="22"></rect>
    <rect fill="#000" height="2" width="4" x="0" y="12"></rect>
    <rect fill="#000" height="2" width="4" x="22" y="12"></rect>
    <!-- small spikes on diagonal axes -->
    <rect fill="#000" height="2" width="2" x="4" y="4"></rect>
    <rect fill="#000" height="2" width="2" x="22" y="22"></rect>
    <rect fill="#000" height="2" width="2" x="4" y="22"></rect>
    <rect fill="#000" height="2" width="2" x="22" y="4"></rect>
  </svg>
</template>

<script>
export default {
  name: 'MineSVG'
}
</script>

<style scoped>

</style>
