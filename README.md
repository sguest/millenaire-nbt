# Millenaire structure to NBT converter

Utility for converting millenaire structure txt and png files into minecraft NBT structure files.

## Known issues/limitations

- "Guess" orientation blocks not supported
- Blocks defined by meta value in the blocklist only work for a certain hardcoded set of values
  - Defining by blockstate should work for everything
- Occasionally browser will read colour from PNGs incorrectly
  - If the alternate colour is not a valid blocklist entry, the parser will output a warning and the block in question will be empty in the resulting structure file
  - If the alternate colour is a valid blocklist entry, that block will be substituted in the structure file and no warning will be issued
  - [See here](https://stackoverflow.com/a/4310653) for more information
  - Other browsers sometimes work better
- Locked chests sometimes spawn in facing the wrong way. No idea why, the nbt data looks to be correct
- Entities such as wall decorations (tapestries/statues/etc) not supported
