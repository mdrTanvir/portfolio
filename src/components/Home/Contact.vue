<template>
  <section id="CONTACT" class="contain relative">
    <UiHeading>Contact</UiHeading>

    <div class="grid gap-4 mx-4 my-10 sm:grid-cols-12">
      <div class="col-span-12 sm:col-span-6 mb-8">
        <div class="flex flex-col gap-y-6">
          <UiAnimate :distance="20" class="flex gap-4">
            <Icon name="lucide:location-edit" class="mr-2"/>
            <div>
              <div class="mb-2">Address</div>
              <div class="text-lg">{{ siteData.address }}</div>
            </div>
          </UiAnimate>
          <UiAnimate :distance="20" class="flex gap-4">
            <Icon name="lucide:phone" class="mr-2"/>
            <div>
              <div class="mb-2">Phone</div>
              <div class="text-lg">{{ siteData.phone }}</div>
            </div>
          </UiAnimate>
          <UiAnimate :distance="20" class="flex gap-4">
            <Icon name="lucide:mail" class="mr-2"/>
            <div>
              <div class="mb-2">Email</div>
              <div class="text-lg">{{ siteData.email }}</div>
            </div>
          </UiAnimate>
        </div>
      </div>


      <div class="relative col-span-12 px-4 space-y-6 sm:col-span-6">
        <UiSubheading>Let's Talk</UiSubheading>
        <div class="col-span-12 space-y-12 relative sm:col-span-8 sm:space-y-8">
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
                    inverted
                    @click="submitForm"
                >Send Message
                </UiPrimaryButton>
              </UiAnimate>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import siteData from "../../config/data";

const form = ref({
  access_key: "35e3f34e-706c-4437-adf0-e3c478a17fc0",
  subject: "New Message From Your Website | Web3Forms",
  name: "",
  email: "",
  message: "",
});

const result = ref("");
const status = ref("");

const submitForm = async () => {
  result.value = "Please wait...";
  try {
    const response = await $fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    status.value = "error";
    result.value = "Something went wrong!";
  } finally {
    // Reset form after submission
    form.value.name = "";
    form.value.email = "";
    form.value.message = "";

    // Clear result and status after 5 seconds
    setTimeout(() => {
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
  @apply block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300;
}

.form-control {
  @apply bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg
  focus:ring-blue-500 focus:border-blue-500 block w-full max-w-[500px] p-2.5
  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
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