<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRoute } from "vue-router";
import DecodingText from "@/components/ui/DecodingText.vue";
import ContactLinks from "@/components/ui/ContactLinks.vue";
import { contactInfo } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

withDefaults(defineProps<{ headingTag?: string }>(), { headingTag: "h2" });

const { t, locale } = useI18n();
const route = useRoute();
const serviceIds = ["website", "eshop", "booking", "internal", "security", "other"] as const;
const sectionRef = ref<HTMLElement | null>(null);
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
let context: gsap.Context | undefined;

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

onMounted(() => {
  nextTick(() => {
    context = gsap.context(() => {
      const trigger = sectionRef.value;
      if (!trigger) return;

      gsap.from(".contact-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger,
          start: "top 85%",
        },
      });
    }, sectionRef.value || undefined);
  });
});

onBeforeUnmount(() => {
  context?.revert();
});
</script>

<template>
  <section
    id="contact"
    ref="sectionRef"
    class="relative mx-auto max-w-7xl px-4 py-24 sm:snap-start sm:px-6 md:py-32"
  >
    <div
      class="contact-card grid gap-12 overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-8 backdrop-blur-2xl md:grid-cols-2 md:p-16"
    >
      <div>
        <p class="mb-4 text-sm uppercase tracking-[0.25em] text-cyan-400">
          {{ t("contact.tag") }}
        </p>
        <DecodingText
          :key="locale"
          :as="headingTag"
          :text="t('contact.title')"
          :duration="1600"
          content-class="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
        />
        <p class="mb-10 text-lg text-slate-300">
          {{ t("contact.description") }}
        </p>

        <p class="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/80">
          {{ t("contact.directTitle") }}
        </p>
        <ContactLinks source="contact" />
        <p class="mt-6 flex items-center gap-3 text-slate-300">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-full bg-violet-400/10 text-violet-400"
            aria-hidden="true"
            >📍</span
          >
          <span>{{ contactInfo.location }}</span>
        </p>
      </div>

      <form class="space-y-6" @submit.prevent="submitForm">
        <div class="group relative">
          <input
            id="name"
            v-model.trim="form.name"
            type="text"
            name="name"
            autocomplete="name"
            placeholder=" "
            required
            class="peer w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
          />
          <label
            for="name"
            class="absolute left-6 top-4 origin-left -translate-y-1/2 scale-75 text-xs text-slate-500 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-400 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-cyan-400"
          >
            {{ t("contact.fullName") }}
          </label>
        </div>

        <div class="group relative">
          <input
            id="email"
            v-model.trim="form.email"
            type="email"
            name="email"
            autocomplete="email"
            placeholder=" "
            required
            class="peer w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
          />
          <label
            for="email"
            class="absolute left-6 top-4 origin-left -translate-y-1/2 scale-75 text-xs text-slate-500 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-400 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-cyan-400"
          >
            {{ t("contact.email") }}
          </label>
        </div>

        <div class="relative">
          <label for="service" class="mb-2 block text-xs text-slate-400">
            {{ t("contact.service") }}
          </label>
          <select
            id="service"
            v-model="form.service"
            name="service"
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-6 py-4 text-white outline-none transition focus:border-cyan-400/50"
          >
            <option v-for="id in serviceIds" :key="id" :value="id">
              {{ t(`contact.serviceOptions.${id}`) }}
            </option>
          </select>
        </div>

        <div class="group relative">
          <textarea
            id="message"
            v-model.trim="form.message"
            name="message"
            rows="4"
            placeholder=" "
            required
            class="peer w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
          ></textarea>
          <label
            for="message"
            class="absolute left-6 top-4 origin-left -translate-y-1/2 scale-75 text-xs text-slate-500 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-400 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-cyan-400"
          >
            {{ t("contact.details") }}
          </label>
        </div>

        <button
          type="submit"
          :disabled="submissionState === 'submitting'"
          class="w-full rounded-2xl bg-cyan-400 py-4 font-bold uppercase tracking-widest text-slate-950 transition hover:bg-cyan-300 active:scale-[0.98]"
          :class="{ 'cursor-wait opacity-70': submissionState === 'submitting' }"
        >
          {{
            submissionState === "submitting"
              ? t("contact.sending")
              : t("contact.send")
          }}
        </button>

        <p
          v-if="submissionState === 'success'"
          class="text-sm text-emerald-400"
          role="status"
        >
          {{ t("contact.success") }}
        </p>
        <p
          v-else-if="submissionState === 'error'"
          class="text-sm text-rose-400"
          role="alert"
        >
          {{ t("contact.error") }}
        </p>
      </form>
    </div>
  </section>
</template>
