'use client';

import { useState } from 'react';
import { useProfile } from '@/contexts/ProfileContext';

const AVATAR_OPTIONS = ['🧒', '👧', '🦊', '🐉', '🧙', '🦁', '🐱', '🦄'];

export default function ProfilePicker() {
  const { profiles, createProfile, switchProfile, deleteProfile } =
    useProfile();
  const [isCreating, setIsCreating] = useState(profiles.length === 0);
  const [newName, setNewName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleCreate = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    createProfile(trimmed, selectedAvatar);
    setNewName('');
    setSelectedAvatar(AVATAR_OPTIONS[0]);
    setIsCreating(false);
  };

  const handleDelete = (profileId: string) => {
    deleteProfile(profileId);
    setConfirmDeleteId(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">MathQuest</h1>
          <p className="text-gray-500 mt-2">
            {profiles.length === 0
              ? 'Create your player profile to get started!'
              : 'Who is playing today?'}
          </p>
        </div>

        {/* Existing Profiles */}
        {profiles.length > 0 && !isCreating && (
          <div className="space-y-3 mb-6">
            {profiles.map((profile) => (
              <div key={profile.id} className="relative">
                <button
                  onClick={() => switchProfile(profile.id)}
                  className="w-full flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-primary transition-colors text-left"
                  aria-label={`Select ${profile.name}`}
                >
                  <span className="text-4xl" role="img" aria-hidden="true">
                    {profile.avatar}
                  </span>
                  <span className="text-lg font-medium text-foreground">
                    {profile.name}
                  </span>
                </button>
                {confirmDeleteId === profile.id ? (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button
                      onClick={() => handleDelete(profile.id)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      aria-label={`Confirm delete ${profile.name}`}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      aria-label="Cancel delete"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(profile.id)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label={`Delete ${profile.name}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Create Profile Form */}
        {isCreating ? (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              New Player
            </h2>

            <label
              htmlFor="player-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="player-name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreate();
              }}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              maxLength={20}
              autoFocus
            />

            <fieldset>
              <legend className="text-sm font-medium text-gray-700 mb-2">
                Choose your avatar
              </legend>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {AVATAR_OPTIONS.map((avatar) => (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`text-3xl p-2 rounded-lg transition-colors ${
                      selectedAvatar === avatar
                        ? 'bg-primary/10 ring-2 ring-primary'
                        : 'hover:bg-gray-100'
                    }`}
                    aria-label={`Select avatar ${avatar}`}
                    aria-pressed={selectedAvatar === avatar}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                disabled={!newName.trim()}
                className="flex-1 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Start Playing
              </button>
              {profiles.length > 0 && (
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-primary hover:text-primary transition-colors font-medium"
          >
            + Add Player
          </button>
        )}
      </div>
    </div>
  );
}
