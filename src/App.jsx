// import { useEffect, useState } from "react";
// import "./App.css";

// const BOARD_SIZE = 144;

// function App() {
//     const [boxes, setBoxes] = useState(Array(BOARD_SIZE).fill(null));
//     let snakeLength = 1;
//     const [snakeDirection, setSnakeDirection] = useState(null);
//     const [snakeCoordinates, setSnakeCoordinates] = useState([65]);
//     const [foodCoordinates, setFoodCoordinates] = useState(generateRandomNumber());

//     function enlargeSnake() {
//         snakeLength++;
//         switch (snakeDirection) {
//             case "left":
//                 // Left pressed
//                 setFoodCoordinates(generateRandomNumber());
//                 setSnakeCoordinates((prevCoord) => {
//                     const sorted = prevCoord.sort((a, b) => a - b);
//                     return [...sorted, foodCoordinates + prevCoord.length];
//                 });
//                 // setBoxes([
//                 //     ...boxes.map((box, index) =>
//                 //         index === snakeCoordinates + 1 || index === snakeCoordinates ? "snake" : box
//                 //     ),
//                 // ]);
//                 break;
//             case "right":
//                 // Right pressed
//                 setFoodCoordinates(generateRandomNumber());
//                 // setBoxes([
//                 //     ...boxes.map((box, index) =>
//                 //         index === snakeCoordinates - 1 || index === snakeCoordinates ? "snake" : box
//                 //     ),
//                 // ]);
//                 // prevCoord.sort((a, b) => b-a);
//                 setSnakeCoordinates((prevCoord) => {
//                     const sorted = prevCoord.sort((a, b) => b - a);
//                     return [...sorted, foodCoordinates - prevCoord.length];
//                 });
//                 break;
//             case "up":
//                 // Up pressed
//                 setFoodCoordinates(generateRandomNumber());
//                 setBoxes([
//                     ...boxes.map((box, index) =>
//                         index === snakeCoordinates + 12 || index === snakeCoordinates ? "snake" : box
//                     ),
//                 ]);
//                 break;
//             case "down":
//                 // Down pressed
//                 setFoodCoordinates(generateRandomNumber());
//                 setBoxes([
//                     ...boxes.map((box, index) =>
//                         index === snakeCoordinates - 12 || index === snakeCoordinates ? "snake" : box
//                     ),
//                 ]);
//                 break;
//         }
//     }

//     // Change Snake Position
//     useEffect(() => {
//         // нужно сортировать здесь snakeCoordinates
//         if (snakeDirection === "left" && snakeCoordinates[0] === foodCoordinates) return enlargeSnake();
//         if (snakeDirection === "right" && snakeCoordinates[snakeCoordinates.length - 1] === foodCoordinates)
//             return enlargeSnake();

//         console.log(snakeDirection);
//         console.log(snakeCoordinates);
//         console.log(snakeCoordinates[snakeCoordinates.length - 1]);

//         setBoxes([
//             ...boxes.map((box, index) =>
//                 snakeCoordinates.includes(index) ? "snake" : index === foodCoordinates ? "food" : null
//             ),
//         ]);
//     }, [snakeCoordinates, snakeDirection]);

//     // Init App
//     useEffect(() => {
//         setBoxes([
//             ...boxes.map((box, index) =>
//                 snakeCoordinates.includes(index) ? "snake" : index === foodCoordinates ? "food" : box
//             ),
//         ]);
//         document.addEventListener("keydown", movingSnakeHandler);
//         return () => {
//             document.removeEventListener("keydown", movingSnakeHandler);
//         };
//     }, []);

