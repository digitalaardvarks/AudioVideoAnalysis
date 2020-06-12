// hey

autowatch = 1;
inlets = 2;
outlets = 1;

function anything(a, b)
{
	var sgColor = a;
	var displayToggle = b;
	
	if (displayToggle == 3)
	{
		if (sgColor == 2 || sgColor == 4)
		{
			outlet(0, "blend_mode", 6, 7);
		} else
		{
			outlet(0, "blend_mode", 4, 1);
		}
	} else
	{
		outlet(0, "blend_mode", 4, 5);
	}	
}