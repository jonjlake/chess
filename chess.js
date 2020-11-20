/**
 * @file chess.js
 * @author jlake
 */

/**
 * TODO:
 * 1. Generate moves for more piece types
 * 2. Disallow moves that are blocked by another piece
 * 3. Disallow selection/moves if it's not the color's turn
 * 4. Generate moves in reverse for black
 * 5. Actually move the pieces
 * 6. Handle piece capture
 * 7. Handle check
 * 8. Handle checkmate
 * 9. Change turn
 */

/**
 *
 * @param object
 */
function O(object) {
  return typeof object == "object" ? object : document.getElementById(object);
}


/**
 *
 * @param object
 * @param tag
 */
function T(object, tag){
  return O(object).getElementsByTagName(tag);
}


function tempColLetter(colNum){
  return "0abcdefgh"[colNum];
}

/**
 *
 * @param col
 * @param row
 */
function BoardLocation(col, row) {
  this.col=col;
  this.row=row;
  BoardLocation.prototype.colString="0abcdefgh";

  BoardLocation.colLetter = function(colNum) {
    return this.colString[colNum];
  }

  this.colNum=function(){
    return this.colString.indexOf(this.col);
  }

  this.createFromSquareName = function(squareName) {
    this.col = this.colString.indexOf(squareName[0]);
    this.row = parseInt(squareName[1]);
  }

  this.getSquareName = function() {
    var squareName = "0abcdefgh"[this.col];
    squareName += this.row; 
    return squareName; 
  }
}


/**
 *
 * @param color Piece color, "white" or "black"
 * @param location
 * @param symbol Symbol of the piece to be displayed on the page
 */
function Piece(color, location, symbol){

  this.color=color;
  this.location=location;
  this.symbol=symbol;

  Piece.showMoves=function(location){

	  var moves=location;
	  return moves;
  }

  Piece.getPawnMoves = function(location, isFirstMove) {

    var movesList = [];
    var newBoardLocation = new BoardLocation(0,0);
    newBoardLocation.createFromSquareName(location);
    newBoardLocation.row += 1;
    movesList.push(newBoardLocation);
    if (isFirstMove) {
      var newBoardLocation = new BoardLocation(0,0);
      newBoardLocation.createFromSquareName(location);
      newBoardLocation.row += 2;
      movesList.push(newBoardLocation);
    }

    return movesList;
  }
  
  Piece.getRookMoves = function(location, isFirstMove) {
    var movesList = [];
    var newBoardLocation = null;
    for (var i = 1; i <=8; i++) {
      newBoardLocation = new BoardLocation(0,0);
      newBoardLocation.createFromSquareName(location);
      newBoardLocation.row = i;
      console.log("i: " + i + " location[1]: " + location[1]);
      if (i !== parseInt(location[1])) {
        console.log("Adding move " + JSON.stringify(newBoardLocation));
        movesList.push(newBoardLocation);
      }
    }      
    // Do columns next
    for (var i = 1; i <=8; i++) {
      newBoardLocation = new BoardLocation(0,0);
      newBoardLocation.createFromSquareName(location);
      newBoardLocation.col = i;
      console.log("Looking at");
      if (i !== "0abcdefgh".indexOf(location[0])) {
        movesList.push(newBoardLocation);
      }
    }
    
    return movesList; 
  }
}


/**
 *
 * @param color
 * @param location
 */
function Queen(color, location)
{
  Piece.call(
//    this,color,location, "Q");
    this,color,location, "&#9813;");
}


/**
 *
 * @param color
 * @param location
 */
function King(color, location)
{
  Piece.call(
//    this,color,location, "K");
    this,color,location, "&#9812;");
}


/**
 *
 * @param color
 * @param location
 */
function Rook(color, location)
{
  Piece.call(
//    this,color,location, "R");
    this,color,location, "&#9814");
  this.getMoves = Piece.getRookMoves;
}


/**
 * @param color
 * @param location
 */
function Bishop(color, location)
{
  Piece.call(
//    this,color,location, "B");
    this,color,location, "&#9815");
}


/**
 * @param color
 * @param location
 */
function Knight(color, location)
{
  Piece.call(
//    this,color,location,"N");
    this,color,location,"&#9816");
}


/**
 *
 * @param color
 * @param location
 */
function Pawn(color, location)
{
  this.firstMove=true;

  Piece.call(
//    this,color,location, "P");
    this,color,location, "&#9817");
  this.move = function(newBoardLocation) {
  }

  this.getMoves = Piece.getPawnMoves;

  this.generatePath=function(destination) {
  }
}


/**
 *
 */
