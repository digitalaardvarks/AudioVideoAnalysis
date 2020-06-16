Assuming all text-gl object (clickpoint and analysis markers) have these parameters:

- Depth_enable = 0
- Blend_enable = 0
- blend_mode = 1 1
- Has layers above the jit.gl.layers
    - jit.gl.layer sg = layer 1
    - jit.gl.layer mg = layer 0

## These blend_modes work best:

| modes | sg+mg | sg  | mg  | sg+mg layered |
| --- | --- | --- | --- | --- |
| RGB | sg - blend_mode 4 1  <br>mg - blend_mode 4 6 | sg - blend_mode 4 1  <br> mg - blend_mode 4 6 | sg - blend_mode 4 1  <br> mg - blend_mode 4 6 | sg - blend_mode 4 1  <br>mg - blend_mode 4 6 |
| SG inverted | sg - blend_mode 4 4  <br>mg - blend_mode 4 6 | sg - blend_mode 4 4  <br>mg - blend_mode 4 6 | sg - blend_mode 4 4  <br> mg - blend_mode 4 6 | sg - blend_mode 6 1  <br>mg - blend_mode 4 6 |
| MG inverted | sg - blend_mode 4 1  <br> mg - blend_mode 4 4 | sg - blend_mode 4  1  <br> mg - blend_mode 4 4 | sg - blend_mode 4  1  <br>mg - blend_mode 4 4 | sg - blend_mode 2 7  <br> mg - blend_mode 4 4 |
| BOTH inverted | sg - blend_mode 4 4  <br>mg - blend_mode 4 4 | sg - blend_mode 4 4  <br>  mg - blend_mode 4 4 | sg - blend_mode 4 4  <br>mg - blend_mode 4 4 | sg - blend_mode 2 4  <br>mg - blend_mode 4 4 |