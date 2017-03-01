class Number {

  constructor(minGoalNumber, maxGoalNumber){
    this.minAleatoryNumber = minGoalNumber;
    this.maxAleatoryNumber = maxGoalNumber;
    this.spades = 0;
    this.fixed = 0;
    this.goalNumber = 0;
    this.inputNumber = 0;

    var  countTimesDigits= function(number){ //cuenta el número de veces qur esta cada digito un dígito
      var countDigitInNumber = function(element, number){ // encuentra un digito en el número y cuento cuantas veces esta
        let regExp = new RegExp(element, "g");
        return this.match(regExp).length;
      }

      let stringNumber =  number.toString();
      let arrayNumber = stringNumber.split("");
      return arrayNumber.map(countDigitInNumber, stringNumber);
    }


    var isValidNumber = function(number){
      let timesDigits = countTimesDigits(number);
      let index = 0;
      while(timesDigits[index] === 1 && index < timesDigits.length){index++;}
      var numberOk = index === timesDigits.length ? true : false;
      return numberOk;
    }

    this.setGoalNumber = function(){

      var generateNumber = function(minNumber, maxNumber){ // genera un número aleatorio en el rango indicado
        let range = (maxNumber - minNumber + 1);
        return (Math.floor(Math.random() * range)  + minNumber);
      }

      var generateValidNumber = function(minNumber, maxNumber){ //genera un número aleatorio que no tenga digitos repetidos
         let numberOk= false;

         while(!numberOk){
           var number = generateNumber(minNumber, maxNumber);
           let timesDigits = countTimesDigits(number);
           let index = 0;
           while(timesDigits[index] === 1 && index < timesDigits.length){index++;}
           if(index === timesDigits.length){numberOk = true;}
         }

         return number;
      }
      this.goalNumber =  generateValidNumber(this.minAleatoryNumber, this.maxAleatoryNumber);
    }


  }

}


var obj1 = new Number(10,100);
obj1.setGoalNumber();
console.log(obj1.goalNumber)