class Number {

  constructor(minGoalNumber, maxGoalNumber){
    this.minAleatoryNumber = minGoalNumber;
    this.maxAleatoryNumber = maxGoalNumber;
    this.goalNumber = 0;
    this.inputNumber = 0;
    this.numberSpades = 0;
    this.numberFixed = 0;
  }


  generateGoalNumber(){

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
         let timesDigits = generateTimesDigits(number);
         let index = 0;
         while(timesDigits[index] === 1 && index < timesDigits.length){index++;}
         if(index === timesDigits.length){numberOk = true;}
       }

       return number;
    }
    this.goalNumber =  generateValidNumber(this.minAleatoryNumber, this.maxAleatoryNumber);
  }

}


var obj1 = new Number(10,100);
var obj2 = new Number(1000, 10000);
console.log(obj1.goalNumber);
console.log(obj2.goalNumber);
obj1.generateGoalNumber();
obj2.generateGoalNumber();

console.log(obj1.goalNumber);
console.log(obj2.goalNumber);
console.log(obj2);