//     const movingSnakeHandler = (e) => {
//         switch (e.key) {
//             case "ArrowLeft":
//                 // Left pressed
//                 // setSnakeCoordinates((prev) => (prev !== 0 ? prev - 1 : prev));
//                 const leftLimit = 0;
//                 setSnakeCoordinates((coordinates) =>
//                     coordinates.map((coordinate) => (coordinate !== leftLimit ? coordinate - 1 : coordinate))
//                 );
//                 setSnakeDirection("left");
//                 break;
//             case "ArrowRight":
//                 // Right pressed
//                 const rightLimit = boxes.length - 1;
//                 // setSnakeCoordinates((prev) => (prev !== rightLimit ? prev + 1 : prev));
//                 setSnakeCoordinates((coordinates) =>
//                     coordinates.map((coordinate) => (coordinate !== rightLimit ? coordinate + 1 : coordinate))
//                 );
//                 setSnakeDirection("right");
//                 break;
//             case "ArrowUp":
//                 // Up pressed
//                 const upLimit = 12;
//                 // setSnakeCoordinates((prev) => (prev >= upLimit ? prev - 12 : prev));
//                 setSnakeCoordinates((coordinates) =>
//                     coordinates.map((coordinate) => (coordinate !== upLimit ? coordinate - 12 : coordinate))
//                 );
//                 setSnakeDirection("up");
//                 break;
//             case "ArrowDown":
//                 // Down pressed
//                 const downLimit = boxes.length - 12;
//                 // setSnakeCoordinates((prev) => (prev < downLimit ? prev + 12 : prev));
//                 setSnakeCoordinates((coordinates) =>
//                     coordinates.map((coordinate) => (coordinate !== downLimit ? coordinate + 12 : coordinate))
//                 );
//                 setSnakeDirection("down");
//                 break;
//         }
//     };

//     function generateRandomNumber() {
//         return Math.floor(Math.random() * boxes.length);
//     }

//     return (
//         <div className="center-wrapper">
//             {boxes?.map((box, index) => {
//                 if (box === "snake") return <div className="box snake" key={index}></div>;
//                 if (box === "food") return <div className="box food" key={index}></div>;
//                 return <div className="box" key={index}></div>;
//             })}
//         </div>
//     );
// }

// export default App;

// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------
import { useEffect, useState } from "react";
import "./App.css";
import useInterval from "./utils/interval";

const BOARD_SIZE = 144;

function App() {
    const [boxes, setBoxes] = useState(Array(BOARD_SIZE).fill(null));
    const [snakeDirection, setSnakeDirection] = useState(1);
    const [snakeCoordinates, setSnakeCoordinates] = useState([65, 64, 63]);
    const [foodCoordinates, setFoodCoordinates] = useState(generateRandomNumber());

    useEffect(() => {
        setBoxes([
            ...boxes.map((box, index) =>
                snakeCoordinates.includes(index) ? "snake" : index === foodCoordinates ? "food" : null
            ),
        ]);
    }, [snakeCoordinates]);

    useInterval(() => {
        changeSnakeCoordinates();
    }, 500);

    // Init App
    useEffect(() => {
        console.log("useEffect");
        document.addEventListener("keydown", movingSnakeHandler);
        return () => {
            document.removeEventListener("keydown", movingSnakeHandler);
        };
    }, []);

    function changeSnakeCoordinates() {
        setSnakeCoordinates((prevCoordinates) => {
            let temp = [...prevCoordinates];
            const nextStep = temp[0] + snakeDirection;
            const lastSnakePart = temp.pop();
            if (nextStep !== foodCoordinates) {
                temp.unshift(nextStep);
            } else if (nextStep === foodCoordinates) {
                temp.unshift(nextStep);
                temp.push(lastSnakePart);
                setFoodCoordinates(generateRandomNumber());
            }

            return temp;
        });
    }

    function movingSnakeHandler(e) {
        switch (e.key) {
            case "ArrowLeft":
                setSnakeDirection(-1);
                break;
            case "ArrowRight":
                setSnakeDirection(1);
                break;
            case "ArrowUp":
                setSnakeDirection(-12);
                break;
            case "ArrowDown":
                setSnakeDirection(12);
                break;
        }
    }

    function generateRandomNumber() {
        return Math.floor(Math.random() * boxes.length);
    }

    return (
        <div className="center-wrapper">
            {boxes?.map((box, index) => {
                if (box === "snake") return <div className="box snake" key={index}></div>;
                if (box === "food") return <div className="box food" key={index}></div>;
                return <div className="box" key={index}></div>;
            })}
        </div>
    );
}

export default App;
