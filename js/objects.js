#!/usr/bin/env node

// your code


//!!!!!!!! Note on get and set at the very bottom!!!!!!!!!!


//overview, essentiqally every 'type' of 'Object' is creating a 
//js Object as below. So say for example the Con it needs
//a refence to the function because that is the property name.
//Whereas in contrast the factory returns that function so it 
//can be declared in the Factory without reference. 
// Private variables are a bit confusing. The class returns the 
// private varable in the function but it can't be accessed because
//you can't go .# on the object. Whereas Con and Fact the private
//var is not in the object so I don't know where it is stored
//if not in the object?? Seems to work just doesn't make as much sense.
//Don't know how much in practise you'd need a private var but
//maybe just use class when you do??
//Also another thought process for understanding. The 'this.' makes 
//a function essentially an object^^. But for factory you are returning 
//a object for you don't 'this.'. Class is a syntax over the top of 
//of the nuts and bolts so it sort uses a bit of both ideas/syntax.
//^^Although of course for construtor model you can use .protoype to add
//functions or variables to the object (because i guess essentially  
//the prototype is Object hmm yes not a coincidence)


const myObject = {
    property: 'Value!',
    otherProperty: 77,
    myFunction: function() {
      console.log("hiya");
    }
  };
  
  myObject.myFunction();
  
  
  
  //Constructor
  function playerCreatorCon(name, score) {
  
    this.name = name;
    this.score = score;
  
    let privateCon = "private CON";
    // this.getPrivate = function() {
    //   console.log(privateCon);
    // };
    this.getPrivate = getPrivateF;    //this works as does above
    function getPrivateF() {
      console.log("private con 1: " + privateCon);
    }
    this.setPrivate = function(newPrv) {
      privateCon = newPrv;
      console.log("set private: " + privateCon);
    }
  
  }
  
  playerCreatorCon.prototype.increment = function () {
    this.score++;
  };
  playerCreatorCon.prototype.updateName = function (newName) {
    this.name = newName;
  };
  playerCreatorCon.prototype.sharedVar = "heyCon";
  
  
  let playerCon = new playerCreatorCon("John", 8);
  
  console.log(playerCon);
  
  playerCon.increment(); // 9
  
  console.log("Con: " + playerCon.name);
  console.log("Con: " + playerCon.score);
  playerCon.updateName("FrankCon");
  console.log("Con Updated name: " + playerCon.name);
  console.log("Con shared var: " + playerCon.sharedVar);
  //console.log("private CON: " + prtivateCon);
  playerCon.getPrivate();
  
  let playerCon2 = new playerCreatorCon("John", 8);
  playerCon2.getPrivate();
  playerCon2.setPrivate("cock off");
  playerCon2.getPrivate();
  playerCon.getPrivate();
  
  
  
  
  // don't love this structure, see FR for prefered
  function playerCreatorF(name, score) {
    return {
      name: name,
      score: score,
      increment() {
        return (this.score += 1);
      },
    };
  }
  
  let playerF = playerCreatorF("John", 8);
  
  playerF.increment(); // 9
  
  console.log("F: " + playerF.name);
  console.log("F: " + playerF.score);
  
  
  
  //Factory
  function playerCreatorFR(name, score) {
    let sharedVar = "hey1"; //i.e. returned in the factory
    let privateVar = 0; //i.e. not returned in the factory
    
    function increment() {
      return (this.score += 1);
    }
  
    function updateName(newName) {
      console.log("up name pre" + this.name);
      this.name = newName;
      console.log("up name post" + this.name);
    }
  
    function incrementPrvB() {
      console.log("FR in private var: " + privateVar);
      privateVar += 1;
      console.log("FR in private var post: " + privateVar);
    }
  
    function getPrv() {
      return privateVar;
    }
  
    return {
      name,
      score,
      sharedVar,
      increment,
      updateName,
      incrementPrvB,
      getPrv,
    };
  }
  
  const playerFR = playerCreatorFR("John", 8);
  console.log(playerFR);
  
  playerFR.increment(); // 9
  
  console.log("FR name: " + playerFR.name);
  console.log("FR sacore: " + playerFR.score);
  
  playerFR.updateName("Frank");
  console.log("FR Updated name: " + playerFR.name);
  
  console.log("FR shared var1: " + playerFR.sharedVar);
  playerFR.sharedVar = "heyNow";
  console.log("FR shared var1 changed: " + playerFR.sharedVar);
  playerFR.incrementPrvB();
  //console.log("private var should fail FR: " + playerFR.privateVar);  //should fail does fail
  console.log("FR get private var: " + playerFR.getPrv());
  
  const playerFR2 = playerCreatorFR("Fred", 13);
  console.log("FR2 shared var1: " + playerFR2.name + " " + playerFR2.sharedVar);
  
  class playerCreatorC {
    sharedVar = "heyC";
    #privateVar = 1;
  
    constructor(name, score) {
      this.name = name;
      this.score = score;
    }
  
    increment() {
      this.score++;
    }
  
    updateName(newName) {
      this.name = newName;
    }
  
    incrementClPrv() {
      console.log("CL in private var: " + this.#privateVar);
      this.#privateVar += 1;
      console.log("CL in private var post: " + this.#privateVar);
    }
  
    getCPrv() {
      return this.#privateVar;
    }
  }
  
  let playerC = new playerCreatorC("John", 8);
  console.log(playerC);
  
  playerC.increment(); // 9
  
  console.log("C name: " + playerC.name);
  console.log("C score: " + playerC.score);
  
  playerC.updateName("Frank");
  console.log("C Updated name: " + playerC.name);
  
  console.log("C sharedVar: " + playerC.sharedVar);
  playerC.incrementClPrv();
  //console.log("C should not work privateVar: " + playerC.privateVar);
  console.log("C private Var: " + playerC.getCPrv());
  //console.log("private from C: " + playerC.#privateVar);
  
  
  
  // GET and SET
  //essentially changes the .something into a fucntion call
  //where the equals is the argument into the function
  //especiallt ingenious implemented in class, as below example,
  //because it invoke the .something on initialisation and therefore
  //can use it as an initialise check as well as property update
  //checks. Haven't fully figured out the exact syntax for this into
  //a Fact or a Con but i'm sure it can be done.
  
  const student = {
    firstName: 'Monica',
    
    //accessor property(setter)
    set changeName(newName) {
        this.firstName = newName;
    }
  };
  
  console.log(student.firstName); // Monica
  // change(set) object property using a setter
  student.changeName = 'Sarah';
  console.log(student.firstName); // Sarah
  
  
  const language = {
    set current(name) {
      this.log.push(name);
    },
    log: [],
  };
  
  language.current = 'EN';
  language.current = 'FA';
  
  console.log(language.log);
  // Expected output: Array ["EN", "FA"]
  
  
  class User {
  
    constructor(name) {
      // invokes the setter  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.name = name;
    }
  
    get name() {
      return this._name;
    }
  
    set name(value) {
      if (value.length < 4) {
        console.log("Name is too short.");
        return;
      }
      this._name = value;
    }
  }
  
  let user = new User("John");
  console.log(user.name); // John
  user = new User(""); // Name is too short.
  user.name = "Bob";
  user.name = "Tommy";
  console.log(user.name);
  let user2 = new User("Tim");