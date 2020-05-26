// draw text in app display

// inlet 1 = list of mouse drawing. all we care about are the first
// three. which are [x, y, off/on(1 or 0)]
// inlet 2 = world-dim. list of 2 elements.
// inlet 3 = display toggle. integer from 0 to 3.

autowatch = 1;
inlets = 5;
outlets = 4;

var worldDim = [1024, 576];
var enable = 0;
var position = [0, 0];
var fontColor = [0, 0, 0, 1];
var fontSize = 15;
var displayToggle = 0;
var mgColor = 1;
var sgColor = 1;

function mouse ()
{
    // font size nased on the 16:9 ratio of default x-dim (1024)
    fontSize = (worldDim[0] / 66);

    // font color
    if (displayToggle != 3)
    {
        if (sgColor == 2 || sgColor == 4)
        {
            for (i = 0; i < fontColor.length-1; i++)
            {
                fontColor[i] = 0;
            }
        } else
        {
            for (i = 0; i < fontColor.length-1; i++)
            {
                fontColor[i] = 1;
            }
        }
    } else
    {
        if (mgColor == 2 || mgColor == 4)
        {
            for (i = 0; i < fontColor.length-1; i++)
            {
                fontColor[i] = 0;
            }
        } else
        {
            for (i = 0; i < fontColor.length-1; i++)
            {
                fontColor[i] = 1;
            }
        }
    }
    
    // mouse position
    var mouseState = arrayfromargs(arguments)
    for(i = 0; i < worldDim.length; i ++)
    {
        // scale and flip the y-coordinates.
        if (i == 1)
        {
            position[i] = (((mouseState[i]/worldDim[i]) * 2) - 1) * -1;
        } else
        {
            position[i] = (((mouseState[i]/worldDim[i]) * 2) - 1) * 1;
        }
    }

    // if we are viewing only the mg, dont show clickpointer.
    if (displayToggle == 2)
    {
        enable = 0;
    } else
    {
        enable = mouseState[2];
    }

    outlet(3, "enable", enable);
    outlet(2, "position", position);
    outlet(1, "color", fontColor);
    outlet(0, "fontsize", fontSize);
}

function mg (a)
{
    mgColor = a;
}

function sg (b)
{   
    sgColor = b;
}

function toggle (c)
{
    displayToggle = c;
}

function world()
{
    worldDim = arrayfromargs(arguments);
}
