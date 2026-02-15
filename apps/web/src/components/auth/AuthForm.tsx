'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export type AuthMode = 'signin' | 'signup';

interface AuthFormProps {
  initialMode?: AuthMode;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AuthForm({
  initialMode = 'signin',
  onSuccess,
  onCancel,
}: AuthFormProps) {
  const { signUp, signIn, error, clearError, isLoading } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    clearError();
    setValidationError(null);
    setEmail('');
    setPassword('');
    setDisplayName('');
  };

  const validate = (): boolean => {
    if (!email.trim()) {
      setValidationError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Please enter a valid email');
      return false;
    }
    if (!password) {
      setValidationError('Password is required');
      return false;
    }
    if (mode === 'signup') {
      if (password.length < 8) {
        setValidationError('Password must be at least 8 characters');
        return false;
      }
      if (!displayName.trim()) {
        setValidationError('Name is required');
        return false;
      }
    }
    setValidationError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    let success: boolean;
    if (mode === 'signup') {
      success = await signUp(email.trim(), password, displayName.trim());
    } else {
      success = await signIn(email.trim(), password);
    }

    if (success) {
      onSuccess?.();
    }
  };

  const displayError = validationError ?? error;

  return (
    <div className="bg-white/10 rounded-xl shadow-sm p-6 border border-white/20">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        {mode === 'signup' ? 'Create Parent Account' : 'Parent Sign In'}
      </h2>

      {mode === 'signup' && (
        <p className="text-sm text-white/60 mb-4">
          Create an account to save your children&apos;s progress to the cloud.
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {mode === 'signup' && (
          <div className="mb-4">
            <label
              htmlFor="auth-name"
              className="block text-sm font-medium text-white/60 mb-1"
            >
              Your Name
            </label>
            <input
              id="auth-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-white/25 rounded-lg bg-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={100}
              autoFocus={mode === 'signup'}
            />
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="auth-email"
            className="block text-sm font-medium text-white/60 mb-1"
          >
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="parent@example.com"
            className="w-full px-3 py-2 border border-white/25 rounded-lg bg-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus={mode === 'signin'}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="auth-password"
            className="block text-sm font-medium text-white/60 mb-1"
          >
            Password
          </label>
          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === 'signup' ? 'At least 8 characters' : 'Enter password'}
            className="w-full px-3 py-2 border border-white/25 rounded-lg bg-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {displayError && (
          <p className="text-red-400 text-sm mb-4" role="alert">
            {displayError}
          </p>
        )}

        <div className="flex gap-2 mb-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading
              ? 'Loading...'
              : mode === 'signup'
                ? 'Create Account'
                : 'Sign In'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-white/15 text-white/70 rounded-lg hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="text-center">
        {mode === 'signin' ? (
          <button
            type="button"
            onClick={() => switchMode('signup')}
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Don&apos;t have an account? Sign up
          </button>
        ) : (
          <button
            type="button"
            onClick={() => switchMode('signin')}
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Already have an account? Sign in
          </button>
        )}
      </div>
    </div>
  );
}
