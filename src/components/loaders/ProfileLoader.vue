<template>
    <div class="loader"></div>
</template>

<style scoped>
  .loader {
        width: 84px;
        height: 84px;
        position: relative;
        overflow: hidden;
      }
      .loader:before , .loader:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        width:64px;
        height: 64px;
        border-radius: 50%;
        background:#00BC7D;
        transform: translate(-50% , 100%)  scale(0);
        animation: push 2s infinite ease-in;
      }
      .loader:after {
      animation-delay: 1s;
      }
      @keyframes push {
          0% {
            transform: translate(-50% , 100%)  scale(1);
          }
          15% , 25%{
            transform: translate(-50% , 50%)  scale(1);
          }
        50% , 75% {
            transform: translate(-50%, -30%) scale(0.5);
          }
        80%,  100% {
            transform: translate(-50%, -50%) scale(0);
          }
      }
  
</style>

  <!-- #00BC7D -->