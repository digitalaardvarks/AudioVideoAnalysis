// draw text in app display window

autowatch = 1;
inlets = 2;
outlets = 4;

var enable = 0;
var position = [0, 0];
var fontColor_stored = [[0, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1]];
var fontColor = [1, 1, 1, 1];
var fontSize = 15;

// params = worldDim(x, y), sgColor, mgColor, DisplayToggle
var params_stored = [852, 279, 1, 1, 0];

function mouse () {
    // fontSize from 12 to 15, based on Y-axis
    if (params_stored[1] >= 279 && params_stored[1] <= 720) {
        fontSize = (3/(720 - 279)) * (params_stored[1]-279) + 12;
    } else {
        if (params_stored[1] < 279) {
            fontSize = 12;
        } else {
            fontSize = 15;
        }
    }

    // font color
    // red if sg is inverted + grayscale
    // in layered mode, both mg and sg have to be inv or inv-grayscale to be red.
    if (params_stored[4] != 3) {
        if (params_stored[2]%2 == 0) {
            if (params_stored[2] == 4) {
                fontColor = fontColor_stored[2];
            } else {
                fontColor = fontColor_stored[0];
            }
        } else {
            fontColor = fontColor_stored[1];
        }
    } else {
        if (params_stored[3]%2 == 0) {
            if (params_stored[3]%2 == 0 && params_stored[2] == 4) {
                fontColor = fontColor_stored[2];
            } else {
                fontColor = fontColor_stored[0];
            }
        } else {
            fontColor = fontColor_stored[1];
        }
    }
    
    // mouse position
    var mouseState = arrayfromargs(arguments)
    for(i = 0; i < 2; i ++) {
        // scale and flip the y-coordinates.
        if (i == 1) {
            position[i] = (((mouseState[i]/params_stored[i]) * 2) - 1) * -1;
        } else {
            position[i] = (((mouseState[i]/params_stored[i]) * 2) - 1) * 1;
        }
    }

    // if we are viewing only the mg, dont show clickpointer.
    if (params_stored[4] == 2) {
        enable = 0;
    } else {
        enable = mouseState[2];
    }

    outlet(3, "enable", enable);
    outlet(2, "position", position);
    outlet(1, "color", fontColor);
    outlet(0, "fontsize", fontSize);
}

function params(wd, sg, mg, dt) {
    for(i=0; i<arguments.length; i++) {
        if (arguments[i] != params_stored[i]) {
            params_stored[i] = arguments[i];
        }
    }
}