import React, { useState } from "react";
import "./App.css";

const App = () => {

    const [display, setDisplay] = useState("0");

    const [firstNumber, setFirstNumber] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForSecondNumber, setWaitingForSecondNumber] =useState(false);

    const [expression, setExpression] = useState("0");


    const handleNumber = (number) => {

        if (waitingForSecondNumber) {
            setDisplay(number);
            setExpression(expression + number);
            setWaitingForSecondNumber(false);

        } else if (display === "0") {
            setDisplay(number);
            setExpression(number);

        } else {
            setDisplay(display + number);
            setExpression(expression + number);

        }
    };


    const handleDecimal = () => {
        if (waitingForSecondNumber) {

            setDisplay("0.");
            setExpression(expression + "0.");
            setWaitingForSecondNumber(false);

            return;
        }

        if (!display.includes(".")) {

            setDisplay(display + ".");
            setExpression(expression + ".");

        }
    };


    const handleOperator = (newOperator) => {

        const currentNumber = Number(display);

        setFirstNumber(currentNumber);
        setOperator(newOperator);
        setWaitingForSecondNumber(true);

        setExpression(expression + " " + newOperator + " ");
    };

    const calculate = (first, second, operation) => {

        switch (operation) {

            case "+":
                return first + second;

            case "-":
                return first - second;

            case "x":
                return first * second;

            case "÷":

                if (second === 0) {
                    return "Error";
                }

                return first / second;

            default:
                return second;
        }
    };


    // -----------------------------
    // Clear calculator
    // -----------------------------
    const handleClear = () => {

        setDisplay("0");
        setExpression("0");

        setFirstNumber(null);
        setOperator(null);

        setWaitingForSecondNumber(false);
    };


    // -----------------------------
    // Handle equals
    // -----------------------------
    const handleEquals = () => {

        if (firstNumber === null || operator === null) {
            return;
        }

        const secondNumber = Number(display);

        const result = calculate(
            firstNumber,
            secondNumber,
            operator
        );

        setDisplay(String(result));

        setExpression(String(result));

        setFirstNumber(null);
        setOperator(null);

        setWaitingForSecondNumber(true);
    };


    const handleDelete = () => {

        if (display.length === 1) {

            setDisplay("0");

            if (expression.length > 1) {
                setExpression(expression.slice(0, -1));
            } else {
                setExpression("0");
            }

        } else {

            setDisplay(display.slice(0, -1));
            setExpression(expression.slice(0, -1));

        }
    };


    // -----------------------------
    // Handle percentage
    // -----------------------------
    const handlePercentage = () => {

        const value = Number(display);

        const result = value / 100;

        setDisplay(String(result));

        // Replace the current number in expression
        const parts = expression.trim().split(" ");

        parts[parts.length - 1] = String(result);

        setExpression(parts.join(" "));
    };


    // -----------------------------
    // Handle +/-
    // -----------------------------
    const handleSign = () => {

        if (display.startsWith("-")) {

            const newValue = display.slice(1);

            setDisplay(newValue);

            const parts = expression.trim().split(" ");
            parts[parts.length - 1] = newValue;

            setExpression(parts.join(" "));

        } else {

            const newValue = "-" + display;

            setDisplay(newValue);

            const parts = expression.trim().split(" ");
            parts[parts.length - 1] = newValue;

            setExpression(parts.join(" "));
        }
    };


    return (

        <div className="calculator">

            {/* Display */}
            <div className="display">
                {expression}
            </div>


            {/* Buttons */}
            <div className="buttons">

                {/* Row 1 */}
                <button onClick={handleClear}>
                    C
                </button>

                <button onClick={handleSign}>
                    +/-
                </button>

                <button onClick={handlePercentage}>
                    %
                </button>

                <button onClick={() => handleOperator("÷")}>
                    ÷
                </button>


                {/* Row 2 */}
                <button onClick={() => handleNumber("7")}>
                    7
                </button>

                <button onClick={() => handleNumber("8")}>
                    8
                </button>

                <button onClick={() => handleNumber("9")}>
                    9
                </button>

                <button onClick={() => handleOperator("x")}>
                    x
                </button>


                {/* Row 3 */}
                <button onClick={() => handleNumber("4")}>
                    4
                </button>

                <button onClick={() => handleNumber("5")}>
                    5
                </button>

                <button onClick={() => handleNumber("6")}>
                    6
                </button>

                <button onClick={() => handleOperator("-")}>
                    -
                </button>


                {/* Row 4 */}
                <button onClick={() => handleNumber("1")}>
                    1
                </button>

                <button onClick={() => handleNumber("2")}>
                    2
                </button>

                <button onClick={() => handleNumber("3")}>
                    3
                </button>

                <button onClick={() => handleOperator("+")}>
                    +
                </button>


                {/* Row 5 */}
                <button onClick={() => handleNumber("0")}>
                    0
                </button>

                <button onClick={handleDecimal}>
                    .
                </button>

                <button onClick={handleEquals}>
                    =
                </button>

                <button onClick={handleDelete}>
                    DEL
                </button>

            </div>

        </div>
    );
};

export default App;
