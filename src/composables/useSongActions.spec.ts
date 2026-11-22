import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSongActions } from './useSongActions';
import SongsRepository from '../services/SongsRepository';

const mockIsInPlaylist = vi.fn();
const mockTogglePlaylist = vi.fn();
const mockRemoveFromPlaylist = vi.fn();
const mockShare = vi.fn();

vi.mock('./usePlaylist', () => ({
  usePlaylist: () => ({
    isInPlaylist: mockIsInPlaylist,
    togglePlaylist: mockTogglePlaylist,
    removeFromPlaylist: mockRemoveFromPlaylist
  })
}));

vi.mock('./useShare', () => ({
  useShare: () => ({
    share: mockShare
  })
}));

vi.mock('../services/SongsRepository', () => ({
  default: {
    deleteSong: vi.fn()
  }
}));

describe('useSongActions', () => {
  const sampleSong = { id: 'song-1', title: 'Amazing Grace', content: 'Lyrics' };

  beforeEach(() => {
    vi.clearAllMocks();
    mockIsInPlaylist.mockReturnValue(false);
    mockRemoveFromPlaylist.mockResolvedValue(undefined);
    vi.mocked(SongsRepository.deleteSong).mockResolvedValue(undefined);
  });

  it('opens and cancels delete confirmation dialog', () => {
    const { deleteDialog, songToDelete, requestDeleteSong, cancelDeleteSong } = useSongActions();

    requestDeleteSong(sampleSong);
    expect(deleteDialog.value).toBe(true);
    expect(songToDelete.value).toEqual(sampleSong);

    cancelDeleteSong();
    expect(deleteDialog.value).toBe(false);
    expect(songToDelete.value).toBeNull();
  });

  it('deletes song from repository and shows confirmation snackbar', async () => {
    const { deleteDialog, songToDelete, snackbar, snackbarText, requestDeleteSong, confirmDeleteSong } = useSongActions();

    requestDeleteSong(sampleSong);
    await confirmDeleteSong();

    expect(SongsRepository.deleteSong).toHaveBeenCalledWith('song-1');
    expect(mockRemoveFromPlaylist).not.toHaveBeenCalled();
    expect(deleteDialog.value).toBe(false);
    expect(songToDelete.value).toBeNull();
    expect(snackbar.value).toBe(true);
    expect(snackbarText.value).toBe('Song deleted');
  });

  it('also removes deleted song from playlist if present', async () => {
    mockIsInPlaylist.mockReturnValue(true);
    const { requestDeleteSong, confirmDeleteSong } = useSongActions();

    requestDeleteSong(sampleSong);
    await confirmDeleteSong();

    expect(SongsRepository.deleteSong).toHaveBeenCalledWith('song-1');
    expect(mockRemoveFromPlaylist).toHaveBeenCalledWith('song-1');
  });

  it('shows error snackbar and keeps dialog open on permission-denied failure', async () => {
    const err = Object.assign(new Error('Missing permissions'), { code: 'permission-denied' });
    vi.mocked(SongsRepository.deleteSong).mockRejectedValueOnce(err);

    const { deleteDialog, snackbar, snackbarText, isDeleting, requestDeleteSong, confirmDeleteSong } = useSongActions();

    requestDeleteSong(sampleSong);
    await confirmDeleteSong();

    expect(deleteDialog.value).toBe(true);
    expect(isDeleting.value).toBe(false);
    expect(snackbar.value).toBe(true);
    expect(snackbarText.value).toBe('Error deleting song: Permission Denied');
    expect(mockRemoveFromPlaylist).not.toHaveBeenCalled();
  });
});
