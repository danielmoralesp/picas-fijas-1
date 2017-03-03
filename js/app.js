
  var Number = function(){
    var minAleatoryNumber = 0;
    var maxAleatoryNumber = 0;
    var goalNumber = 0;
    var inputNumber = 0;
    var elements = {numberSpades: 0,numberFixeds:0};
    
    var generateNumber = function(minNumber, maxNumber){ // genera un número aleatorio en el rango indicado
      let range = (maxNumber - minNumber + 1);
      return (Math.floor(Math.random() * range)  + minNumber);
    }
    
    var generateValidNumber = function(minNumber, maxNumber){ //genera un número aleatorio que no tenga digitos repetidos
       var number = generateNumber(minNumber, maxNumber);

       while(!isValidNumber(number)){
         number = generateNumber(minNumber, maxNumber);
       }

       return number;
    }
    
    var  countTimesDigits= function(number){ //cuenta el número de veces qur esta cada digito en un número

      var countDigitInNumber = function(element, number){ // encuentra un digito en el número y cuento cuantas veces esta
        let regExp = new RegExp(element, "g");
        return this.match(regExp).length; // this se refiere al tercer elemento que se envia al invocar la funcion
      }

      let stringNumber =  number.toString();
      let arrayNumber = stringNumber.split("");
      return arrayNumber.map(countDigitInNumber, stringNumber);
    }

    var isValidNumber = function(number){ // verifica que un número no tenga digitos repetidos
      let index = 0;
      let timesDigits = countTimesDigits(number);
      while(timesDigits[index] === 1 && index < timesDigits.length){index++;}
      var numberOk = index === timesDigits.length ? true : false;

      return numberOk;
    }

    var checkValidInputNumber = function(){
      var lenGoalNumber = goalNumber.split("").length;
      var regExp = new RegExp("\\b" + "\\d{" + lenGoalNumber + "}" +"\\b");
      var validNumber = false;

      if((isValidNumber(inputNumber)) && (regExp.test(inputNumber))){ // verfica que el número no tenga digitos repetidos y tenga 4 digitos
        validNumber = true;
      }

      return validNumber
    }

    var getPositionDigit = function(digit){ // retorna la posicion en la que se encuentra el digito en el el número generado por el sistema
      var regExp = new RegExp(digit);
      return goalNumber.match(regExp).index
    }

    var isDigitInNumber = function(digit){ // verifica que el digito esta en el número generado por el sistema
      var regExp = new RegExp(digit);
      return goalNumber.toString().match(regExp) != null ? true : false
    }

    var matchDigitInGoalNumber = function(item, index){ // verifica que un digito del numero que ingresado este en la misma que el número generado por el sistema

      if(isDigitInNumber(item)){ // verifica que si este el digito en el número
        var match = getPositionDigit(item) === index ? "fixed" : "spade"; // fijas verdadero, picas falso
      }
      return match || "NA"; //si no hay digitos en el número no aplica
    }

    var countElements = function(typeElement){
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

    return {
      setMinGoalNumber: function(minGoalNumber){minAleatoryNumber = minGoalNumber;},
      setMaxGoalNumber: function(maxGoalNumber){maxAleatoryNumber = maxGoalNumber;},
      setGoalNumber: function(){goalNumber =  generateValidNumber(minAleatoryNumber, maxAleatoryNumber).toString();},
      getGoalNumber: function(){return goalNumber;},
      setInputNumber: function(inputN){inputNumber = inputN.toString();},
      getInputNumber: function(){return inputNumber;},
      isValidInputNumber: function(){ return checkValidInputNumber();}, // verifica que el número ingresado por el usuario sea válido
      setSpades : function(){
        var countSpades = countElements("spade");
        elements.numberSpades = countSpades();
      },
      getSpades: function(){return elements.numberSpades;},
      setFixeds :function(){
        var countFixeds = countElements("fixed");
        elements.numberFixeds = countFixeds();
      },
      getFixeds: function(){return elements.numberFixeds;}
    }

  };


var obj1 = new Number();

obj1.setMinGoalNumber(1000);
obj1.setMaxGoalNumber(9999);

obj1.setGoalNumber();
obj1.setInputNumber(1234);
console.log(obj1.isValidInputNumber());
console.log(obj1.getGoalNumber());
obj1.setSpades();
obj1.setFixeds();
console.log("numero de picas: " + obj1.getSpades());
console.log("numero de fijas: " + obj1.getFixeds());

