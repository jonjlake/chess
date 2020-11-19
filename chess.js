/**
 * @file chess.js
 * @author jlake
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


/**
 *
 * @param col
 * @param row
 */
function Location(col, row) {
  this.col=col;
  this.row=row;
  this.colString="0abcdefgh";
  this.colChar=function(colNum){
    return this.colString[colNum];
  }

  this.colNum=function(){
    return this.colString.indexOf(this.col);
  }
}


/**
 *
 * @param color
 * @param location
 * @param symbol
 */
function Piece(color, location, symbol){

  this.color=color;
  this.location=location;
  this.symbol=symbol;

  Piece.showMoves=function(location){

	  var moves=location;
	  return moves;
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
    this,color,location, "Q");
}


/**
 *
 * @param color
 * @param location
 */
function King(color, location)
{
  Piece.call(
    this,color,location, "K");
}


/**
 *
 * @param color
 * @param location
 */
function Rook(color, location)
{
  Piece.call(
    this,color,location, "R");
}


/**
 * @param color
 * @param location
 */
function Bishop(color, location)
{
  Piece.call(
    this,color,location, "B");
}


/**
 * @param color
 * @param location
 */
function Knight(color, location)
{
  Piece.call(
    this,color,location,"N");
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
    this,color,location, "P");

  this.move = function(newLocation) {
  }

  this.showMoves = function(){
  }

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

     this.pieces.push(new Pawn(color, new Location(col, row)));
  }

  /**
   *
   * @param color
   * @param col
   * @param row
   */
  this.addKnight=function(color, col, row){

      this.pieces.push(new Knight(color, new Location(col,row)));
  }


  this.addBishop=function(color, col, row) {

    this.pieces.push(new Bishop(color, new Location(col,row)));
  }


  this.addRook=function(color, col, row) {

    this.pieces.push(new Rook(color, new Location(col,row)));
  }


  this.addQueen=function(color, col, row) {

    this.pieces.push(new Queen(color, new Location(col,row)));
  }


  this.addKing=function(color, col, row) {

    this.pieces.push(new King(color, new Location(col,row)));
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
      var l=pieces[i].location;
      if (l.col===square[0] &&
          l.row===parseInt(square[1])){
        return pieces[i];
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
      cell.id=c.toString()+r.toString();
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


/**
 *
 */
function selectPiece(){

  if(this.innerHTML !== ""){

    //this.style.borderColor= "blue";
    this.style.fontSize= "150%";
  }

  var cells=T("board-table","td");

  for(var i=0;i<cells.length;i++){

    if (cells[i] !== this){

      cells[i].style.borderColor= "white";
      cells[i].style.fontSize= "100%";
    }
  }

  var movesList=Piece.showMoves(this.id);

  console.log(movesList);
}

