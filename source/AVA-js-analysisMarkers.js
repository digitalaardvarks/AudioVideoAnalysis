//analysis markers for jit.gl.text3d

autowatch = 1;
inlets = 2;
outlets = 2;

var toggle = 0;
var log_stored = 1;
var grid_stored = 7;
var dim_range = 2;
var dim_range_offset = 1;
var time_stored = 60;
var FFT_size = 2048;
var sampling_rate = 44100;

var freq_split = [0, 3675, 7350, 11025, 14700, 18375];
var ymarker_pos = [0, 0.16, 0.33, 0.5, 0.66, 0.83];
var time_split = [10, 20, 30, 40, 50];
var xmarker_pos = [-0.66, -0.33, 0, 0.33, 0.66];

function bang() {
    for (i = 0; i < xmarker_pos.length; i++) {
        outlet(0, "text", time_split[i], "sec");
        outlet(0, "position", xmarker_pos[i], -0.95);
        outlet(0, "bang");
    }
    
    if (toggle != 2) {
        // if i == 0, then no "hz" marker.
        for (i = 0; i < ymarker_pos.length; i++) {
            if (i == 0) {
                outlet(1, "text", freq_split[i]);
            } else {
                outlet(1, "text", freq_split[i], "Hz");
            }
            outlet(1, "position", -0.99, ymarker_pos[i]); 
            outlet(1, "bang");
        }
    }
}

function params(disptime, disptoggle, logexp, grid, sr) {
    if (disptoggle != toggle || grid != grid_stored) {
        if (disptoggle == 0) {
            dim_range = 1;
            dim_range_offset = 0;
        } else {
            dim_range = 2;
            dim_range_offset = 1;
        }

        // if the incoming dim is LESS than the previous dim (grid_dim), 
        // then we remove the difference from the end of marker positions
        // before adding new values to them.
        if (grid < grid_stored) {
            xmarker_pos.length = (grid-2);
            ymarker_pos.length = (grid-1);
        }
        
        // write the normalized marker coodinates. 
        for (i = 0; i < (grid-1); i++) {
            if (i != 0) {
                if (i < (grid_stored-1)) {
                    xmarker_pos[i-1] = Math.floor((((2/(grid-1)) * (i)) - 1) * 100) / 100;
                    ymarker_pos[i] = Math.floor((((dim_range/(grid-1)) * (i)) - dim_range_offset) * 100) / 100;
                } else {
                    xmarker_pos.push(Math.floor((((2/(grid-1)) * (i)) - 1) * 100) / 100);
                    ymarker_pos.push(Math.floor((((dim_range/(grid-1)) * (i)) - dim_range_offset) * 100) / 100);
                }
            } else {
                if (disptoggle == 0) {
                    ymarker_pos[i] = 0; 
                } else {
                    ymarker_pos[i] = -0.95; 
                }
            } 
        }
        toggle = disptoggle;
    }

    // write the values to accompany the marker coodinates.
    if (disptime != time_stored || 
        logexp != log_stored || 
        grid != grid_stored || 
        sr != sampling_rate) {
        for (i = 0; i <= xmarker_pos.length; i++) {
            if (i <= (xmarker_pos.length-1)) {
                time_split[i] = Math.floor(((disptime/(xmarker_pos.length+1)) * (i+1)) * 10) / 10;
            }
            freq_split[i] = Math.abs(Math.floor(((Math.pow(Math.abs(((1/ymarker_pos.length)* i)-1), logexp) * (FFT_size/2)) * sr) / FFT_size) - (sr/2));
        }
        grid_stored = grid;
        time_stored = disptime;
        log_stored = logexp;
        sr = sampling_rate;
    }
}