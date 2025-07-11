import * as migration_20250706_205814 from './20250706_205814';
import * as migration_20250711_223656 from './20250711_223656';

export const migrations = [
  {
    up: migration_20250706_205814.up,
    down: migration_20250706_205814.down,
    name: '20250706_205814',
  },
  {
    up: migration_20250711_223656.up,
    down: migration_20250711_223656.down,
    name: '20250711_223656'
  },
];
