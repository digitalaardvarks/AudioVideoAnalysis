// hey

autowatch = 1;
inlets = 1;
outlets = 2;

var sg_and_mg = [["enable", 1], 
				 ["position", 0, 0.5, 0], 
				 ["scale", 1, 0.5, 1],
				 ["blend_mode", 4, 5],
				 ["enable", 1],
				 ["position", 0, -0.5, 0],
				 ["scale", 1, 0.5, 1]];

var sg_or_mg = [["enable", 1], 
	    		["position", 0, 0, 0], 
		  		["scale", 1, 1, 1],
		  		["blend_mode", 4, 5], 
		  		["enable", 0]];

var sg_and_mg_layered = [["enable", 1], 
						 ["position", 0, 0, 0,], 
						 ["scale", 1, 1, 1], 
						 ["blend_mode", 4, 5]];


function anything(sgColor, mgColor, displayToggle)
{
	//var displayToggle = c;
	if (displayToggle == 0)
	{
		for (i=0; i<sg_and_mg.length; i++)
		{
			if (i < (sg_and_mg.length/2))
			{
				var output = 0;
			} else
			{
				var output = 1;
			}
			outlet(output, sg_and_mg[i]);
		}
	}

	if (displayToggle == 1)
	{
		for (i=0; i<sg_or_mg.length; i++)
		{
			if (i < sg_or_mg.length-1)
			{
				var output = 0;
			} else
			{
				var output = 1;
			}
			outlet(output, sg_or_mg[i]);
		}
	}

	 if (displayToggle == 2)
	 {
		for (i=0; i<sg_or_mg.length; i++)
		{
			if (i < sg_or_mg.length-2)
			{
				var output = 1;
			} else
			{
				var output = 0;
			}
			outlet(output, sg_or_mg[i]);
		}
	 }
	
	if (displayToggle == 3)
	{	
		//if the color toggles are even, that means they are inverted.
		if(sgColor%2 == 0 || mgColor%2 == 0)
		{
			// change blend_mode
			sg_and_mg_layered[3][1] = 6;
			sg_and_mg_layered[3][2] = 7;
		} else
		{
			sg_and_mg_layered[3][1] = 4;
			sg_and_mg_layered[3][2] = 1;
		}

		for (x=0; x<2; x++)
		{
			for (y=0; y<(sg_and_mg_layered.length-x); y++)
			{
				outlet(x, sg_and_mg_layered[y]);
			}
		}
	}
}