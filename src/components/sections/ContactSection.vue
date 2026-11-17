<script setup lang="ts">
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import ContactLinks from "@/components/ui/ContactLinks.vue";
import { useLocalePath } from "@/composables/useLocalePath";
import { contactInfo } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

withDefaults(defineProps<{ headingTag?: string }>(), { headingTag: "h2" });

const { t } = useI18n();
const route = useRoute();
const { to } = useLocalePath();
const serviceIds = ["website", "eshop", "booking", "internal", "maintenance", "security", "other"] as const;
const form = reactive({
  name: "",
  email: "",
  service: serviceIds.includes(route.query.service as (typeof serviceIds)[number])
    ? (route.query.service as string)
    : "website",
  message: "",
});
const submissionState = ref<"idle" | "submitting" | "success" | "error">("idle");
const formspreeId = import.meta.env.VITE_FORMSPREE_ID?.trim();

const submitForm = async () => {
  if (submissionState.value === "submitting") return;

  submissionState.value = "submitting";

  if (!formspreeId) {
    const subject = encodeURIComponent(t("contact.emailSubject"));
    const body = encodeURIComponent(
      `${t("contact.fullName")}: ${form.name}\n${t("contact.email")}: ${form.email}\n${t("contact.service")} ${t(`contact.serviceOptions.${form.service}`)}\n\n${form.message}`,
    );

    trackEvent("Quote form", { mode: "mailto", service: form.service });
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    submissionState.value = "idle";
    return;
  }

  try {
    const response = await fetch(
      `https://formspree.io/f/${encodeURIComponent(formspreeId)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: t(`contact.serviceOptions.${form.service}`),
          message: form.message,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Form submission failed with status ${response.status}`);
    }

    form.name = "";
    form.email = "";
    form.message = "";
    submissionState.value = "success";
    trackEvent("Quote form", { mode: "formspree", service: form.service });
  } catch {
    submissionState.value = "error";
  }
};

</script>

<template>
  <section id="contact" class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
    <div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
      <div class="min-w-0 lg:col-span-6">
        <component :is="headingTag" class="section-title mb-6 text-balance" data-reveal>{{ t("contact.title") }}</component>
        <p class="mb-10 max-w-xl text-lg leading-relaxed text-slate-300" data-reveal>
          {{ t("contact.description") }}
        </p>

        <p class="mb-4 font-medium text-white">{{ t("contact.directTitle") }}</p>
        <ContactLinks source="contact" />
        <p class="mt-6 text-slate-400">{{ contactInfo.location }}</p>
      </div>

      <form class="space-y-5 lg:col-span-6" @submit.prevent="submitForm">
        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label for="name" class="mb-2 block text-sm font-medium text-slate-200">{{ t("contact.fullName") }}</label>
            <input id="name" v-model.trim="form.name" type="text" name="name" autocomplete="name" required class="field" />
          </div>
          <div>
            <label for="email" class="mb-2 block text-sm font-medium text-slate-200">{{ t("contact.email") }}</label>
            <input id="email" v-model.trim="form.email" type="email" name="email" autocomplete="email" required class="field" />
          </div>
        </div>

        <div>
          <label for="service" class="mb-2 block text-sm font-medium text-slate-200">{{ t("contact.service") }}</label>
          <select id="service" v-model="form.service" name="service" class="field">
            <option v-for="id in serviceIds" :key="id" :value="id">
              {{ t(`contact.serviceOptions.${id}`) }}
            </option>
          </select>
        </div>

        <div>
          <label for="message" class="mb-2 block text-sm font-medium text-slate-200">{{ t("contact.details") }}</label>
          <textarea id="message" v-model.trim="form.message" name="message" rows="5" required class="field resize-y"></textarea>
        </div>

        <button
          type="submit"
          :disabled="submissionState === 'submitting'"
          class="btn-primary clickable w-full py-4 sm:w-auto sm:px-10"
          :class="{ 'cursor-wait opacity-70': submissionState === 'submitting' }"
        >
          {{ submissionState === "submitting" ? t("contact.sending") : t("contact.send") }}
        </button>

        <p class="text-sm text-slate-400">
          {{ t("contact.privacyNote") }}
          <router-link :to="to('privacy')" class="text-link">{{ t("contact.privacyLink") }}</router-link>
        </p>

        <p v-if="submissionState === 'success'" class="text-emerald-400" role="status">
          {{ t("contact.success") }}
        </p>
        <p v-else-if="submissionState === 'error'" class="text-rose-400" role="alert">
          {{ t("contact.error") }}
        </p>
      </form>
    </div>
  </section>
</template>
