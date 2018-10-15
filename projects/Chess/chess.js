

var alph = ['A','B','C','D','E','F','G','H'];
var numberOfclicks = 0;
var selected;
var piecemv;
var player = 1;

function coloorpick(string){
	if (numberOfclicks == 1){
		document.getElementById(string).style.backgroundColor = "green";
		console.log("color:"+ document.getElementById(string));
	}
}

//Function that checks what the player is trying to do based on the number of clicks and where the player is clicking
function piece(string1){
	numberOfclicks ++;
	color = document.getElementById(string1).getElementsByTagName('td')[0];
	console.log(color);
	console.log(numberOfclicks);
	if (numberOfclicks == 1  && document.getElementById(string1).getElementsByTagName('img').length!==0){
		selected = document.getElementById(string1);
		console.log(selected);
		piecemv = selected.getElementsByTagName('img')[0].src;
		console.log(piecemv);
		coloorpick(string1);
	}
	else if(numberOfclicks == 2 && legalmove(piecemv, document.getElementById(string1),selected)){
		selected.innerHTML = '';
		document.getElementById(string1).innerHTML = '<img src='+ piecemv+ '>';
		numberOfclicks = 0;
		resetboard();
		piecemv = '';
		player++;
	}
	else if(numberOfclicks == 2 && legalmove(piecemv, document.getElementById(string1),selected) == false && document.getElementById(string1) != selected){
		console.log("it does happen");
		numberOfclicks = 1;
		document.getElementById(string1).style.backgroundColor = "red";
		setTimeout('resetboard()', 500);  
		
	}else{
		numberOfclicks = 0;
		selected = '';
		resetboard();
	}
	
}



function legalmove(thepiece, desti, from){
	var from_Le = from.id.charAt(0); 		//The letter that the piece is currently at
	var desti_Le = desti.id.charAt(0); 		//The letter of the destination that the player wants to move the piece to
	var from_Nu = from.id.charAt(2);		//The number of the location that the piece is currently at
	var desti_Nu = desti.id.charAt(2);		//The number of the location that the player wants to move the piece to
	var isImg = desti.getElementsByTagName('img');

	//Logic to check if a white pawn can be moved.
	if(thepiece.includes("whitePawn.png")){
		if(wPawn(thepiece, desti, from, from_Le, desti_Le, from_Nu, desti_Nu, isImg)){
			return true;
		}
	//Logic to check if a black pawn can be moved.
	}else if(thepiece.includes("blackPawn.png")){
		if(bPawn(thepiece, desti, from, from_Le, desti_Le, from_Nu, desti_Nu, isImg)){
			return true;
		}
	//Logic to check if a white rook can be moved. 		
	}else if(thepiece.includes("whiteRook.png")){
		if(wRook(thepiece, desti, from, from_Le, desti_Le, from_Nu, desti_Nu, isImg)){
			return true;
		}
	}
	return false;
}

function wPawn(thepiece, desti, from, from_Le, desti_Le, from_Nu, desti_Nu, isImg){
	//Checks if the moved entered is legal without trying to knock out a piece and it not beeing the first move.
	if(from_Le == desti_Le && from_Nu<= desti_Nu && desti_Nu - from_Nu ==1 && isImg.length == 0 ){
		return true;	
	}
	//Checks if the move is legal when it is from the pawns original position. Meaning that it can legally move one or two places verticaly.
	else if(from_Le == desti_Le && from_Nu<= desti_Nu && desti_Nu - from_Nu <=2 && from_Nu == 2 && isPieceBetween(from_Le, from_Nu,desti_Le, desti_Nu) && isImg.length == 0){
		return true;
	}
	//Checks if the move is legal when trying to knock out a piece.
	else if((parseInt(from_Le)-1 == desti_Le || parseInt(from_Le)+1 == desti_Le) && from_Nu<= desti_Nu && desti_Nu - from_Nu ==1 && desti_Nu != from_Nu && isImg.length != 0 && isImg[0].src.includes("black")){
		return true;
	}
	else{
		return false;
	}
}

function bPawn(thepiece, desti, from, from_Le, desti_Le, from_Nu, desti_Nu, isImg){
	//Checks if the moved entered is legal without trying to knock out a piece.
	if(from_Le == desti_Le && from_Nu >= desti_Nu && from_Nu - desti_Nu ==1 && isImg.length == 0){
		return true;	
	}
	//Checks if the move is legal when it is from the pawns original position. Meaning that it can legally move one or two places verticaly.
	else if(from_Le == desti_Le && from_Nu>= desti_Nu && from_Nu - desti_Nu <=2 && from_Nu == 7 && isPieceBetween(from_Le, from_Nu,desti_Le, desti_Nu) && isImg.length == 0){
		return true;
	}	

	//Checks if the move is legal when trying to knock out a piece.
	else if((parseInt(from_Le)-1 == desti_Le || parseInt(from_Le)+1 == desti_Le) && from_Nu>= desti_Nu && from_Nu - desti_Nu ==1 && desti_Nu != from_Nu && isImg.length != 0 && isImg[0].src.includes("white")){
		return true;
	}
	else{
		return false;
	}
}

function wRook(thepiece, desti, from, from_Le, desti_Le, from_Nu, desti_Nu, isImg){
	var from_Le = from.id.charAt(0); 		//The letter that the piece is currently at
	var desti_Le = desti.id.charAt(0); 		//The letter of the destination that the player wants to move the piece to
	var from_Nu = from.id.charAt(2);		//The number of the location that the piece is currently at
	var desti_Nu = desti.id.charAt(2);		//The number of the location that the player wants to move the piece to
	var isImg = desti.getElementsByTagName('img');


}



//Checks if the path between from location to destination is legal. Meaning that it is clear of other pieces. 
function isPieceBetween(from_Le, from_Nu, desti_Le, desti_Nu){
	var lengthOf = 0;
	var UpDown;
	if(from_Nu < desti_Nu){
		lengthOf = desti_Nu - from_Nu -1;
		UpDown = 'D';
	}else if (from_Nu > desti_Nu){
		lengthOf = from_Nu - desti_Nu -1;
		console.log("jeppsi");
		UpDown = 'U';
	}
	console.log("from: " + parseInt(from_Nu) + "to: " + desti_Nu + "length: " + lengthOf)
	if(from_Le == desti_Le && UpDown == 'D'){
		for(i = parseInt(from_Nu)+1; i <= parseInt(from_Nu)+lengthOf; i ++){
			id = ""+ from_Le + '_'+ i;
			console.log("this is id: " +id);
			console.log(document.getElementById(id));
			if(document.getElementById(id).getElementsByTagName('img').length != 0){
				return false;
			}
		}
	}
		else if(from_Le == desti_Le && UpDown == 'U'){
			console.log("its a brownie");
			for(i = parseInt(desti_Nu)+1; i <= parseInt(desti_Nu)+lengthOf; i ++){
				id = ""+ from_Le + '_'+ i;
				console.log("this is id: " +id);
				console.log(document.getElementById(id));
				if(document.getElementById(id).getElementsByTagName('img').length != 0){
					return false;
			}
		}
	}	
	return true;

}

function resetboard(){
	
	for (let i = 0; i < document.getElementsByClassName("white").length; i++){
		document.getElementsByClassName("white")[i].style.backgroundColor = "";
		document.getElementsByClassName("black")[i].style.backgroundColor = "";
	}
	if (numberOfclicks == 1){
		selected.style.backgroundColor ="green";
	}
}
