<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DecodingText from "@/components/ui/DecodingText.vue";

gsap.registerPlugin(ScrollTrigger);

const { t, locale } = useI18n();
const sectionRef = ref<HTMLElement | null>(null);
const form = reactive({
  name: "",
  email: "",
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
      `${t("contact.fullName")}: ${form.name}\n${t("contact.email")}: ${form.email}\n\n${form.message}`,
    );

    window.location.href = `mailto:varveroglouvas@gmail.com?subject=${subject}&body=${body}`;
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
          as="h2"
          :text="t('contact.title')"
          :duration="1600"
          content-class="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
        />
        <p class="mb-10 text-lg text-slate-300">
          {{ t("contact.description") }}
        </p>

        <div class="space-y-4">
          <div class="flex items-center gap-4 text-slate-300">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400"
            >
              📧
            </div>
            <span>varveroglouvas@gmail.com</span>
          </div>
          <div class="flex items-center gap-4 text-slate-300">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-violet-400/10 text-violet-400"
            >
              📍
            </div>
            <span>Kavala, Greece</span>
          </div>
        </div>
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
