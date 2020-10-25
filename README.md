# Millenaire structure to NBT converter

Known issues/limitations

- "Guess" orientation blocks not supported
- Blocks defined by meta value in the blocklist only work for a certain hardcoded set of values
  - Defining by blockstate should work for everything
- Occasionally browser will read colour from PNGs incorrectly
  - [See here](https://stackoverflow.com/a/4310653) for more information
  - other browsers sometimes work better
- Locked chests sometimes spawn in facing the wrong way. No idea why, the nbt data looks to be correct
- NBT files for upgraded levels only include changed blocks from previous levels, since that's how the millenaire PNGs work
  - Spawn upgrade levels in order from same structure block to upgrade building
- Entities such as wall decorations (tapestries/statues/etc) not supported
