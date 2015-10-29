function initLocalClocks(hours, minutes, seconds)
{
    var date    = new Date();
    var seconds = seconds || date.getSeconds();
    var minutes = minutes || date.getMinutes();
    var hours   = hours   || date.getHours();

    var hands =
    [
        {
            hand: 'hours',
            angle: (hours * 30) + (minutes / 2)
        },
        {
            hand: 'minutes',
            angle: (minutes * 6)
        },
        {
            hand: 'seconds',
            angle: (seconds * 6)
        }
    ];

    for (var j = 0; j < hands.length; j++)
    {
        var elements = document.querySelectorAll('.' + hands[j].hand);
        for (var k = 0; k < elements.length; k++)
        {
            elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
            elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
            if (hands[j].hand === 'minutes')
            {
                elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
            }
        }
    }
}

$(document).ready(function()
{
	$('input').change(applyTime);
	
	$('#showHour,#showMinute,#showSecond').change(function()
	{
		var checkbox = $(this);
		var target   = $('#' + checkbox.data('target'));
		var visible  = checkbox.is(':checked');
		
		if (!visible)
		{
			target.hide();			
		}
		else
		{
			target.show();
		}
	});
	
	var date = new Date();
	$('#hour').val(date.getHours());
	$('#minute').val(date.getMinutes());
	$('#second').val(date.getSeconds());
	
	$('#zoom').change(function()
	{
		$('#clock').css({ zoom: $(this).val() / 100 });
	});
	
	$('#download').click(downloadClock);
	
	$('#colors input').change(function()
	{
		var input = $(this);
		var target = $('#' + input.data('target'));
		target.css({ backgroundColor: input.val() });
	});
	
	applyTime();
});

var applyTime = function ()
{
	initLocalClocks(
		$('#hour').val()
		, $('#minute').val()
		, $('#second').val()
	);
};

var downloadClock = function ()
{
	html2canvas($('#clock')[0],
    {
        onrendered: function(canvas)
        {
            var img = canvas.toDataURL().replace(/^data[:]image\/(png|jpg|jpeg)[;]base64,/i, "");
            $.ajax
            (
                {
                    "type": "POST",
                    "url":  "download.php",
                    "data":
                    {
                        "hour":      $('#hour').val(),
                        "minute":    $('#minute').val(),
                        "second":    $('#second').val(),
                        "imageData": img
                    }
                }
            ).done(function(o)
            {
                location.href = o + '?' + Math.random();
            });
	  },
	  width: 600,
	  height: 600
	});
};