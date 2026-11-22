import { ref } from 'vue';
import { usePlaylist } from './usePlaylist';
import { useShare } from './useShare';
import SongsRepository, { type Song } from '../services/SongsRepository';

interface FirebaseError extends Error {
  code?: string;
}

export function useSongActions() {
  const { isInPlaylist, togglePlaylist, removeFromPlaylist } = usePlaylist();
  const { share } = useShare();

  const snackbar = ref(false);
  const snackbarText = ref('');

  const deleteDialog = ref(false);
  const songToDelete = ref<Song | null>(null);
  const isDeleting = ref(false);

  const handleTogglePlaylist = (songId: string): void => {
    const wasInPlaylist = isInPlaylist(songId);
    togglePlaylist(songId);
    snackbarText.value = wasInPlaylist ? 'Removed from playlist' : 'Added to playlist';
    snackbar.value = true;
  };

  const handleShare = async (song: Song | null): Promise<void> => {
    if (!song || !song.id) return;
    const url = `${window.location.origin}/song/${song.id}`;
    const result = await share(song.title, url);

    if (result.copied) {
      snackbarText.value = 'Link copied to clipboard';
      snackbar.value = true;
    }
  };

  const requestDeleteSong = (song: Song): void => {
    songToDelete.value = song;
    deleteDialog.value = true;
  };

  const cancelDeleteSong = (): void => {
    if (isDeleting.value) return;
    deleteDialog.value = false;
    songToDelete.value = null;
  };

  const confirmDeleteSong = async (): Promise<void> => {
    const target = songToDelete.value;
    if (!target?.id || isDeleting.value) return;

    isDeleting.value = true;
    try {
      await SongsRepository.deleteSong(target.id);

      if (isInPlaylist(target.id)) {
        try {
          await removeFromPlaylist(target.id);
        } catch (playlistErr) {
          console.error('Failed to remove deleted song from playlist:', playlistErr);
        }
      }

      deleteDialog.value = false;
      songToDelete.value = null;
      snackbarText.value = 'Song deleted';
      snackbar.value = true;
    } catch (error) {
      console.error('Delete failed:', error);
      const fbError = error as FirebaseError;
      snackbarText.value = 'Error deleting song: ' + (fbError.code === 'permission-denied' ? 'Permission Denied' : fbError.message);
      snackbar.value = true;
    } finally {
      isDeleting.value = false;
    }
  };

  return {
    snackbar,
    snackbarText,
    deleteDialog,
    songToDelete,
    isDeleting,
    handleTogglePlaylist,
    handleShare,
    requestDeleteSong,
    cancelDeleteSong,
    confirmDeleteSong
  };
}