function Board(){

  this.pieces = [];

  /**
   *
   */
  this.initPieces = function(){

    var cols= "abcdefgh";

    for (var i=0;i<cols.length;i++){

      this.addPawn(
        "white", cols[i], 2);

      this.addPawn(
        "black", cols[i], 7);
    }

    this.addKnight("white","b",1);
    this.addKnight("black","b",8);
    this.addKnight("white","g",1);
    this.addKnight("black","g",8);
    this.addBishop("white","c",1);
    this.addBishop("black","c",8);
    this.addBishop("white","f",1);
    this.addBishop("black","f",8);
    this.addRook("white","a",1);
    this.addRook("black","a",8);
    this.addRook("white","h",1);
    this.addRook("black","h",8);
    this.addKing("white","e",1);
    this.addKing("black","e",8);
    this.addQueen("white","d",1);
    this.addQueen("black","d",8);
  }

  /**
   *
   * @param color
   * @param col
   * @param row
   */
  this.addPawn=function(color, col, row){

     this.pieces.push(new Pawn(color, new BoardLocation(col, row)));
  }

  /**
   *
   * @param color
   * @param col
   * @param row
   */
  this.addKnight=function(color, col, row){

      this.pieces.push(new Knight(color, new BoardLocation(col,row)));
  }


  this.addBishop=function(color, col, row) {

    this.pieces.push(new Bishop(color, new BoardLocation(col,row)));
  }


  this.addRook=function(color, col, row) {

    this.pieces.push(new Rook(color, new BoardLocation(col,row)));
  }


  this.addQueen=function(color, col, row) {

    this.pieces.push(new Queen(color, new BoardLocation(col,row)));
  }


  this.addKing=function(color, col, row) {

    this.pieces.push(new King(color, new BoardLocation(col,row)));
  }


  /**
   *
   */
  this.showPieces=function(){

    var table=O("board-table");
    var rows=T(table, "tr");

    for (var i=0;i<this.pieces.length;i++) {

      var piece=this.pieces[i];
      var pRow=piece.location.row;
      var pCol=piece.location.colNum();
      var bRow=9-pRow-1;
      var cell=T(rows[bRow], "td")[pCol-1];
      cell.innerHTML=piece.symbol;
      cell.style.color=piece.color;
    }
  }

  /**
   *
   * @param square
   */
  this.getPiece =function(square){

    var piece=null;

    for(var i=0;i<this.pieces.length;i++){
      var l=this.pieces[i].location;
      if (l.col===square[0] &&
          l.row===parseInt(square[1])){
        return this.pieces[i];
      }
    }

    return piece;
  }

  /**
   * @param square
   */
  this.getMoves=function(square){

    var piece= 
      this.getPiece(square);

    if (piece===null){
      return "";
    }

    return piece.getMoves();
  }
}


/**
 *
 */
function Game() {

  this.isWhitesTurn=true;
  this.annotations=true;

  this.board=new Board();
  this.board.initPieces();
  this.board.showPieces();
  //this.timer=new Timer();
}


/**
 *
 * @param type
 */
function mkEl(type){

  return document.createElement(type);
}


/**
 *
 */
function createBoard(){

  var table=mkEl("table");
  table.id="board-table";
  var squareIsWhite=true;//a1 black, a8 w

  for(var r=8; r>=1; r--) {

    var row=mkEl("tr");
    for (var c=1; c<=8; c++) {

      var cell=mkEl("td");
//      cell.id=c.toString()+r.toString();
//      cell.id=BoardLocation.colLetter(c)+r.toString();
      cell.id=tempColLetter(c)+r.toString();
      cell.className=squareIsWhite? "white-square":"black-square";
      squareIsWhite=!squareIsWhite;
      cell.onclick=selectPiece;
      row.appendChild(cell);
    }

    squareIsWhite=!squareIsWhite;
    table.appendChild(row);
  }

  document.body.appendChild(table);
}

function showMoves(movesList) {
  var cells = T("board-table", "td");
  try{
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.borderColor = "white";
      for (var j = 0; j < movesList.length; j++) {
        var moveSquareName = tempColLetter(movesList[j].col) + movesList[j].row.toString(); 
        if (moveSquareName.valueOf() === cells[i].id.valueOf()) {
          cells[i].style.borderColor = "red";
        }
      } 
    } 
  } catch(e){
    console.error(e);
  }
}

/**
 *
 */
function selectPiece(){

  if(this.innerHTML !== ""){

//    this.style.borderColor= "blue";
    this.style.fontSize= "150%";
  }

  var cells=T("board-table","td");

  for(var i=0;i<cells.length;i++){

    if (cells[i] !== this){

      cells[i].style.borderColor= "white";
      cells[i].style.fontSize= "100%";
    }
  }

  if (this.innerHTML !== "") {
    var piece = game.board.getPiece(this.id);
//    console.log("Got piece " + JSON.stringify(piece));
    //var movesList=Piece.getPawnMoves(this.id, true);
    var movesList=piece.getMoves(this.id, true);
    console.log("Got movesList " + JSON.stringify(movesList)); 
    showMoves(movesList);
  }

//  console.log(JSON.stringify(movesList));
}

