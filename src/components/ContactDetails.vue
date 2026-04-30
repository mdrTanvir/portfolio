<template>
  <section id="CONTACT" class="contain content-section !pt-4 md:!pt-6 lg:!pt-8">
    <UiHeading>Contact</UiHeading>

    <div class="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div class="lg:col-span-4">
        <div class="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 md:p-7">
          <div class="mb-6">
            <UiSubheading>Contact Details</UiSubheading>
          </div>
          <div class="flex flex-col gap-y-6">
          <UiAnimate :distance="20" class="flex gap-4">
            <Icon name="lucide:location-edit" class="mr-2"/>
            <div>
              <div class="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Location</div>
              <div class="text-base leading-7 text-gray-700 dark:text-gray-200">{{ siteData.address }}</div>
            </div>
          </UiAnimate>
          <UiAnimate :distance="20" class="flex gap-4">
            <Icon name="lucide:phone" class="mr-2"/>
            <div>
              <div class="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Phone</div>
              <div class="text-base leading-7 text-gray-700 dark:text-gray-200">{{ siteData.phone }}</div>
            </div>
          </UiAnimate>
          <UiAnimate :distance="20" class="flex gap-4">
            <Icon name="lucide:mail" class="mr-2"/>
            <div>
              <div class="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Email</div>
              <div class="text-base leading-7 text-gray-700 dark:text-gray-200">{{ siteData.email }}</div>
            </div>
          </UiAnimate>
        </div>
      </div>
      </div>


      <div class="relative lg:col-span-8">
        <div class="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/40 md:p-7">
          <UiSubheading>Let's Connect</UiSubheading>
        <div class="relative mt-6">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <UiAnimate :distance="20">
                <label for="name" class="form-label">Your Name</label>
                <input v-model="form.name" type="text" id="name" class="form-control" placeholder="John Doe" required>
              </UiAnimate>
            </div>
            <div class="form-group">
              <UiAnimate :distance="20">
                <label for="email" class="form-label">Your Email</label>
                <input v-model="form.email" type="email" id="email" class="form-control" placeholder="johndoe@example.com" required>
              </UiAnimate>
            </div>
            <div class="form-group">
              <UiAnimate :distance="20">
                <label for="message" class="form-label">Your message</label>
                <textarea v-model="form.message" id="message" class="form-control" required></textarea>
              </UiAnimate>
            </div>
            <div class="form-group">
              <UiAnimate :distance="20">
                <UiPrimaryButton
                    :loading="loading"
                    inverted
                    btnType="submit"
                    @click="submitForm"
                >Send Message
                </UiPrimaryButton>
              </UiAnimate>
            </div>
            <div v-if="result" :class="{'text-red-500':hasError , 'text-green-500':!hasError}" class="mt-4">
              {{ result }}
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import siteData from "../config/data/data";

const form = ref({
  access_key: "35e3f34e-706c-4437-adf0-e3c478a17fc0",
  subject: "New Message From Your Website | Web3Forms",
  name: "",
  email: "",
  message: "",
});

const loading = ref(false);
const hasError = ref(false);
const result = ref("");
const status = ref("");

const submitForm = async () => {
  const {name, email, message} = form.value;

  if (!name.trim() || !email.trim() || !message.trim()) {
    result.value = "All fields are required.";
    hasError.value = true;
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    result.value = "Please enter a valid email address.";
    hasError.value = true;
    return;
  }

  loading.value = true;
  result.value = "Please wait...";
  try {
    const response = await $fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: form.value,
    });

    console.log(response); // You can remove this line if you don't need it

    result.value = response.message;

    if (response.status === 200) {
      status.value = "success";
    } else {
      console.log(response); // Log for debugging, can be removed
      status.value = "error";
    }
  } catch (error) {
    console.log(error); // Log for debugging, can be removed
    hasError.value = true;
    status.value = "error";
    result.value = "Something went wrong!";
  } finally {
    // Reset form after submission
    form.value.name = "";
    form.value.email = "";
    form.value.message = "";

    loading.value = false;

    // Clear result and status after 5 seconds
    setTimeout(() => {
      hasError.value = false;
      result.value = "";
      status.value = "";
    }, 5000);
  }
};
</script>

<style scoped lang="scss">
.form-group {
  @apply mb-6;
}

.form-label {
  @apply block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300;
}

.form-control {
  @apply block w-full rounded-xl border border-gray-300 bg-white/80 px-4 py-3 text-base text-gray-900
  focus:border-sky-500 focus:ring-sky-500 dark:border-gray-700 dark:bg-gray-950/50 dark:placeholder-gray-400 dark:text-white;
}

.animateRotate {
  transform: scale(2);
  width: 200px;
  height: 200px;
  inset: 0;
  transform-origin: center center;
  position: absolute;
  bottom: 0;
  right: 0;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  0% {
    opacity: 0.4;
    transform: rotate(0deg) scale(1.5);
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.4;
    transform: rotate(-360deg) scale(1.5);
  }
}
</style>
