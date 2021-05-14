// Renders the Calculator and its container
import { ENTRY_MAX, ENTRY_MAX_MSG, INIT, ON, OFF, STRING_INIT } from './comps/config'; // Setup goodies..
import { useEffect, useRef, useState } from 'react';
import './css/App.scss'; // Styling for the outershells.
import { Display, Keyboard, PowerBtn } from './comps'; // Get avaialbe components.

function App () {

  const [isPowered, setIsPowered] = useState(OFF);
  const [input, setInput] = useState("");
  const [highB, setHighB] = useState(OFF); // High Brightness: Hb, highB
  const [answer, setAnswer] = useState("0");
  const [errorMsg, setErrorMsg] = useState("");
  //const [activeInput, setActiveInput] = useState(STRING_INIT);

  const hasDecimal = useRef(false);
  //const eFormula = useRef(""); // External formula (with decimals)
  const iFormula = useRef(""); // Internal formula (without decimals)
  const entryCount = useRef(INIT);
  //const formulaCount = useRef(INIT);
  const hasAnswer = useRef(OFF);
  
  //console.log("formula:", iFormula.current);

  useEffect(() => {
    // Reset calculator status on power change
    setInput("");
    (isPowered) ? setAnswer(STRING_INIT) : setAnswer("");
    !isPowered && setHighB(OFF);
    !isPowered && (hasAnswer.current = OFF);
    !isPowered && (hasDecimal.current = OFF);
    !isPowered && (entryCount.current = INIT);
    !isPowered && (iFormula.current = "");
  }, [isPowered]);



  // Removes leading zeros
  function rmLeading(exp) {
    //return exp.replace(/^(0+)/, "").replace(/([-+*/])0+([1-9])/g, "$1$2");
    return (exp
      .replace(/^0+/, "0")
      .replace(/^0+([1-9])/, "$1")
      .replace(/([-+*/])0{2,}/g, "$10")
      .replace(/[-+*/.]*$/, "")
      .replace(/([-+*/])0+([1-9])/g, "$1$2")
    );
  }

  // Removes -- at the begining of an express and replaces -- with + elsewhere
  function fixDashes(exp) {
    return exp.replace(/^[-]{2}/, "").replace(/[-]{2}/, "+").replace(/[+][-]/, "-");
  }

  // Evaluates given expression and returns a value in string format
  const compute = (expression) => {
    console.log("rec: ", expression);
    console.log("what it will look after makeup", rmLeading(expression))
    return  (Math.round(1000000000000 * eval(rmLeading(expression))) / 1000000000000).toString();
  }

  const notify = (message) => {
    setErrorMsg(message);
    setTimeout(() => { setErrorMsg("") }, 1000);
  }

  const handleInput = (inputKey) => {

    console.log("IF in hi", iFormula.current);
    console.log("EF in hi", input);
    //(input === "") && (iFormula.current = "");

    if (/[C]/.test(inputKey.toUpperCase())) {
      // All clear received
      setInput("");
      //setActiveInput("");
      setAnswer(STRING_INIT);
      hasAnswer.current = OFF;
      hasDecimal.current = OFF;
      entryCount.current = INIT;
      iFormula.current = "";
      // All cleared
    } else if (/[=]/.test(inputKey) & (!hasAnswer.current)) {
      console.log("in here", iFormula.current);
      if(/^[-]?\d{1,12}[-+=*/][-]?\d{1,12}([-+=*/][-]?\d{1,12}){0,10}[-+*/]?$/.test(iFormula.current)) {
        setAnswer(compute(input.replace(/[\D]$/, "")));// Remove any operator or decimal after the last input
        hasAnswer.current = ON;
        iFormula.current = "";
        hasDecimal.current = OFF;
        entryCount.current = INIT;
        console.log("in there", input.replace(/[\D]$/, ""));
        setInput(rmLeading(input))
      }
    } else {
      console.log("close in now");
        if (/[.]/.test(inputKey)) { //& (!hasAnswer.current)) {
            if (hasAnswer.current) {
              setInput(STRING_INIT + inputKey);
              hasAnswer.current = OFF;
              hasDecimal.current = ON;
              entryCount.current = INIT;
              //iFormula.current = STRING_INIT;
            } else if (entryCount.current === INIT & !hasDecimal.current) {
              setInput(input + STRING_INIT + inputKey);
              hasDecimal.current = ON;
              //entryCount.current++;
              //iFormula.current = STRING_INIT;
            } else if (entryCount.current >= ENTRY_MAX) {
              notify(ENTRY_MAX_MSG);
            } else if (!hasDecimal.current) {
              setInput(input + inputKey);
              console.log("ni hapa");
              hasDecimal.current = ON;
            }
        } else if (hasAnswer.current) {
          if (/[-+*/]/.test(inputKey)){
            entryCount.current = INIT;
            setInput(answer + inputKey);
            console.log("here ansesr is:", answer);
            console.log("an flag:", hasAnswer.current);
            iFormula.current = (answer + inputKey).replace(/[.]/g, "");
            setAnswer(STRING_INIT);
            hasAnswer.current = OFF;
            hasDecimal.current = OFF;
          } else if (/[0-9]/.test(inputKey)) {
            entryCount.current = 1;
            iFormula.current = inputKey;
            setInput(inputKey);
            hasDecimal.current = OFF;
            setAnswer(STRING_INIT);
            hasAnswer.current = OFF;
          }
        } else if (/[-]/.test(inputKey)) {
          entryCount.current = INIT;
          // Remove -- at the start of expression/replace with + elsewhere, if any
          iFormula.current = fixDashes(iFormula.current + inputKey);
          setInput(fixDashes(input + inputKey));
          console.log("familing here", hasDecimal.current);

          entryCount.current = INIT;
          //console.log("here ansesr is:", answer);
          //console.log("an flag:", hasAnswer.current);
          //iFormula.current = (answer + inputKey).replace(/[.]/g, "");
          //setAnswer(STRING_INIT);
          hasAnswer.current = OFF;
          hasDecimal.current = OFF;

        } else if ((entryCount.current < ENTRY_MAX) & /[0-9]/.test(inputKey)) {
          entryCount.current++;
          // Remove unnecessary trailing/leading zeros if any.
          console.log("hD, rmL, IF, inkey: ", hasDecimal.current, rmLeading(iFormula.current + inputKey, inputKey), iFormula.current, inputKey);
          iFormula.current = rmLeading(iFormula.current + inputKey);
          console.log("hD, rmL, EF, inkey", hasDecimal.current, rmLeading(input + inputKey), input, inputKey);
          setInput(rmLeading(input + inputKey));
         
         // iFormula.current = iFormula.current + inputKey;
          //console.log("reg IF:", iFormula.current);
         // setInput(input + inputKey);
          //console.log("reg INPUT:", input);
        } else if ((entryCount.current > INIT) & /[+*/]/.test(inputKey)) {
          entryCount.current = INIT;
          hasDecimal.current = OFF;

          console.log("sensed multiOps, current is", inputKey, "previous was", input);
          iFormula.current = iFormula.current + inputKey;
          setInput(input + inputKey);
        } else if ((entryCount.current === INIT) & /[+*/]/.test(inputKey)) {
          // This is in place to allow change of operator from pevious one
          iFormula.current = iFormula.current.replace(/[-+*/]+$/, inputKey);
          setInput(input.replace(/[-+*/]+$/, inputKey));
        }else if (entryCount.current >= ENTRY_MAX) {
          notify(ENTRY_MAX_MSG);
        }

        console.log("after all is done, we have answer?", hasAnswer.current, "count:", entryCount.current);
    }


  } 



  return(
    <div className="container">
        <div className="calculator">
          <PowerBtn status={isPowered} onChangeStatus={setIsPowered} />
          <Display
            status={isPowered}
            input={input}
            result={(errorMsg)
              ? errorMsg 
              : (hasAnswer.current) 
              ? answer 
              : (input === "") ? "0" : input.match(/([-+*/]|\d*[.]*\d*[.]*|\d*)$/)[0]
            }
            isHb={highB} />
          <Keyboard status={isPowered} onSetInput={handleInput} isHb={highB} onChangeHb={setHighB} />
        </div>
    </div>
  );



}

export default App;