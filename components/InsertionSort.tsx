import { range, shuffle } from "lodash";
import { useState } from "react";

const getArr = () => shuffle(range(1, 11));

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
      <div className="board">{arr.join(",")}</div>
      <div className="buttonBox">
        <button onClick={handleShuffle}>shuffle</button>
        <button onClick={handleSort}>sort</button>
      </div>
      <style jsx>{`
        .board {
          width: 100%;
          height: 200px;
          background-color: green;
          color: white;
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
      `}</style>
    </div>
  );
}
