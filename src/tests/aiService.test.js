import { describe, it, expect } from 'vitest';
import { getAiMode, setAiMode } from '../services/aiService';

describe('Unified AI Service Layer', () => {
  it('should retrieve a valid initial AI mode from service configuration', () => {
    const mode = getAiMode();
    expect(['live', 'demo']).toContain(mode);
  });

  it('should persist and update the active AI mode correctly', () => {
    setAiMode('demo');
    expect(getAiMode()).toBe('demo');
    setAiMode('live');
    expect(getAiMode()).toBe('live');
  });
});
