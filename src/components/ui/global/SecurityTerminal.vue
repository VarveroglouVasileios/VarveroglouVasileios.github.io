<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const isOpen = ref(false)
const input = ref('')
const history = ref<string[]>([
  'OrbitFolio [Version 2.0.42]',
  '(c) 2026 Vasileios Varveroglou. All rights reserved.',
  '',
  '— WHAT THIS IS —',
  'Easter-egg “terminal” in your browser only: fake shell, no server, no access to your Mac.',
  'Type commands below (or "help"). Toggle: ⌘+⌥+S (Mac) / Ctrl+Alt+S (Win), Esc closes.',
  '',
])
const inputRef = ref<HTMLInputElement | null>(null)

const commands: Record<string, () => void> = {
  help: () => {
    history.value.push(
      'Commands (client-side demo only):',
      '  whoami      — short bio / role',
      '  stack       — tech stack blurb',
      '  logs        — fake boot lines for this SPA',
      '  contact     — jump to contact form',
      '  download-cv — get my latest resume',
      '  clear       — empty screen',
      '  exit        — close panel (or Esc)',
      ''
    )
  },
  logs: () => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/'
    history.value.push(
      '[00:00:01] INFO  boot OrbitFolio SPA',
      `[00:00:02] INFO  route ${path}`,
      '[00:00:03] DEBUG deferred WebGL background mount',
      '[00:00:04] INFO  i18n locale ready',
      ''
    )
  },
  whoami: () => {
    history.value.push('User: Vasileios Varveroglou', 'Role: Full Stack & Security Engineer', 'Status: Active / Pursuing MSc Cybersecurity', '')
  },
  stack: () => {
    history.value.push('Primary: Vue 3, Node.js, TypeScript', 'Secondary: PHP, SQL, Tailwind', 'Focus: Application Security, Pentesting', '')
  },
  contact: () => {
    history.value.push('Redirecting to contact section...', '')
    window.location.hash = '#contact'
    setTimeout(() => {
      isOpen.value = false
    }, 600)
  },
  'download-cv': () => {
    history.value.push('Initializing download: VasileiosVarveroglouCV.pdf', '')
    const link = document.createElement('a')
    link.href = '/VasileiosVarveroglouCV.pdf'
    link.download = 'VasileiosVarveroglouCV.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
  clear: () => {
    history.value = []
  },
  exit: () => {
    isOpen.value = false
  }
}

const handleCommand = () => {
  const cmd = input.value.trim().toLowerCase()
  if (!cmd) return

  history.value.push(`> ${input.value}`)
  
  if (commands[cmd]) {
    commands[cmd]()
  } else {
    history.value.push(`Command not found: ${cmd}`, '')
  }
  
  input.value = ''
  nextTick(() => {
    const container = document.querySelector('.terminal-content')
    if (container) container.scrollTop = container.scrollHeight
  })
}

/** ⌥+γράμμα στο Mac αλλάζει το `e.key` (όχι "s"). Χρησιμοποιούμε τη θέση πλήκτρου QWERTY. */
const isTerminalHotkey = (e: KeyboardEvent): boolean => {
  if (e.code !== 'KeyS') return false
  if (!e.altKey) return false
  return e.metaKey || e.ctrlKey
}

const onKeyDown = (e: KeyboardEvent) => {
  if (isTerminalHotkey(e)) {
    if (e.repeat) return
    e.preventDefault()
    e.stopPropagation()
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      nextTick(() => inputRef.value?.focus())
    }
    return
  }
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  /* capture: true ώστε να προλάβουμε συντομεύσεις browser πριν φάνε το event */
  window.addEventListener('keydown', onKeyDown, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown, true)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="isOpen" class="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md md:p-12">
      <div class="flex h-full max-h-[600px] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
          <div class="flex items-center gap-2">
            <div class="h-3 w-3 rounded-full bg-red-500/50" />
            <div class="h-3 w-3 rounded-full bg-yellow-500/50" />
            <div class="h-3 w-3 rounded-full bg-green-500/50" />
            <span class="ml-2 text-xs font-mono text-slate-400">root@orbitfolio: ~</span>
          </div>
          <button @click="isOpen = false" class="text-slate-500 hover:text-white">✕</button>
        </div>

        <!-- Content -->
        <div class="terminal-content flex-1 overflow-y-auto p-6 font-mono text-sm text-cyan-400">
          <div v-for="(line, i) in history" :key="i" class="mb-1 min-h-[1.2em]">
            {{ line }}
          </div>
          <div class="mt-4 flex items-center gap-2">
            <span class="text-emerald-400">➜</span>
            <span class="text-cyan-300">~</span>
            <input
              ref="inputRef"
              v-model="input"
              type="text"
              class="terminal-input flex-1 min-w-0 border-0 bg-transparent py-0.5 text-white outline-none selection:bg-cyan-500/40 caret-cyan-300"
              @keydown.enter="handleCommand"
              spellcheck="false"
              autocomplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
