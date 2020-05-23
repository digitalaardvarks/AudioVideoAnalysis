
// switch between grayscale and inverted
// Grayscale toggle in first inlet, Inverted toggle in second inlet
// output values are:
// 1 = rgb
// 2 = inverted 
// 3 = grayscale
// 4 = inverted grayscale

autowatch = 1;
inlets = 2;
outlets = 1;

var grayscale = 0;
var inverted = 0;

function anything(a)
{
    if (inlet == 0)
    { 
        if (a == 1)
        {
            grayscale = 1;
            outlet(0, "set", output());
        } else 
        { 
            grayscale = 0;
            outlet(0, "set", output());
        }
    }

    if (inlet == 1)
    {
        if (a == 1)
        {
            inverted = 1;
            outlet(0, "set", output());
        } else
        {
            inverted = 0;
            outlet(0, "set", output());
        }
    }
}


function output()
{
    if (grayscale + inverted == 0)
    {
        return 1;
    }

    if (grayscale + inverted == 1)
    {
        if (grayscale == 0)
        {
            return 2;
        } else
        {
            return 3;
        }
    }

    if (grayscale + inverted == 2)
    {
        return 4;
    }
}