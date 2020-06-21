// Output current Frame and FFT bin-index
// as well as the Text (position, color and size)
autowatch = 1;
inlets = 2;
outlets = 3;

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
var FFT_window = 1024;
var text = {
    textPosition: [0, 0],
    textSize: 12,
    textColor: [1, 1, 1, 1],
    textEnable: 0,
    get setSize() {
        if (variables[1] >= 279 && variables[1] <= 720) {
            this.textSize = (3/(720-279)) * (variables[1]-279) + 12;
        } else {
            if (variables[1] < 279) {
                this.textSize = 12;
            } else {
                this.textSize = 15;
            }
        }   
    },
    get setColor() {
        if (variables[4] != 3) {
            if (variables[2]%2 == 0) {
                if (variables[2] == 4) {
                    this.textColor = [1, 0, 0, 1];
                } else {
                    this.textColor = [0, 0, 0, 1];
                }
            } else {
                this.textColor = [1, 1, 1, 1];
            }
        } else {
            if (variables[3]%2 == 0) {
                if (variables[3]%2 == 0 && variables[2] == 4) {
                    this.textColor = [1, 0, 0, 1];
                } else {
                    this.textColor = [0, 0, 0, 1];
                }
            } else {
                this.textColor = [1, 1, 1, 1];
            }
        }  
    },
    set setPosition (m) {
        for(i=0; i<(m.length-1); i ++) {
            // scale and flip the y-coordinates.
            if (i == 1) {
                this.textPosition[i] = (((m[i]/variables[i]) * 2) - 1) * -1;
            } else {
                this.textPosition[i] = (((m[i]/variables[i]) * 2) - 1) * 1;
            }
        }
    },
    set setEnable(numb) {
        this.textEnable = numb;
    },
    get drawText() {
        outlet(2, "enable", this.textEnable);
        outlet(2, "position", this.textPosition);
        outlet(2, "fontsize", this.textSize);
        outlet(2, "color", this.textColor);
    }
};

function params(wdx, wdy, sg, mg, dt, le, tf) {
    for(i=0; i<arguments.length; i++) {
        if (arguments[i] != variables[i]) {
            variables[i] = arguments[i];
            if (i == 1) {
                text.setSize;
            }
            if (i == 2 || i == 3 || i == 4) {
                text.setColor;
            }
        }
    }
}

function mouse() {
    if (variables[4] == 2) {
        // if we are viewing only the mg, dont do anything.
    } else {
        CalcFrameAndBin(arguments[0], arguments[1]);
        text.setEnable = arguments[2];
        text.setPosition = arrayfromargs(arguments);
        text.drawText;
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
                frameAndBin[1] = Math.floor(Math.abs(frameAndBin[1] - FFT_window));
            }
        } else {
            if ((y > variables[1]) || (y < 0)) {
                makeZero();
            } else {
                frameAndBin[1] = (
                    Math.pow((y / variables[1]), variables[5]) 
                    * 1024);
                frameAndBin[1] = Math.floor(Math.abs(frameAndBin[1] - FFT_window));
            }
        }
    }
    for (i=0; i<frameAndBin.length; i++) {
        outlet(i, frameAndBin[i]);
    }
}

function makeZero() {
    for (i = 0; i < frameAndBin.length; i++) {
        frameAndBin[i] = 0;
    } 
}