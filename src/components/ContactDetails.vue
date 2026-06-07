<template>
  <section id="CONTACT" class="contain content-section !pt-4 md:!pt-6 lg:!pt-8">
    <UiHeading>Let's Talk</UiHeading>

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
              <div class="text-base leading-7 text-primary">{{ siteData.address }}</div>
            </div>
          </UiAnimate>
          <UiAnimate :distance="20" class="flex gap-4">
            <Icon name="lucide:phone" class="mr-2"/>
            <div>
              <div class="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Phone</div>
              <div class="text-base leading-7 text-primary">{{ siteData.phone }}</div>
            </div>
          </UiAnimate>
          <UiAnimate :distance="20" class="flex gap-4">
            <Icon name="lucide:mail" class="mr-2"/>
            <div>
              <div class="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Email</div>
              <div class="text-base leading-7 text-primary">{{ siteData.email }}</div>
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
            <input v-model="form.botcheck" type="checkbox" name="botcheck" class="hidden" tabindex="-1" autocomplete="off">
            <div class="form-group">
              <UiAnimate :distance="20">
                <label for="name" class="form-label">Your Name</label>
                <input v-model="form.name" type="text" id="name" class="form-control" placeholder="John Doe" required minlength="2" maxlength="80" autocomplete="name">
              </UiAnimate>
            </div>
            <div class="form-group">
              <UiAnimate :distance="20">
                <label for="email" class="form-label">Your Email</label>
                <input v-model="form.email" type="email" id="email" class="form-control" placeholder="johndoe@example.com" required maxlength="120" autocomplete="email">
              </UiAnimate>
            </div>
            <div class="form-group">
              <UiAnimate :distance="20">
                <label for="message" class="form-label">Your message</label>
                <textarea v-model="form.message" id="message" class="form-control" required minlength="10" maxlength="2000"></textarea>
              </UiAnimate>
            </div>
            <div class="form-group">
              <UiAnimate :distance="20">
                <UiPrimaryButton
                    :loading="loading"
                    inverted
                    btnType="submit"
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

const runtimeConfig = useRuntimeConfig()
const web3formsAccessKey = runtimeConfig.public.web3formsAccessKey

const form = ref({
  access_key: web3formsAccessKey,
  subject: "New message from tanvir-rahman-portfolio",
  from_name: "Tanvir Rahman Portfolio",
  name: "",
  email: "",
  message: "",
  botcheck: false,
});

const loading = ref(false);
const hasError = ref(false);
const result = ref("");
const status = ref("");

const submitForm = async () => {
  if (loading.value) return;

  const {name, email, message} = form.value;
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!form.value.access_key) {
    result.value = "Contact form is not configured yet.";
    hasError.value = true;
    return;
  }

  if (form.value.botcheck) {
    return;
  }

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    result.value = "All fields are required.";
    hasError.value = true;
    return;
  }

  if (trimmedName.length < 2 || trimmedName.length > 80 || trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
    result.value = "Please check your name and message length.";
    hasError.value = true;
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmedEmail) || trimmedEmail.length > 120) {
    result.value = "Please enter a valid email address.";
    hasError.value = true;
    return;
  }

  hasError.value = false;
  loading.value = true;
  result.value = "Please wait...";
  try {
    const response = await $fetch<{ success: boolean; message: string }>('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {
        ...form.value,
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      },
    });

    result.value = response.message;

    if (response.success) {
      status.value = "success";
    } else {
      hasError.value = true;
      status.value = "error";
    }
  } catch (error: any) {
    hasError.value = true;
    status.value = "error";
    result.value = error?.data?.statusMessage || error?.statusMessage || "Something went wrong!";
  } finally {
    // Reset form after submission
    form.value.name = "";
    form.value.email = "";
    form.value.message = "";
    form.value.botcheck = false;

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
