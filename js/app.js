
  var Number = function(){
    this.setMinGoalNumber = function(minGoalNumber){this.minAleatoryNumber = minGoalNumber;}
    this.setMaxGoalNumber = function(maxGoalNumber){this.maxAleatoryNumber = maxGoalNumber;}
    this.goalNumber = 0;
    this.inputNumber = 0;
    this.elements = {numberSpades: 0,numberFixeds:0}
  };
  
  (function(){

    var isValidNumber = function(number){ // verifica que un número no tenga digitos repetidos

      var  countTimesDigits= function(number){ //cuenta el número de veces qur esta cada digito en un número

        var countDigitInNumber = function(element, number){ // encuentra un digito en el número y cuento cuantas veces esta
          let regExp = new RegExp(element, "g");
          return this.match(regExp).length; // this se refiere al tercer elemento que se envia al invocar la funcion
        }

        let stringNumber =  number.toString();
        let arrayNumber = stringNumber.split("");
        return arrayNumber.map(countDigitInNumber, stringNumber);
      }


      let index = 0;
      let timesDigits = countTimesDigits(number);
      while(timesDigits[index] === 1 && index < timesDigits.length){index++;}
      var numberOk = index === timesDigits.length ? true : false;

      return numberOk;
    }

    this.isValidInputNumber = function(){ // verifica que el número ingresado por el usuario sea válido
        var lenGoalNumber = this.goalNumber.toString().split("").length;
        var regExp = new RegExp("\\b" + "\\d{" + lenGoalNumber + "}" +"\\b");
        var validNumber = false;

        if((isValidNumber(this.inputNumber)) && (regExp.test(this.inputNumber))){ // verfica que el número no tenga digitos repetidos y tenga 4 digitos
          validNumber = true;
        }

        return validNumber
    }

    this.setGoalNumber = function(){ // se setea el número generado por la máquina

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

      this.goalNumber =  generateValidNumber(this.minAleatoryNumber, this.maxAleatoryNumber);
    }


  }).call(Number.prototype);

  this.setInputNumber = function(inputNumber){
    this.inputNumber;
  }

  Number.prototype.countFixedsAndSpades = function(){ // cuenta cuantas fijas tiene el numero ingresado por el usuario

    var arrayInputNumber = this.inputNumber.toString().split("");
    var that = this // para que no se pierda el context

    function matchDigitInGoalNumber(item, index, that){ // verifica que un digito del numero que ingresado este en la misma que el número generado por el sistema

      var getPositionDigit = function(digit){ // retorna la posicion en la que se encuentra el digito en el el número generado por el sistema
        var regExp = new RegExp(digit);
        return that.goalNumber.toString().match(regExp).index
      }

      var isDigitInNumber = function(digit){ // verifica que el digito esta en el número generado por el sistema
        var regExp = new RegExp(digit);
        return that.goalNumber.toString().match(regExp) != null ? true : false
      }

      if(isDigitInNumber(item)){ // verifica que si este el digito en el número
        var match = getPositionDigit(item) === index ? true : false;
      }
      return match;
    }


    for (let i = 0; i < arrayInputNumber.length; i++) {
       var matchDigit = matchDigitInGoalNumber(arrayInputNumber[i] , i, that);
       if(matchDigit){ //si esta el digito del numero que ingresa el usuario en la misma posición que el generado por la maquina
          this.elements.numberFixeds += 1;
       }else if(matchDigit === false){
          this.elements.numberSpades += 1;
       }
    }

  }



var obj1 = new Number();

obj1.setMinGoalNumber(1000);
obj1.setMaxGoalNumber(9999);

obj1.setGoalNumber();
obj1.inputNumber = 1234;
console.log(obj1.goalNumber)
obj1.countFixedsAndSpades();
console.log("numero de picas: " + obj1.elements.numberSpades);
console.log("numero de fijas: " + obj1.elements.numberFixeds);

