<template>
  <section class="contain content-section">
    <UiHeading>Contact</UiHeading>

    <div class="grid gap-4 mx-4 my-10 sm:grid-cols-12">
      <div class="col-span-12 sm:col-span-3">
        <UiSubheading>Let's Talk</UiSubheading>
      </div>
      <div class="relative col-span-12 px-4 space-y-6 sm:col-span-9">
        <div class="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8">
          <form action="/">
            <div class="form-group">
              <UiAnimate :distance="20">
                <label for="name" class="form-label">Your Name</label>
                <input type="text" id="name" class="form-control" placeholder="John Doe" required>
              </UiAnimate>
            </div>
            <div>

              <UiAnimate :distance="20">
                <label for="email" class="form-label">Your Email</label>
                <input type="email" id="email" class="form-control" placeholder="johndoe@example.com" required>
              </UiAnimate>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.form-group {
  @apply mb-6;
}

.form-label {
  @apply block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300;
}

.form-control {
  @apply bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg
  focus:ring-blue-500 focus:border-blue-500 block w-full max-w-[500px] p-2.5
   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
}
</style>