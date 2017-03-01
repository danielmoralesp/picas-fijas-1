class Number {

  constructor(minGoalNumber, maxGoalNumber){
    this.minAleatoryNumber = minGoalNumber;
    this.maxAleatoryNumber = maxGoalNumber;
    this.numberGoal = function(){
      return generateValidNumber(this.minAleatoryNumber, this.maxAleatoryNumber);
    }
    this.spades = 0;
    this.fixed = 0;


    var countDigitInNumber = function(element, number){ // encuentra un digito en el número y cuento cuantas veces esta
      let regExp = new RegExp(element, "g");
      return this.match(regExp).length;
    }

    var  generateTimesDigits= function(number){ //cuenta el número de veces qur esta cada digito un dígito
      let stringNumber =  number.toString();
      let arrayNumber = stringNumber.split("");
      return arrayNumber.map(countDigitInNumber, stringNumber);
    }

    var generateNumber = function(minNumber, maxNumber){ // genera un número aleatorio en el rango indicado
      let range = (maxNumber - minNumber + 1);
      return (Math.floor(Math.random() * range)  + minNumber);
    }

    var generateValidNumber = function(minNumber, maxNumber){ //genera un número aleatorio que no tenga digitos repetidos
       let numberOk= false;

       while(!numberOk){
         var number = generateNumber(minNumber, maxNumber);
         var timesDigits = generateTimesDigits(number);
         let index = 0;
         while(timesDigits[index] === 1 && index < timesDigits.length){index++;}
         if(index === timesDigits.length){numberOk = true;}
       }

       return number;
    }

  }
}


var obj1 = new Number(100000,999999);
console.log(obj1.numberGoal());
