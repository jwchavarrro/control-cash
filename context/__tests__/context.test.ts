import { context, useContext, contextWithStorage } from '@/context';
import { atom as jotaiAtom, useAtom as jotaiUseAtom } from 'jotai';
import { atomWithStorage as jotaiAtomWithStorage } from 'jotai/utils';

describe('Context index exports', () => {
  it('exports the renamed Jotai functions correctly', () => {
    // Check that our renamed exports reference the original Jotai functions
    expect(context).toBe(jotaiAtom);
    expect(useContext).toBe(jotaiUseAtom);
    expect(contextWithStorage).toBe(jotaiAtomWithStorage);
  });
});
