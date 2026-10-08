<template>
  <!-- Short, loud, nothing else. -->
  <p role="note" class="flex items-start gap-3 rounded-xl bg-paper px-4 py-3 ring-2 ring-mignon">
    <svg viewBox="0 0 24 24" class="mt-px size-5 shrink-0" aria-hidden="true">
      <path d="M12 2.5 23 21.5H1Z" class="fill-mignon" stroke-linejoin="round" />
      <path d="M12 9v6" class="stroke-ink" stroke-width="2.2" stroke-linecap="round" />
      <circle cx="12" cy="18.2" r="1.25" class="fill-ink" />
    </svg>
    <span class="leading-snug font-medium text-pretty">
      <span class="sr-only">Warning: </span><slot />
    </span>
  </p>
</template>
