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

    function makeTemplate(template){
      return Handlebars.compile(template.html());
    }

    function getInputNumber(){
      return $('#input-number').val();
    }

    function showMessageErrorInputNumber(){ // muestra un mensaje de error
      if(!$('#error-message').length){
        var template = makeTemplate($('#error-message-template'));
        $('.wrapper-error-message').append(template());
      }
    }

    function deleteMessageErrorInputNumber(){
      $('.alert-danger').remove();
    }

    function showMove(data){
      var template = makeTemplate($('#data-rows-table-template'));
      $('tbody').prepend(template({'number':data})).fadeIn('fast');
    }
    
    function clearInputNumber(){
      $('#input-number').val("");
    }
    function showEndGameModal(){
      $('.modal-end').show('fast');
    }

    function hideEndGameModal(){
     $('.modal-end').hide('fast');
    }

    return{
      showMessageErrorInputNumber:   showMessageErrorInputNumber,
      showMove:                      showMove,
      showEndGameModal:              showEndGameModal,
      hideEndGameModal:              hideEndGameModal,
      deleteMessageErrorInputNumber: deleteMessageErrorInputNumber,
      getInputNumber:                getInputNumber,
      clearInputNumber:              clearInputNumber
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
    View.clearInputNumber();

  }

  Game.prototype.endGame = function(){
    console.log("Felicitaciones has ganado el juego!!!");
  }

  Game.prototype.Playgame = function(inputNumber){ // analiza una jugada, si retorna true entonces el jugado adivido el número
    var endGame = false;

    function setNumberInTable(){
      Number.setSpades();
      Number.setFixeds();
      propertiesInputNumber = Number.getActualNumberObject();
      View.showMove(propertiesInputNumber);//muestra la jugada en pantalla
    }

    Number.setInputNumber(inputNumber); //setea el número de entrada con la clase Number

    if(!Number.isValidInputNumber()){ // verifica que el número ingresado si tenga cuatro digitos diferentes
      View.showMessageErrorInputNumber(); //Muestra un error en la pantalla
    }else{
      if($('.alert-danger').length){View.deleteMessageErrorInputNumber();} // en caso de que el usuario no cierre el mensaje de error, se cierra automaticamente
      setNumberInTable(); // Imprime en la pantalla el resultado del jugada
    }

    if(Number.isWinnerNumber()){
      endGame = true;
    }

    return endGame;
  }

/////////////Run Game///////////////////////
  var game = new Game(1000, 9999);
  
  $(document).ready(function(){
    game.startGame();
    console.log(Number.getGoalNumber());
  });

  $('#input-number').keypress(function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();

      var inputNumber = View.getInputNumber();
      let endGame = game.Playgame(inputNumber);

      if(endGame){
         View.showEndGameModal()
      }
    }
  });

  $('#btn-reset').on('click', function(){
     View.hideEndGameModal();
  });
  /*$(window).on('load',function() { // espera mientras carga la pagina nuevamente, reinicia eljuego
     alert('Cargando...');
  });*/