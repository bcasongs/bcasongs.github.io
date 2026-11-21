<template>
  <v-app-bar flat color="transparent" class="app-bar-glass">
    <v-container class="pa-0 fill-height d-flex align-center px-3">
      <v-text-field
        v-model="localSearch"
        placeholder="Search songs..."
        variant="solo"
        flat
        bg-color="surface"
        hide-details
        density="comfortable"
        rounded="xl"
        single-line
        clearable
        clear-icon="close"
        prepend-inner-icon="search"
        class="search-field flex-grow-1"
        @update:model-value="debouncedUpdateSearch"
        @click:clear="clearSearch"
      ></v-text-field>

      <v-btn
        v-if="!isAuthenticating && isAuthenticated"
        icon
        variant="tonal"
        color="surface-variant"
        rounded="lg"
        to="/playlist"
        class="ml-2"
        
        density="comfortable"
      >
        <v-badge
          :content="playlistCount"
          :model-value="playlistCount > 0"
          color="primary"
        >
          <v-icon icon="queue_music"></v-icon>
        </v-badge>
      </v-btn>

      <UserAuth size="large" :avatar-size="32" class="ml-2" />
    </v-container>
  </v-app-bar>

  <v-container fluid class="song-list-container py-0 px-0 d-flex flex-column">
    <div v-if="loading && songs.length === 0" class="d-flex justify-center my-4">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else class="flex-grow-1" style="min-height: 0;">
      <v-virtual-scroll
        v-if="songs.length > 0"
        ref="virtualScrollRef"
        :items="songs"
        item-key="id"
        :item-height="108"
        class="h-100 pb-16"
        data-testid="song-virtual-scroll"
        @scroll.passive="handleScroll"
      >
        <template v-slot:default="{ item }">
          <SongCard
            :song="item"
            :is-in-playlist="isInPlaylist(item.id)"
            @toggle-playlist="handleTogglePlaylist"
            @share="handleShare"
          />
        </template>
      </v-virtual-scroll>

      <div v-else class="text-center mt-4 text-medium-emphasis">
        No songs found.
      </div>
    </div>

    <v-btn
      v-if="isAuthenticated"
      color="primary"
      icon="add"
      size="large"
      position="fixed"
      location="bottom right"
      class="ma-4 mb-8"
      to="/song/new"
      elevation="4"
      style="z-index: 100;"
    ></v-btn>

    <v-snackbar v-model="snackbar" :timeout="2000" color="inverse-surface">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn color="inverse-primary" variant="text" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
defineOptions({ name: 'SongList' });

import { ref, watch } from 'vue';
import { useAuth } from '../composables/useAuth';
import { usePlaylist } from '../composables/usePlaylist';
import { useSongActions } from '../composables/useSongActions';
import { useSongs } from '../composables/useSongs';
import { useScrollPosition, type ScrollTarget } from '../composables/useScrollPosition';
import SongCard from '../components/SongCard.vue';
import UserAuth from '../components/UserAuth.vue';

const { isAuthenticated, isAuthenticating } = useAuth();
const { songs, search, loading } = useSongs();
const { isInPlaylist, playlistCount } = usePlaylist();
const { snackbar, snackbarText, handleTogglePlaylist, handleShare } = useSongActions();

const virtualScrollRef = ref<ScrollTarget>(null);
const { handleScroll, resetScrollPosition } = useScrollPosition(virtualScrollRef);

// Debounced Search Implementation
const localSearch = ref(search.value);

const debounce = <T extends (...args: Parameters<T>) => void>(fn: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const updateSearch = (value: string) => {
  search.value = value;
};

const debouncedUpdateSearch = debounce(updateSearch, 300);

const clearSearch = () => {
  localSearch.value = '';
  search.value = '';
};

// Sync localSearch if search changes externally (e.g. cleared) and reset scroll to top
watch(search, (newValue) => {
  if (localSearch.value !== newValue) {
    localSearch.value = newValue;
  }
  resetScrollPosition();
});
</script>

<style scoped>
.song-list-container {
  height: calc(100vh - var(--v-layout-top, 0px) - var(--v-layout-bottom, 0px));
  height: calc(100dvh - var(--v-layout-top, 0px) - var(--v-layout-bottom, 0px));
  overflow: hidden;
}

.search-field :deep(.v-field) {
  border: 1px solid rgba(148, 163, 184, 0.28);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-field :deep(.v-field--focused) {
  border-color: rgba(43, 89, 195, 0.55);
  box-shadow: 0 0 0 3px rgba(43, 89, 195, 0.1);
}
</style>
