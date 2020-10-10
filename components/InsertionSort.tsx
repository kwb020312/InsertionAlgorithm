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
  setArr: Dispatch<SetStateAction<number[]>>,
  setIdxI: TSetIdx,
  setIdxJ: TSetIdx,
  setIsRunning: TSetIsRunning
) => {
  for (let i = 1; i < arr.length; i++) {
    setIdxI(i);
    let key = arr[i];
    let j = i - 1;
    setIdxJ(j);

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      await delaySetArr(arr, setArr);
      j = j - 1;
      setIdxJ(j);
    }

    arr[j + 1] = key;
  }
  setIsRunning(false);
  return arr;
};

interface PropsBar {
  value: number;
  i: number;
}
type TSetIdx = Dispatch<SetStateAction<number>>;
type TSetIsRunning = Dispatch<SetStateAction<boolean>>;

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
  const [idxI, setIdxI] = useState(1);
  const [idxJ, setIdxJ] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  const handleShuffle = () => {
    setArr(getArr());
  };

  const handleSort = async () => {
    const newArr = [...arr];
    setIsRunning(true);
    setArr(await sort(newArr, setArr, setIdxI, setIdxJ, setIsRunning));
  };

  return (
    <div>
      <div className="board">
        {arr.map((value, i) => (
          <Bar key={i} value={value} i={i} />
        ))}
      </div>
      <div
        className="index i"
        style={{ transform: `translateX(${idxI * 20}px)` }}
      >
        i
      </div>
      <div
        className="index j"
        style={{ transform: `translateX(${idxJ * 20}px)` }}
      >
        j
      </div>
      <div className="buttonBox">
        {isRunning === false ? (
          <>
            {" "}
            <button onClick={handleShuffle}>shuffle</button>
            <button onClick={handleSort}>sort</button>
          </>
        ) : (
          <h1>Now Running...</h1>
        )}
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
        .index {
          position: absolute;
          width: 20px;

          opacity: 0.5;
        }
        .index.i {
          background-color: blue;
          color: white;
        }
        .index.j {
          background-color: yellow;
          color: white;
        }
      `}</style>
    </div>
  );
}
