<template>
  <div v-if="formattedKey || bookNumber" class="d-inline-flex align-center ga-2">
    <v-chip
      v-if="formattedKey"
      data-testid="key-chip"
      color="primary"
      variant="tonal"
      size="small"
      label
      prepend-icon="music_note"
      class="key-badge font-weight-semibold text-none"
    >
      {{ formattedKey }}
    </v-chip>

    <v-chip
      v-if="bookNumber"
      data-testid="book-number-chip"
      color="surface-variant"
      variant="tonal"
      size="small"
      label
      class="book-number-badge font-weight-medium"
    >
      #{{ bookNumber }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatMusicalKey } from '../utils/musicKey';

const props = defineProps<{
  originalKey?: string | null;
  bookNumber?: string | number | null;
}>();

const formattedKey = computed(() => formatMusicalKey(props.originalKey));
</script>

<style scoped>
.key-badge {
  letter-spacing: 0.01em;
}

.book-number-badge {
  font-variant-numeric: tabular-nums;
}
</style>
