import { range, shuffle } from "lodash";
import { useState } from "react";

const SIZE = 10;
const getArr = () => shuffle(range(1, SIZE));

const sort = (arr: number[]) => {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }

    arr[j + 1] = key;
  }
  return arr;
};

export default function InsertionSort() {
  const [arr, setArr] = useState(getArr());

  const handleShuffle = () => {
    setArr(getArr());
  };

  const handleSort = () => {
    const newArr = [...arr];
    setArr(sort(newArr));
  };

  return (
    <div>
      <div className="board">
        {arr.map((value, i) => (
          <div
            key={i}
            style={{
              height: value * 100,
              display: "inline-block",
              transform: `translateX(${i * 21})`,
              fontSize: 5,
              marginRight: 1,
            }}
            className="bar"
          >
            {value}
          </div>
        ))}
      </div>
      <div className="buttonBox">
        <button onClick={handleShuffle}>shuffle</button>
        <button onClick={handleSort}>sort</button>
      </div>
      <style jsx>{`
        .board {
          width: 100%;
          height: 50vh;
          background-color: green;
          color: white;
          transform: rotateX(100deg);
        }
        button {
          font-size: 40px;
        }
        .buttonBox {
          width: 100%;
          height: 60px;
          background-color: gray;
          text-align: right;
        }
        .bar {
          width: 20px;
          background-color: black;
          margin-top: 15px;
        }
      `}</style>
    </div>
  );
}
