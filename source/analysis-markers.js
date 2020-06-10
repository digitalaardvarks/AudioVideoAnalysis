//analysis markers for jit.gl.text3d

autowatch = 1;
inlets = 2;
outlets = 2;

var toggle = 0;
var log = 1;
var grid_dim = 7;
var dim_range = 2;
var dim_range_offset = 1;
var time = 60;
var fft_window = 22050;

var freq_split = [0, 3675, 7350, 11025, 14700, 18375];
var ymarker_pos = [0, 0.16, 0.33, 0.5, 0.66, 0.83];
var time_split = [10, 20, 30, 40, 50];
var xmarker_pos = [-0.66, -0.33, 0, 0.33, 0.66];

function bang()
{
    for (i = 0; i < xmarker_pos.length; i++)
    {
        outlet(0, "text", time_split[i], "sec");
        outlet(0, "position", xmarker_pos[i], -0.95);
        outlet(0, "bang");
    }
    
    if (toggle != 2)
    {
        for (i = 0; i < ymarker_pos.length; i++)
        {
            outlet(1, "text", freq_split[i], "Hz");
 			outlet(1, "position", -0.99, ymarker_pos[i]); 
            outlet(1, "bang");
        }
    }
}

function params(disptime, disptoggle, logexp, dim)
{
    if (disptoggle != toggle || dim != grid_dim)
    {
        if (disptoggle == 0)
        {
            dim_range = 1;
            dim_range_offset = 0;
        } else
        {
            dim_range = 2;
            dim_range_offset = 1;
        } 

        // if the incoming dim is LESS than the previous dim (grid_dim), 
        // then we remove the difference from the end of marker positions
        // before adding new values to them.
        if (dim < grid_dim)
        {
            xmarker_pos.length = (dim-2);
            ymarker_pos.length = (dim-1);
        }

        // write the normalized marker coodinates. 
        for (i = 0; i < (dim-1); i++)
        {
            if (i != 0)
            {
                if (i < (grid_dim-1))
                {
                    xmarker_pos[i-1] = Math.floor((((2/(dim-1)) * (i)) - 1) * 100) / 100;
                    ymarker_pos[i] = Math.floor((((dim_range/(dim-1)) * (i)) - dim_range_offset) * 100) / 100;
                } else
                {
                    xmarker_pos.push(Math.floor((((2/(dim-1)) * (i)) - 1) * 100) / 100);
                    ymarker_pos.push(Math.floor((((dim_range/(dim-1)) * (i)) - dim_range_offset) * 100) / 100);
                }

            } else
            {
                if (disptoggle == 0)
                {
                    ymarker_pos[i] = 0; 
                } else
                {
                    ymarker_pos[i] = -0.95; 
                }
            } 
        }
        toggle = disptoggle;
    }

    // write the values to accompany the marker coodinates.
    if (disptime != time || logexp != log || dim != grid_dim )
    {
        for (i = 0; i <= xmarker_pos.length; i++)
        {
            if (i <= (xmarker_pos.length-1))
            {
                time_split[i] = Math.floor(((disptime/(xmarker_pos.length+1)) * (i+1)) * 10) / 10;
            }
            freq_split[i] = Math.floor(Math.pow((fft_window/(ymarker_pos.length)) * i, logexp));
        }
        grid_dim = dim;
        time = disptime;
        log = logexp;
    }
}