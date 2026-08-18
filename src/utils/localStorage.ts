import { BingoSquareState, Movement } from '../types';

const STORAGE_KEYS = {
  CURRENT_MOVEMENT: 'playbook_bingo_movement',
  BOARD_STATE: 'playbook_bingo_board_v8',
  CUSTOM_MOVEMENTS: 'playbook_bingo_custom_movements',
  SOUND_ENABLED: 'playbook_bingo_sound',
};

export function saveBoardState(movementId: string, board: BingoSquareState[]) {
  try {
    localStorage.setItem(`${STORAGE_KEYS.BOARD_STATE}_${movementId}`, JSON.stringify(board));
  } catch (e) {
    console.error('Failed to save board state to localStorage', e);
  }
}

export function loadBoardState(movementId: string): BingoSquareState[] | null {
  try {
    const data = localStorage.getItem(`${STORAGE_KEYS.BOARD_STATE}_${movementId}`);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load board state from localStorage', e);
    return null;
  }
}

export function saveCurrentMovement(movement: Movement) {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_MOVEMENT, JSON.stringify(movement));
  } catch (e) {
    console.error('Failed to save current movement', e);
  }
}

export function loadCurrentMovement(): Movement | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_MOVEMENT);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

export function saveCustomMovement(movement: Movement) {
  try {
    const existing = loadCustomMovements();
    const updated = [movement, ...existing.filter(m => m.id !== movement.id)];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_MOVEMENTS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save custom movement', e);
  }
}

export function loadCustomMovements(): Movement[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_MOVEMENTS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}
