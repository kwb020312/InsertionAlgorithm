import { range, shuffle } from "lodash";
import { Dispatch, FC, SetStateAction, useState } from "react";

const SIZE = 20;
const getArr = () => shuffle(range(1, SIZE));

const delaySetArr = (
  arr: number[],
  setArr: Dispatch<SetStateAction<number[]>>
) => {
  return new Promise((resolve) => {
    setArr([...arr]);
    setTimeout(resolve, 10);
  });
};

const sort = async (
  arr: number[],
  setArr: Dispatch<SetStateAction<number[]>>
) => {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      await delaySetArr(arr, setArr);
      j = j - 1;
    }

    arr[j + 1] = key;
  }
  return arr;
};

interface PropsBar {
  value: number;
  i: number;
}

const Bar: FC<PropsBar> = ({ value, i }) => {
  return (
    <>
      <div
        key={i}
        style={{
          height: value * 50,
          display: "inline-block",
          transform: `translateX(${i * 21})`,
          fontSize: 5,
          marginRight: 1,
        }}
        className="bar"
      >
        {value}
      </div>
      <style jsx>{`
        .bar {
          width: 20px;
          background-color: black;
          margin-top: 15px;
        }
      `}</style>
    </>
  );
};

export default function InsertionSort() {
  const [arr, setArr] = useState(getArr());

  const handleShuffle = () => {
    setArr(getArr());
  };

  const handleSort = async () => {
    const newArr = [...arr];
    setArr(await sort(newArr, setArr));
  };

  return (
    <div>
      <div className="board">
        {arr.map((value, i) => (
          <Bar key={i} value={value} i={i} />
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
      `}</style>
    </div>
  );
}
