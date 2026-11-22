<template>
  <div class="song-card-item px-3 pt-3">
    <v-card
      :to="{ name: 'SongDetail', params: { id: song.id } }"
      color="surface"
      variant="flat"
      :ripple="false"
      class="song-card rounded-lg"
    >
      <v-card-text class="py-3 px-3">
        <div class="font-weight-regular text-h6 text-truncate mb-1">
          {{ song.title }}
        </div>

        <div class="d-flex align-center">
          <SongMetaBadges
            :original-key="song.originalKey"
            :book-number="song.bookNumber"
          />

          <v-spacer></v-spacer>

          <v-btn
            v-if="isAuthenticated"
            :icon="isInPlaylist ? 'playlist_remove' : 'playlist_add'"
            variant="tonal"
            :color="isInPlaylist ? 'primary' : 'surface-variant'"
            density="comfortable"
            rounded="lg"
            size="small"
            :ripple="false"
            class="mr-2"
            @click.prevent="emit('toggle-playlist', song.id)"
          >
          </v-btn>

          <v-btn
            icon="share"
            variant="tonal"
            color="surface-variant"
            density="comfortable"
            rounded="lg"
            size="small"
            :ripple="false"
            @click.prevent="emit('share', song)"
          >
          </v-btn>

          <v-btn
            v-if="isAuthenticated && allowDelete"
            icon="delete"
            variant="tonal"
            color="error"
            density="comfortable"
            rounded="lg"
            size="small"
            :ripple="false"
            class="ml-2"
            title="Delete Song"
            data-testid="delete-song-btn"
            @click.prevent.stop="emit('delete', song)"
          >
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../composables/useAuth';
import type { Song } from '../services/SongsRepository';
import SongMetaBadges from './SongMetaBadges.vue';

const { isAuthenticated } = useAuth();

defineProps<{
  song: Song;
  isInPlaylist?: boolean;
  allowDelete?: boolean;
}>();

const emit = defineEmits<{
  'toggle-playlist': [id: string];
  'share': [song: Song];
  'delete': [song: Song];
}>();
</script>
