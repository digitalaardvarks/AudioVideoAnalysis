// Takes frames(playbackrate) and desired displaylength (0 to 1).
// outputs the frames to clickpoint and totalt sec to UI,
// based on current samplerate and FFT hopsize.

autowatch = 1;
inlets = 1;
outlets = 3;

var xdim_range = 1024;
var xdim_offset = 100;


function main (xdim, inputframes, sr, hp)
{
    // get the totalt display length in seconds.
    var secfrominput = (inputframes * hp) / sr;

    // scale the incoming xdim to the max range with a offset (to avoid a display with xdim = 0)
    var xdim_scaled = Math.round((xdim * (xdim_range - xdim_offset)) + xdim_offset);
    
    // get the total display runtime in sec (from start to end). round to 2 decimals.
    var sec2output = (xdim_scaled / xdim_range) * secfrominput;
    //sec2output = Math.floor(sec2output * 100) / 100;

    // get the total display runtime in frames (from start to end)
    var frames2clickpoint = (sec2output / hp) * sr;
    //frames2clickpoint = Math.floor(frames2clickpoint * 100) / 100;

    outlet(0, xdim_scaled);
    outlet(1, sec2output);
    //.toFixed(2));
    outlet(2, frames2clickpoint);
}