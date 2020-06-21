autowatch = 1;
inlets = 2;
outlets = 2;

//Contains : worldDim (x, y), logExp, totalFrames, displayToggle
var variables = [852, 279, 1, 2604.1, 0] 
var frameAndBin = [0, 0];

function params() {
    var elems = arrayfromargs(arguments);
    for (i = 0; i < elems.length; i++) {
        variables[i] = elems[i];
    }
}

function mouse (x, y) {
    // scale x-dim from worldDim to framecount:
    frameAndBin[0] = Math.floor(((x / variables[0]) * variables[3]) * 100) / 100;
    
    // calculate the FFT binIndex 
    if ((frameAndBin[0] > variables[3]) || (frameAndBin[0] < 0)) {
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
                    Math.pow((y / (variables[1]/2)), variables[2]) 
                    * 1024);
                frameAndBin[1] = Math.floor(Math.abs(frameAndBin[1] - 1024));
            }
        } else {
            if ((y > variables[1]) || (y < 0)) {
                makeZero();
            } else {
                frameAndBin[1] = (
                    Math.pow((y / variables[1]), variables[2]) 
                    * 1024);
                frameAndBin[1] = Math.floor(Math.abs(frameAndBin[1] - 1024));
            }
        }
    }

    for (i = 0; i < frameAndBin.length; i++) {
        outlet(i, frameAndBin[i]);
    }
}


function makeZero() {
    for (i = 0; i < frameAndBin.length; i++) {
        frameAndBin[i] = 0;
    } 
}
