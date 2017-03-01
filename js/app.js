class Number {

  constructor(minGoalNumber, maxGoalNumber){
    this.minAleatoryNumber = minGoalNumber;
    this.maxAleatoryNumber = maxGoalNumber;
    this.goalNumber = 0;
    this.inputNumber = 0;
    this.numberSpades = 0;
    this.numberFixed = 0;


    var  countTimesDigits= function(number){ //cuenta el número de veces qur esta cada digito un dígito
      var countDigitInNumber = function(element, number){ // encuentra un digito en el número y cuento cuantas veces esta
        let regExp = new RegExp(element, "g");
        return this.match(regExp).length;
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

    this.isValidInputNumber = function(){ // verifica que el número ingresado por el usuario sea válido
        var lenGoalNumber = this.goalNumber.toString().split("").length;
        var regExp = new RegExp("\\b" + "\\d{" + lenGoalNumber + "}" +"\\b");
        var validNumber = false;

        if((isValidNumber(this.inputNumber)) && (regExp.test(this.inputNumber))){ // verfica que el número no tenga digitos repetidos y tenga 4 digitos
          validNumber = true;
        }

        return validNumber
    }

    this.setGoalNumber = function(){

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

  }

}


var obj1 = new Number(1000,9999);
obj1.setGoalNumber();
obj1.inputNumber = 1265;
console.log(obj1.isValidInputNumber());
