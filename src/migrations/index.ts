import * as migration_20250706_205814 from "./20250706_205814";

export const migrations = [
  {
    up: migration_20250706_205814.up,
    down: migration_20250706_205814.down,
    name: "20250706_205814",
  },
];
