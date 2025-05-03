<template>
  <!-- From Uiverse.io by Smit-Prajapati -->
  <div class="card relative z-10 w-72 max-w-[280px] rounded-lg p-2 overflow-hidden">
    <div class="top-section relative h-[162px] flex flex-col rounded-xl">
      <div class="border"></div>
      <div class="icons">
        <div class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 94 94" class="svg">
            <path fill="white" d="M38.0481 4.82927C38.0481 2.16214 40.018 0 42.4481 0H51.2391C53.6692 0 55.6391 2.16214 55.6391 4.82927V40.1401C55.6391 48.8912 53.2343 55.6657 48.4248 60.4636C43.6153 65.2277 36.7304 67.6098 27.7701 67.6098C18.8099 67.6098 11.925 65.2953 7.11548 60.6663C2.37183 56.0036 3.8147e-06 49.2967 3.8147e-06 40.5456V4.82927C3.8147e-06 2.16213 1.96995 0 4.4 0H13.2405C15.6705 0 17.6405 2.16214 17.6405 4.82927V39.1265C17.6405 43.7892 18.4805 47.2018 20.1605 49.3642C21.8735 51.5267 24.4759 52.6079 27.9678 52.6079C31.4596 52.6079 34.0127 51.5436 35.6268 49.4149C37.241 47.2863 38.0481 43.8399 38.0481 39.0758V4.82927Z"></path>
            <path fill="white" d="M86.9 61.8682C86.9 64.5353 84.9301 66.6975 82.5 66.6975H73.6595C71.2295 66.6975 69.2595 64.5353 69.2595 61.8682V4.82927C69.2595 2.16214 71.2295 0 73.6595 0H82.5C84.9301 0 86.9 2.16214 86.9 4.82927V61.8682Z"></path>
            <path fill="white" d="M2.86102e-06 83.2195C2.86102e-06 80.5524 1.96995 78.3902 4.4 78.3902H83.6C86.0301 78.3902 88 80.5524 88 83.2195V89.1707C88 91.8379 86.0301 94 83.6 94H4.4C1.96995 94 0 91.8379 0 89.1707L2.86102e-06 83.2195Z"></path>
          </svg>
        </div>
        <!--        <div class="social-media">-->
        <!--          <Icon name="lucid:github" class="w-4 h-4"/>-->
        <!--          <Icon name="lucid:github" class="w-4 h-4"/>-->
        <!--          <Icon name="lucid:github" class="w-4 h-4"/>-->
        <!--        </div>-->
      </div>
      <img :src="project.photo" alt="img"
           width="280px"
           height="200px"
           class="absolute z-[1] top-0 left-0 object-cover object-center w-full h-full rounded-xl"
           loading="lazy"
      />
    </div>
    <div class="bottom-section">
      <div class="block h-10">{{ project.name }}</div>
      <div class="flex flex-wrap gap-x-2 mt-3">
        <div v-for="skill in project.skills">
          <div class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ skill }},</div>
        </div>
      </div>
      <div class="row text-gray-800 dark:text-gray-300">
        <div class="item">
          <span class="block text-sm">
            <a v-if="project.link" :href="project.link"
               target="_blank"
               rel="noopener noreferrer"
               data-hover-text="Live"
               class="flex items-center gap-2 text-primary text-primary-hover">
               <Icon name="lucide:external-link" class="w-4 h-4"/>
               <span class="font-bold">Live</span>
            </a>
          </span>
          <!--          <span class="block text-[10px]">UI elements</span>-->
        </div>
        <div class="item">
          <span class="block text-sm">Type</span>
          <span class="block text-[12px]">{{ project.type }}</span>
        </div>
        <div class="item">
          <span class="block text-sm">{{ project.year }}</span>
          <!--          <span class="block text-[10px]">Contributors</span>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss">
//@media (prefers-color-scheme: dark) {
//  :root {
//    --cardColor: #0f1424;
//  }
//}

html.dark {
  --cardColor: #0f1424;
}

html.light {
  //--cardColor: #b6c5f6;
  --cardColor: #cfd8f8;
}
</style>

<style scoped lang="scss">
.card {
  background: var(--cardColor);
  box-shadow: rgba(20, 20, 20, 0.2) 0 7px 20px 0;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

//.card:hover {
//  transform: scale(1.05);
//}

.card .top-section {
  background: linear-gradient(45deg, rgb(4, 159, 187) 0%, rgb(80, 246, 255) 100%);
}

.card .top-section .border {
  border-bottom-right-radius: 10px;
  height: 30px;
  width: 130px;
  background: var(--cardColor);
  position: relative;
  z-index: 2;
  transform: skew(-40deg);
  box-shadow: -10px -10px 0 0 var(--cardColor);
  border: none;
}

.card .top-section .border::before {
  content: "";
  position: absolute;
  z-index: 2;
  width: 15px;
  height: 15px;
  top: 0;
  right: -15px;
  background: rgba(255, 255, 255, 0);
  border-top-left-radius: 10px;
  box-shadow: -5px -5px 0 2px var(--cardColor);
}

.card .top-section::before {
  content: "";
  position: absolute;
  z-index: 2;
  top: 30px;
  left: 0;
  background: rgba(255, 255, 255, 0);
  height: 15px;
  width: 15px;
  border-top-left-radius: 15px;
  box-shadow: -5px -5px 0 2px var(--cardColor);
}

.card .top-section .icons {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
}

.card .top-section .icons .logo {
  height: 100%;
  aspect-ratio: 1;
  padding: 7px 0 7px 15px;
}

.card .top-section .icons .logo .top-section {
  height: 100%;
}

.card .top-section .icons .social-media {
  height: 100%;
  padding: 8px 15px;
  display: flex;
  gap: 7px;
}

//.card .top-section .icons .social-media .svg {
//  height: 100%;
//  fill: #1b233d;
//}

//.card .top-section .icons .social-media .svg:hover {
//  fill: white;
//}

.card .bottom-section {
  margin-top: 15px;
  padding: 10px 5px;
  overflow: hidden;
}

.card .bottom-section .row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.card .bottom-section .row .item {
  flex: 30%;
  text-align: center;
  padding: 5px;
}

.card .bottom-section .row .item:nth-child(2) {
  border-left: 1px solid rgba(255, 255, 255, 0.126);
  border-right: 1px solid rgba(255, 255, 255, 0.126);
}
html.light {
  .card .bottom-section .row .item:nth-child(2) {
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    border-right: 1px solid rgba(0, 0, 0, 0.2);
  }
}
</style>