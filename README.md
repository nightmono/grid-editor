# Grid Editor

A simple, dynamic, web grid (2D array) editor, for your 2D array designing needs

I made this project so I could make cellular automata seeds but it can also be used for making 2D game maps and levels (though I would recommend a tool like [Tiled](https://www.mapeditor.org/)) 

Grids can contain a custom number of cell types (represented as integers from 0, 1, 2, and onwards) as well as be exported as either a 2D array or string (examples below)

[Live demo](https://nightmono.com/grid-editor/)

## Features

- Custom width and height
- Customisable number of cells (default is 2) 
- Customisable colors
- Exporting to both 2D arrays and strings

## Exporting Examples

### 2D Array

```
[0, 1, 0, 1, 0],
[0, 1, 0, 1, 0],
[0, 0, 0, 0, 0],
[1, 0, 0, 0, 1],
[0, 1, 1, 1, 0]
```

### String

```
01010
01010
00000
10001
01110
```

# TODO

- [ ] Custom cell values
- [ ] Drag painting
- [ ] Fill tool
- [x] Grid clearing
- [x] Retain grid contents when resizing
- [ ] Importing grids
- [ ] Add CSS
