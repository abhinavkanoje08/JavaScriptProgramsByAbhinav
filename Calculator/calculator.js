 
function dis(val) 
{
	document.getElementById("result").value+= val
}

function solve() 
{
	let x = document.getElementById("result").value
	if(x =="")
	{
		alert("Please enter any number.");
	}
	else{
		let y = eval(x)
		document.getElementById("result").value = y
	}	
}

function clr() 
{
	document.getElementById("result").value = ""
}

function del() 
{
	var value = document.getElementById("result").value;
	document.getElementById("result").value = value.substr(0, value.length - 1);
}
