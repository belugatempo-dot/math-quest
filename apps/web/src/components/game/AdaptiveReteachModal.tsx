'use client';

import CharacterMessage from '@/components/characters/CharacterMessage';

interface AdaptiveReteachModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function AdaptiveReteachModal({ onAccept, onDecline }: AdaptiveReteachModalProps) {
  return (
    <div data-testid="adaptive-reteach-modal" className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        data-testid="modal-backdrop"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal content */}
      <div className="relative z-10 max-w-md mx-4 rounded-2xl bg-white p-6 shadow-xl space-y-4">
        <CharacterMessage characterId="prof-owlbert" expression="encouraging" variant="teaching" size="lg">
          <p className="font-medium">
            This concept is tricky! Would you like to review the lesson?
          </p>
        </CharacterMessage>

        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={onAccept}
            className="px-5 py-2.5 text-sm font-bold rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm"
          >
            Yes, Review Lesson
          </button>
          <button
            onClick={onDecline}
            className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            No, Keep Trying
          </button>
        </div>
      </div>
    </div>
  );
}
