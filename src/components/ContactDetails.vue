<template>
  <section id="CONTACT" tabindex="-1" class="contain content-section contact-section">
    <div class="contact-panel">
      <div class="contact-copy"><p class="eyebrow">05 / Get in touch</p><h2>Let’s talk about<br/>your team.</h2><p class="contact-intro">Hiring in software, data or IT support? Explore my CV or get in touch to discuss the role.</p>
        <a class="contact-email" :href="`mailto:${siteData.email}`">{{ siteData.email }} <span aria-hidden="true">↗</span></a>
        <div class="contact-buttons"><a :href="`mailto:${siteData.email}`" class="action action-primary">Write an email <span aria-hidden="true">↗</span></a><button type="button" class="action" @click="copyEmail">{{ copied ? 'Copied ✓' : 'Copy email' }}</button></div><p class="copy-status" role="status" aria-live="polite">{{ copyStatus }}</p>
        <dl class="contact-facts"><div><dt>Based in</dt><dd>{{ siteData.address }}</dd></div><div><dt>Phone</dt><dd><a :href="`tel:${siteData.phone.replace(/ /g, '')}`">{{ siteData.phone }}</a></dd></div></dl>
        <a :href="siteData.cvLink" download aria-label="Download CV (PDF)" class="text-link">Download my CV <span aria-hidden="true">↓</span></a>
      </div>
      <div class="contact-form-panel">
        <h3>Send a message</h3><p class="form-intro">Tell me a little about the opportunity.</p>
        <form @submit.prevent="submitForm" :aria-busy="loading">
          <input v-model="form.botcheck" type="checkbox" name="botcheck" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
          <div class="field-row"><div class="form-group"><label for="name">Your name</label><input v-model="form.name" type="text" id="name" name="name" placeholder="Name" required minlength="2" maxlength="80" autocomplete="name" :disabled="loading"></div><div class="form-group"><label for="email">Your email</label><input v-model="form.email" type="email" id="email" name="email" placeholder="you@company.com" required maxlength="120" autocomplete="email" :disabled="loading"></div></div>
          <div class="form-group"><label for="message">Your message</label><textarea v-model="form.message" id="message" name="message" placeholder="The role, your team, or a project you have in mind…" required minlength="10" maxlength="2000" rows="5" aria-describedby="message-help" :disabled="loading"></textarea><div class="message-help"><span id="message-help">At least 10 characters</span><span>{{ form.message.length }} / 2000</span></div></div>
          <button class="action action-primary send-button" type="submit" :disabled="loading"><span v-if="loading" class="sending-indicator" aria-hidden="true"></span>{{ loading ? 'Sending…' : 'Send message' }} <span v-if="!loading" aria-hidden="true">↗</span></button>
          <p v-if="result" class="form-result" :class="hasError ? 'is-error' : 'is-success'" role="status" aria-live="polite">{{ result }}</p>
        </form>
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
const copied = ref(false)
const copyStatus = ref('')
let copyTimer: ReturnType<typeof setTimeout> | undefined
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(siteData.email)
    copied.value = true
    copyStatus.value = 'Email address copied.'
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copied.value = false }, 3000)
  } catch {
    copyStatus.value = 'Copy is unavailable. Select the email address or use the email link.'
  }
}
onBeforeUnmount(() => clearTimeout(copyTimer))

const submitForm = async () => {
  if (loading.value) return;

  const {name, email, message} = form.value;
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!form.value.access_key) {
    result.value = "Please use the email link to contact me directly.";
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

    result.value = response.success ? "Thanks for reaching out. Your message has been sent." : "Your message could not be sent. Please try again or use the email link.";

    if (response.success) {
      status.value = "success";
    } else {
      hasError.value = true;
      status.value = "error";
    }
  } catch (error: any) {
    hasError.value = true;
    status.value = "error";
    result.value = "Your message could not be sent. Please try again or email me directly.";
  } finally {
    if (status.value === "success") {
      form.value.name = "";
      form.value.email = "";
      form.value.message = "";
      form.value.botcheck = false;
    }

    loading.value = false;


  }
};
</script>

<style scoped>
.contact-panel { display:grid;grid-template-columns:1fr 1.1fr;gap:64px;border:1px solid var(--line);border-radius:24px;padding:clamp(24px,4vw,48px);background:var(--surface);box-shadow:var(--shadow); }
h2 {margin-top:18px;font-size:clamp(2.1rem,4vw,3.2rem);line-height:1.08;letter-spacing:-.05em;font-weight:550}
.contact-intro {margin-top:24px;font-size:.94rem;line-height:1.8;color:var(--muted);max-width:37ch}
.contact-email {display:flex;align-items:center;gap:14px;margin-top:22px;min-height:44px;font-size:clamp(.8rem,1.5vw,1.05rem);font-weight:550;letter-spacing:-.02em;color:var(--accent);overflow-wrap:anywhere}
.contact-buttons {display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.contact-buttons .action {font-size:.78rem;padding:12px 15px}
.copy-status {font-size:.75rem;color:var(--muted);line-height:1.5;min-height:1.5em;margin-top:8px}
.contact-facts {margin-top:24px;padding-top:20px;border-top:1px solid var(--line);display:grid;gap:14px;font-size:.8rem}
.contact-facts dt {color:var(--muted);font-size:.7rem;margin-bottom:4px}.contact-facts dd {line-height:1.6}.contact-facts a {color:var(--ink)}
.contact-copy>.text-link {margin-top:16px}
h3 {font-size:1.2rem;font-weight:600;letter-spacing:-.025em}.form-intro {color:var(--muted);font-size:.85rem;line-height:1.7;margin-top:6px}
form {margin-top:24px}.field-row {display:grid;grid-template-columns:1fr 1fr;gap:16px}.form-group {margin-bottom:20px;min-width:0}
label {display:block;font-size:.78rem;font-weight:600;margin-bottom:8px}
input:not([type=checkbox]),textarea {display:block;width:100%;border:1px solid var(--control-border);border-radius:8px;background:var(--page);color:var(--ink);padding:12px 14px;font-size:16px;line-height:1.5;transition:border-color .18s;min-height:48px}
textarea {resize:vertical;min-height:140px}input::placeholder,textarea::placeholder {color:var(--muted);opacity:.8;font-size:.85rem}
input:focus,textarea:focus {border-color:var(--accent)}
.message-help {display:flex;justify-content:space-between;font-size:.65rem;color:var(--muted);margin-top:8px}
.send-button {width:100%;justify-content:center}
.form-result {margin-top:16px;padding:12px 14px;border:1px solid var(--line);border-radius:8px;font-size:.82rem;line-height:1.7;background:var(--soft)}
.is-error {border-color:#b75555;color:#a52e2e}:global(.dark .contact-section .is-error){color:#ffaaaa}
.sending-indicator {height:12px;width:12px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:900px){.contact-panel{gap:32px}.field-row{grid-template-columns:1fr;gap:0}}
@media(max-width:767px){.contact-panel{grid-template-columns:1fr;gap:32px;padding:24px;border-radius:18px}.contact-form-panel{border-top:1px solid var(--line);padding-top:28px}.contact-intro{max-width:none}.contact-email{font-size:.92rem}}
</style>
