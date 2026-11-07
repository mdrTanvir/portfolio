<template>
  <!-- About Section -->
  <section id="ABOUT" class="contain content-section !pt-0 md:!pt-0 lg:!pt-0 !pb-4 md:!pb-6 lg:!pb-8 about relative">
    <UiHeading class="z-10">About</UiHeading>

    <div class="mt-12 space-y-16">
      <div class="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-3 lg:pt-1">
          <UiSubheading>Profile</UiSubheading>
        </div>
        <div class="lg:col-span-9">
          <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white/70 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 sm:p-7 lg:p-8">
            <div class="min-w-0 space-y-[1.0625rem]">
              <template v-for="(description, n) in siteData.about" :key="n">
                <UiAnimate
                    class="block w-full"
                    direction="up"
                    :distance="16"
                    :duration="0.55"
                    :delay="0.08 + n * 0.12"
                    scrollTriggerStart="top 82%"
                    scrollTriggerEnd="top 68%"
                    :scrub="false"
                >
                  <p class="max-w-none break-words text-justify text-[14.5px] leading-7 tracking-[-0.01em] text-gray-600 [hyphens:auto] dark:text-gray-300 sm:text-[0.98rem] sm:leading-8">
                    {{ description }}
                  </p>
                </UiAnimate>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-3 lg:pt-1">
          <UiSubheading>Education</UiSubheading>
        </div>
        <div class="lg:col-span-9">
          <EducationTimeline/>
        </div>
      </div>
    </div>
  </section>

</template>
<script setup>
import siteData from "~/config/data/data";
</script>
