/////////////// 'Class' Number (Model)/////////////////////////

  var Number = (function(){
    var minAleatoryNumber = 0;
    var maxAleatoryNumber = 0;
    var goalNumber = 0;
    var inputNumber = 0;
    var elements = {numberSpades: 0,numberFixeds:0};
    
    function generateNumber (minNumber, maxNumber){ // genera un número aleatorio en el rango indicado
      let range = (maxNumber - minNumber + 1);
      return (Math.floor(Math.random() * range)  + minNumber);
    }
    
    function generateValidNumber (minNumber, maxNumber){ //genera un número aleatorio que no tenga digitos repetidos
       var number = generateNumber(minNumber, maxNumber);

       while(!isValidNumber(number)){
         number = generateNumber(minNumber, maxNumber);
       }

       return number;
    }
    
    function countTimesDigits (number){ //cuenta el número de veces qur esta cada digito en un número

      function countDigitInNumber (element, number){ // encuentra un digito en el número y cuento cuantas veces esta
        let regExp = new RegExp(element, "g");
        return this.match(regExp).length; // this se refiere al tercer elemento que se envia al invocar la funcion
      }

      let stringNumber =  number.toString();
      let arrayNumber = stringNumber.split("");
      return arrayNumber.map(countDigitInNumber, stringNumber);
    }

    function isValidNumber (number){ // verifica que un número no tenga digitos repetidos
      let index = 0;
      let timesDigits = countTimesDigits(number);
      while(timesDigits[index] === 1 && index < timesDigits.length){index++;}
      var numberOk = index === timesDigits.length ? true : false;

      return numberOk;
    }

    function checkValidInputNumber (){
      var lenGoalNumber = goalNumber.split("").length;
      var regExp = new RegExp("\\b" + "\\d{" + lenGoalNumber + "}" +"\\b");
      var validNumber = false;

      if((isValidNumber(inputNumber)) && (regExp.test(inputNumber))){ // verfica que el número no tenga digitos repetidos y tenga 4 digitos
        validNumber = true;
      }

      return validNumber
    }

    function getPositionDigit (digit){ // retorna la posicion en la que se encuentra el digito en el el número generado por el sistema
      var regExp = new RegExp(digit);
      return goalNumber.match(regExp).index
    }

    function isDigitInNumber (digit){ // verifica que el digito esta en el número generado por el sistema
      var regExp = new RegExp(digit);
      return goalNumber.toString().match(regExp) != null ? true : false
    }

    function matchDigitInGoalNumber (item, index){ // verifica que un digito del numero que ingresado este en la misma que el número generado por el sistema

      if(isDigitInNumber(item)){ // verifica que si este el digito en el número
        var match = getPositionDigit(item) === index ? "fixed" : "spade"; // fijas verdadero, picas falso
      }
      return match || "NA"; //si no hay digitos en el número no aplica
    }

    function countElements (typeElement){
      return function(){ // se aprovecha del clousure
        var arrayInputNumber = inputNumber.split("");
        var contElement = 0;

        for (let i = 0; i < arrayInputNumber.length; i++) {
           let matchDigit = matchDigitInGoalNumber(arrayInputNumber[i] , i);
           if(typeElement === matchDigit) // cuenta según el elemnto indicado spade o fixed
             contElement +=1;
        }
        return contElement;
      }

    }

    function setMinGoalNumber (minGoalNumber){minAleatoryNumber = minGoalNumber;}

    function setMaxGoalNumber(maxGoalNumber){maxAleatoryNumber = maxGoalNumber;}

    function setGoalNumber(){goalNumber =  generateValidNumber(minAleatoryNumber, maxAleatoryNumber).toString();}

    function getGoalNumber(){return goalNumber;}

    function setInputNumber(inputN){inputNumber = inputN.toString();}

    function getInputNumber(){return inputNumber;}

    function getSpades(){return elements.numberSpades;}

    function getLengGoalNumber(){return getGoalNumber().length}

    function setSpades(){
      var countSpades = countElements("spade");
      elements.numberSpades = countSpades();
    }

    function getFixeds(){return elements.numberFixeds;}

    function setFixeds(){
      var countFixeds = countElements("fixed");
      elements.numberFixeds = countFixeds();
    }

    function isValidInputNumber(){ return checkValidInputNumber();} // verifica que el número ingresado por el usuario sea válido

    function isWinnerNumber(){
      return getFixeds() === getGoalNumber().length ? true : false;
    }


    function getActualNumberObject(){
      var number = {};
      number.inputNumber = getInputNumber();
      number.numberSpades = getSpades();
      number.numberFixeds = getFixeds();
      return number;
    }

    function setMinGoalNumber (minGoalNumber){minAleatoryNumber = minGoalNumber;}

    return {
      setMinGoalNumber:      setMinGoalNumber,
      setMaxGoalNumber:      setMaxGoalNumber,
      setGoalNumber:         setGoalNumber,
      getGoalNumber:         getGoalNumber,
      setInputNumber:        setInputNumber,
      getInputNumber:        getInputNumber,
      isValidInputNumber:    isValidInputNumber, // true valido, false invalido
      setSpades :            setSpades,
      getSpades:             getSpades,
      setFixeds :            setFixeds,
      getFixeds:             getFixeds ,
      isWinnerNumber:        isWinnerNumber,
      getActualNumberObject: getActualNumberObject,
      getLengGoalNumber:     getLengGoalNumber
    }

  })();

  ////////'Class View'////////////////
  var View = (function(){

    function addRowsTable(data){
      var source = $('#data-rows-table-template').html();
      var template = Handlebars.compile(source);
      $('.tbody-number').append(template({'number':data}));
    }

    return{
      addRowsTable: addRowsTable
    }

  })();

  /////////////// 'Class' GAME (Controller)/////////////////////////

  function Game(min,max){
    this.min = min;
    this.max = max;
  }

  Game.prototype.startGame = function(){
    Number.setMinGoalNumber(this.min);
    Number.setMaxGoalNumber(this.max);
    Number.setGoalNumber();
  }

  Game.prototype.endGame = function(){
    console.log("Felicitaciones has ganado el juego!!!");
  }

  Game.prototype.Playgame = function(inputNumber){
    var endGame = false;

    Number.setInputNumber(inputNumber);

    if(!Number.isValidInputNumber()){
      alert("El número es invalido, debe tener " + Number.getLengGoalNumber() + " Cifras diferentes");
    }else{
      Number.setSpades();
      Number.setFixeds();
      if(Number.isWinnerNumber()){
        showMessageEndGame();
        endGame = true;
        
      }else{
        let number = Number.getActualNumberObject();
        console.log("Numero: " + number.inputNumber);
        console.log("Picas: " + number.numberSpades);
        console.log("Fijas: " + number.numberFixeds);
      }
    }
    return endGame;
  }


  /*var game = new Game(1000,9999);
  game.startGame();
  console.log(Number.getGoalNumber());
  console.log("Bienvenido al juego de picas y fijas!!!!!! \n\n");

  do{
   var inputNumber = prompt("Ingresa por favor un numero de 4 cifras");
  }while(!game.Playgame(inputNumber))
  game.endGame();
  */
  
  $(document).ready(function(){
    var game = new Game(1000, 9999);
    game.startGame();
    console.log(Number.getGoalNumber());
  });