import { ENTRY_MAX, ENTRY_MAX_MSG, INIT, ON, OFF, STRING_INIT } from './comps/config'; // Setup goodies.
import { useEffect, useRef, useState } from 'react';
import './css/App.scss'; 
import { Display, Keyboard, PowerBtn } from './comps'; // Calculator main components.

//
// This calculator takes in entire math expression as input, cleans it and evaluates it mathematical values.
// It relies heavily on regular expression, and attempts to use 'eval' safely to compute the resulting values of an expression
// It based on use cases details at:
//  https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-javascript-calculator

function App () {

  const [isPowered, setIsPowered] = useState(false); // Wether or not the calculator is powered.
  const [input, setInput] = useState(""); // Input expression.
  const [highB, setHighB] = useState(OFF); // Wheter or not to turn on disply's High Brightness.
  const [answer, setAnswer] = useState({ data: "" }); // Resulting computational value - Set to object to force re-render when new value is the same as current one.
  const [errorMsg, setErrorMsg] = useState(""); // Calculator error message handle.

  const hasDecimal = useRef(false);
  const iFormula = useRef(""); // Mathematical expression (without hard to track decimal points) for sanity checking.
  const entryCount = useRef(INIT); // Given operand's length ( max is 12 integer).
  const hasAnswer = useRef(false); // Whether or not a computation result has been found (calculated).
  
  // Reset calculator status on power change
  useEffect(() => {
    setInput("");
    !isPowered && setHighB(OFF);
    !isPowered && (hasAnswer.current = false);
    !isPowered && (hasDecimal.current = false);
    !isPowered && (entryCount.current = INIT);
    !isPowered && (iFormula.current = "");
  }, [isPowered]);

  // Removes leading zeros and unnecessary trailing operators
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

  // Removes leading -- and/or replaces -- with + elsewhere
  function fixDashes(exp) {
    return exp.replace(/^[-]{2}/, "").replace(/[-]{2}/, "+").replace(/[+][-]/, "-");
  }

  // Evaluates given expression and returns a value in string format
  const compute = expression =>  (Math.round(1000000000000 * eval(rmLeading(expression))) / 1000000000000).toString();

  const notify = (message) => {
    setErrorMsg(message);
    setTimeout(() => { setErrorMsg("") }, 1000);
  }

  const handleInput = (inputKey) => {

    if (/[C]/.test(inputKey.toUpperCase())) {
      // All clear received
      setInput("");
      setAnswer({ data: STRING_INIT });
      hasAnswer.current = false;
      hasDecimal.current = false;
      entryCount.current = INIT;
      iFormula.current = "";
    } else if (/[=]/.test(inputKey) & (!hasAnswer.current)) {
      // If '=' was pressed for a fresh answer.
      if(/^[-]?\d{1,12}[-+=*/][-]?\d{1,12}([-+=*/][-]?\d{1,12})*[-+*/]?$/.test(iFormula.current)) {
        // if the internalized expression is in computable order
        // Compute the answer
        setAnswer({ data: compute(input.replace(/[\D]$/, "")) }); // Removing trailing none decimal character.
        hasAnswer.current = true;
        iFormula.current = "";
        hasDecimal.current = false;
        entryCount.current = INIT;
        setInput(rmLeading(input))
      }
    } else {
        if (/[.]/.test(inputKey)) {
            if (hasAnswer.current) {
              setInput(STRING_INIT + inputKey);
              hasAnswer.current = false;
              hasDecimal.current = true;
              entryCount.current = INIT;
            } else if (entryCount.current === INIT & !hasDecimal.current) {
              setInput(input + STRING_INIT + inputKey);
              hasDecimal.current = true;
            } else if (entryCount.current >= ENTRY_MAX) {
              notify(ENTRY_MAX_MSG);
            } else if (!hasDecimal.current) {
              setInput(input + inputKey);
              hasDecimal.current = true;
            }
        } else if (hasAnswer.current) {
          console.log("close2 and has answer ", hasAnswer.current);
          if (/[-+*/]/.test(inputKey)){
            entryCount.current = INIT;
            setInput(answer.data + inputKey);
            iFormula.current = (answer.data + inputKey).replace(/[.]/g, "");
            setAnswer({ data: STRING_INIT });
            hasAnswer.current = false;
            hasDecimal.current = false;
          } else if (/[0-9]/.test(inputKey)) {
            entryCount.current = 1;
            iFormula.current = inputKey;
            setInput(inputKey);
            hasDecimal.current = false;
            setAnswer({ data: STRING_INIT });
            hasAnswer.current = false;
          }
        } else if (/[-]/.test(inputKey)) {
          console.log("close3");
          entryCount.current = INIT;
          // Remove -- at the start of expression/replace with + elsewhere, if any
          iFormula.current = fixDashes(iFormula.current + inputKey);
          setInput(fixDashes(input + inputKey));
          entryCount.current = INIT;
          hasAnswer.current = false;
          hasDecimal.current = false;

        } else if ((entryCount.current < ENTRY_MAX) & /[0-9]/.test(inputKey)) {
          // Remove unnecessary trailing/leading zeros if any.
          iFormula.current = rmLeading(iFormula.current + inputKey);
          let cleanInput = rmLeading(input + inputKey); // Clean full expression
          setInput(cleanInput);
          entryCount.current = cleanInput.match(/(\d*[.]*\d*[.]*|\d*)$/)[0].length; // Current entry's length - not the whole input expression.
        } else if ((entryCount.current > INIT) & /[+*/]/.test(inputKey)) {
          entryCount.current = INIT;
          hasDecimal.current = OFF;
          iFormula.current = iFormula.current + inputKey;
          setInput(input + inputKey);
        } else if ((entryCount.current === INIT) & /[+*/]/.test(inputKey)) {
          // Allow the last input operator to overide pevious ones
          iFormula.current = iFormula.current.replace(/[-+*/]+$/, inputKey);
          setInput(input.replace(/[-+*/]+$/, inputKey));
        }else if (entryCount.current >= ENTRY_MAX) {
          notify(ENTRY_MAX_MSG);
        }
        //console.log("after all is done, we have answer?", hasAnswer.current, "count:", entryCount.current);
    }
  } 


  return(
    <div className="container">
        <div className="calculator">
          <PowerBtn status={isPowered} onChangeStatus={setIsPowered} />
          <Display
            status={isPowered}
            input={input}
            result={
              (errorMsg) ? errorMsg 
              : (hasAnswer.current) ? answer.data 
              : (input === "" & isPowered) ? "0"
              : isPowered && input.match(/([-+*/]|\d*[.]*\d*[.]*|\d*)$/)[0]
            }
            isHb={highB} />
          <Keyboard status={isPowered} onSetInput={handleInput} isHb={highB} onChangeHb={setHighB} />
        </div>
    </div>
  );

}

export default App;