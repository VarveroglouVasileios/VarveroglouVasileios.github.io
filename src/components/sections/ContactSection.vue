<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ContactForm {
  name: string
  email: string
  message: string
}

interface ContactErrors {
  name?: string
  email?: string
  message?: string
}

const form = reactive<ContactForm>({
  name: '',
  email: '',
  message: '',
})

const errors = reactive<ContactErrors>({})
const isSubmitted = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)
const submitError = ref<string | null>(null)
const sectionRef = ref<HTMLElement | null>(null)
const introCardRef = ref<HTMLElement | null>(null)
const formCardRef = ref<HTMLElement | null>(null)
let context: gsap.Context | undefined

/** Extract Formspree form ID; supports both "xyknebdj" and full URL "https://formspree.io/f/xyknebdj" */
const FORMSPREE_ID = (() => {
  const raw = import.meta.env.VITE_FORMSPREE_ID as string | undefined
  if (!raw?.trim()) return undefined
  const match = raw.trim().match(/formspree\.io\/f\/([a-zA-Z0-9]+)/)
  return match ? match[1] : raw.trim()
})()

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const hasValue = computed(() => ({
  name: form.name.length > 0,
  email: form.email.length > 0,
  message: form.message.length > 0,
}))

const validate = (): boolean => {
  errors.name = form.name.trim().length < 2 ? 'Please enter your name.' : undefined
  errors.email = emailRegex.test(form.email) ? undefined : 'Please enter a valid email.'
  errors.message = form.message.trim().length < 12 ? 'Message must be at least 12 characters.' : undefined

  return !errors.name && !errors.email && !errors.message
}

const onSubmit = async (): Promise<void> => {
  if (!validate()) {
    return
  }

  submitError.value = null
  isSubmitting.value = true

  if (FORMSPREE_ID) {
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })
      if (res.ok) {
        isSubmitted.value = true
        form.name = ''
        form.email = ''
        form.message = ''
      } else {
        submitError.value = 'Something went wrong. Please try again or email me directly.'
      }
    } catch {
      submitError.value = 'Network error. Please try again or email me directly.'
    } finally {
      isSubmitting.value = false
    }
  } else {
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    )
    window.location.href = `mailto:varveroglou@hotmail.gr?subject=${subject}&body=${body}`
    isSubmitted.value = true
    form.name = ''
    form.email = ''
    form.message = ''
    isSubmitting.value = false
  }
}

onMounted(() => {
  context = gsap.context(() => {
    const trigger = sectionRef.value
    if (!trigger) return

    // Intro card: scrub-in
    if (introCardRef.value) {
      gsap.fromTo(
        introCardRef.value,
        { y: 160, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1.2,
          },
        },
      )
    }

    // Form card: scrub-in with delay
    if (formCardRef.value) {
      gsap.fromTo(
        formCardRef.value,
        { y: 180, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 1.4,
          },
        },
      )
    }
  })
})

onBeforeUnmount(() => {
  context?.revert()
})
</script>

<template>
  <section id="contact" ref="sectionRef" class="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-20 sm:snap-start sm:px-6 md:pt-28">
    <div class="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
      <article ref="introCardRef" class="rounded-3xl border border-white/10 bg-slate-900/55 p-6 backdrop-blur-xl sm:p-8">
        <p class="mb-3 text-sm uppercase tracking-[0.18em] text-cyan-300">Contact</p>
        <h2 class="mb-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">Let’s Build Something Remarkable</h2>
        <p class="max-w-lg text-sm leading-relaxed text-slate-300">
          Have a product idea, a scaling challenge, or a frontend overhaul in mind? Share a few details
          and I will get back with a focused plan.
        </p>
      </article>

      <form
        ref="formCardRef"
        class="rounded-3xl border border-white/10 bg-slate-900/55 p-6 backdrop-blur-xl sm:p-8"
        novalidate
        @submit.prevent="onSubmit"
      >
        <div class="mb-6">
          <div class="group relative">
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="peer w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 pb-3 pt-6 text-sm text-slate-100 outline-none transition focus:border-cyan-300/60"
              placeholder=" "
            >
            <label
              for="name"
              class="pointer-events-none absolute left-4 top-4 text-xs text-slate-400 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-300"
              :class="hasValue.name ? 'top-2 text-xs' : ''"
            >
              Full Name
            </label>
          </div>
          <p v-if="errors.name" class="mt-2 text-xs text-rose-300">{{ errors.name }}</p>
        </div>

        <div class="mb-6">
          <div class="group relative">
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="peer w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 pb-3 pt-6 text-sm text-slate-100 outline-none transition focus:border-cyan-300/60"
              placeholder=" "
            >
            <label
              for="email"
              class="pointer-events-none absolute left-4 top-4 text-xs text-slate-400 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-300"
              :class="hasValue.email ? 'top-2 text-xs' : ''"
            >
              Email Address
            </label>
          </div>
          <p v-if="errors.email" class="mt-2 text-xs text-rose-300">{{ errors.email }}</p>
        </div>

        <div class="mb-6">
          <div class="group relative">
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              class="peer w-full resize-none rounded-xl border border-white/15 bg-slate-900/80 px-4 pb-3 pt-6 text-sm text-slate-100 outline-none transition focus:border-cyan-300/60"
              placeholder=" "
            />
            <label
              for="message"
              class="pointer-events-none absolute left-4 top-4 text-xs text-slate-400 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-300"
              :class="hasValue.message ? 'top-2 text-xs' : ''"
            >
              Project Details
            </label>
          </div>
          <p v-if="errors.message" class="mt-2 text-xs text-rose-300">{{ errors.message }}</p>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full rounded-xl border border-cyan-300/40 bg-cyan-500/15 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200 transition hover:bg-cyan-400/25 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? 'Sending…' : 'Send Message' }}
        </button>

        <p v-if="isSubmitted" class="mt-4 text-sm text-emerald-300">
          Message sent successfully. Thanks for reaching out.
        </p>
        <p v-if="submitError" class="mt-4 text-sm text-rose-300">
          {{ submitError }}
        </p>
      </form>
    </div>
  </section>
</template>
