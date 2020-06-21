// Output current frame and FFT bin-index
// as well as the text position, color and size
// based on mouse position ++.

autowatch = 1;
inlets = 2;
outlets = 6;

//variables: 
//0 = WorldDim(x)
//1 = WorldDIm(y)
//2 = sgColor
//3 = mgColor
//4 = DisplayToggle
//5 = logExp
//6 = totalFrames
var variables = [852, 279, 1, 1, 0, 1., 2604.1];
var frameAndBin = [0, 0];
// for text
var position = [0, 0];
var fontColor_stored = [[0, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1]];
var fontColor = [1, 1, 1, 1];
var fontSize = 15;

function params(wdx, wdy, sg, mg, dt, le, tf) {
    for(i=0; i<arguments.length; i++) {
        if (arguments[i] != variables[i]) {
            variables[i] = arguments[i];
            if (i == 1) {
                MakeFontSize();
            }
            if (i == 2 || i == 3 || i == 4) {
                MakeFontColor();
            }
        }
    }
}

function mouse() {
    // if we are viewing only the mg, dont do anything.
    if (variables[4] == 2) {
        outlet(5, "enable", 0);
    } else {
        var mouseState = arrayfromargs(arguments);
        CalcFrameAndBin(mouseState[0], mouseState[1]);
        CalcPosition(mouseState[0], mouseState[1]);

        outlet(5, "enable", mouseState[2]);
        outlet(4, "position", position);
        outlet(3, "color", fontColor);
        outlet(2, "fontsize", fontSize);
        outlet(1, frameAndBin[1]);
        outlet(0, frameAndBin[0]);
    }
}

function CalcPosition(x, y) {
    var temp_pos = arrayfromargs(arguments);
    for(i = 0; i < 2; i ++) {
        // scale and flip the y-coordinates.
        if (i == 1) {
            position[i] = (((temp_pos[i]/variables[i]) * 2) - 1) * -1;
        } else {
            position[i] = (((temp_pos[i]/variables[i]) * 2) - 1) * 1;
        }
    }
}

function CalcFrameAndBin(x, y) {
    // scale x-dim from worldDim to framecount:
    frameAndBin[0] = Math.floor(((x / variables[0]) * variables[6]) * 100) / 100;
    
    // calculate the FFT binIndex 
    if ((frameAndBin[0] > variables[6]) || (frameAndBin[0] < 0)) {
        makeZero();
    } else {
        // scale y-dim from worldim to current FFT window size (1024),
        // or half if we are viewing sg and mg on top of each other.
        // and we factor inn the logarithmic exponent.
        if (variables[4] == 0) {
            if ((y > variables[1]/2) || (y < 0)) {
                makeZero();
            } else {
                frameAndBin[1] = (
                    Math.pow((y / (variables[1]/2)), variables[5]) 
                    * 1024);
                frameAndBin[1] = Math.floor(Math.abs(frameAndBin[1] - 1024));
            }
        } else {
            if ((y > variables[1]) || (y < 0)) {
                makeZero();
            } else {
                frameAndBin[1] = (
                    Math.pow((y / variables[1]), variables[5]) 
                    * 1024);
                frameAndBin[1] = Math.floor(Math.abs(frameAndBin[1] - 1024));
            }
        }
    }
}

function MakeFontSize() {
    // fontSize from 12 to 15, based on Y-axis.
    // range is between 279 and 720... 
    // might be better to have something with screensize?
    if (variables[1] >= 279 && variables[1] <= 720) {
        fontSize = (3/(720-279)) * (variables[1]-279) + 12;
    } else {
        if (variables[1] < 279) {
            fontSize = 12;
        } else {
            fontSize = 15;
        }
    }
}

function MakeFontColor() {
    // red if sg is inverted + grayscale
    // in layered mode, both mg and sg have to be inv or inv-grayscale to be red.
    if (variables[4] != 3) {
        if (variables[2]%2 == 0) {
            if (variables[2] == 4) {
                fontColor = fontColor_stored[2];
            } else {
                fontColor = fontColor_stored[0];
            }
        } else {
            fontColor = fontColor_stored[1];
        }
    } else {
        if (variables[3]%2 == 0) {
            if (variables[3]%2 == 0 && variables[2] == 4) {
                fontColor = fontColor_stored[2];
            } else {
                fontColor = fontColor_stored[0];
            }
        } else {
            fontColor = fontColor_stored[1];
        }
    }
}

function makeZero() {
    for (i = 0; i < frameAndBin.length; i++) {
        frameAndBin[i] = 0;
    } 
}