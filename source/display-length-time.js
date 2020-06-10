// Takes frames(playbackrate) and desired displaylength (0 to 1).
// outputs the frames to clickpoint and totalt sec to UI,
// based on current samplerate and FFT hopsize.

autowatch = 1;
inlets = 1;
outlets = 3;

var xdim_norm = 0.45;
var xdim_range = 1024;
var xdim_offset = 100;
var frames_stored = 5167.9;
var samplerate = 44100;
var hopsize = 512;

function main (xdim, inputframes, sr, hp)
{
    if (inputframes != frames_stored)
    { 
        frames_stored = inputframes;
    }

    if (sr != samplerate)
    {
        samplerate = sr;
    }

    if (hp != hopsize)
    {
        hopsize = hp;
    }

    if (xdim != xdim_norm)
    {
        xdim_norm = xdim;
    }

    // scale the incoming xdim to the max range with a offset (to avoid a display with xdim = 0)
    var xdim_scaled = Math.round((xdim_norm * (xdim_range - xdim_offset)) + xdim_offset);

    // The totalt display length in seconds.
    var secfrominput = (frames_stored * hopsize) / samplerate;

    // get the total display runtime in sec (from start to end).
    var sec2output = (xdim_scaled / xdim_range) * secfrominput;

    // get the total display runtime in frames (from start to end)
    var frames2clickpoint = (sec2output / hopsize) * samplerate;

    outlet(0, xdim_scaled);
    outlet(1, sec2output);
    //.toFixed(2));
    outlet(2, frames2clickpoint);
}