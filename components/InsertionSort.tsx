import { range, shuffle } from "lodash";
import { Dispatch, FC, SetStateAction, useState, memo, useEffect } from "react";

const SIZE = 20;
const getArr = () => shuffle(range(1, SIZE));

const DURATION = 10;

const delaySetValue = (value: any, setValue: TSetAny) =>
  new Promise((resolve) => {
    setValue(value);
    setTimeout(resolve, DURATION);
  });

const sort = async (
  arr: number[],
  setArr: Dispatch<SetStateAction<number[]>>,
  setIdxI: TSetIdx,
  setIdxJ: TSetIdx,
  setIsRunning: TSetIsRunning
) => {
  for (let i = 1; i < arr.length; i++) {
    await delaySetValue(i, setIdxI);
    let key = arr[i];
    let j = i - 1;
    await delaySetValue(j, setIdxJ);

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      await delaySetValue([...arr], setArr);
      j = j - 1;
      await delaySetValue(j, setIdxJ);
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
type TSetAny = Dispatch<SetStateAction<any>>;

const getX = (idx: number) => {
  return idx * 21;
};

interface IPropsBoard {
  arr: number[];
}

const Bar: FC<PropsBar> = ({ value, i }) => {
  return (
    <>
      <div
        key={i}
        style={{
          height: value * 50,
          display: "inline-block",
          transform: `translateX(${getX(i)})`,
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

const Board: FC<IPropsBoard> = (props) => {
  const { arr } = props;
  return (
    <>
      <div className="board">
        {arr.map(
          (value, i) => (
            console.log("bar rendered"), (<Bar key={i} value={value} i={i} />)
          )
        )}
      </div>
      <style jsx>
        {`
          .board {
            width: 100%;
            height: 50vh;
            background-color: green;
            color: white;
            transform: rotateX(100deg);
          }
        `}
      </style>
    </>
  );
};

const areArrEqual = (oldProps: IPropsBoard, newProps: IPropsBoard) => {
  return oldProps.arr === newProps.arr;
};

const MemorizeBoard = memo(Board, areArrEqual);

export default function InsertionSort() {
  const [arr, setArr] = useState([1]);
  const [idxI, setIdxI] = useState(1);
  const [idxJ, setIdxJ] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [onOff, setOnOff] = useState(false);

  useEffect(() => setArr(getArr()), []);

  const handleShuffle = () => {
    setArr(getArr());
    setIdxI(1);
    setIdxJ(1);
  };

  const handleSort = async () => {
    const newArr = [...arr];
    setIsRunning(true);
    setArr(await sort(newArr, setArr, setIdxI, setIdxJ, setIsRunning));
  };

  return (
    <div>
      <MemorizeBoard arr={arr} />
      <div
        className="index i"
        style={{ transform: `translateX(${getX(idxI)}px)` }}
      >
        i
      </div>
      <div
        className="index j"
        style={{ transform: `translateX(${getX(idxJ)}px)` }}
      >
        j
      </div>
      <div className="buttonBox">
        {isRunning === false ? (
          <>
            <button onClick={() => setOnOff(!onOff)}>on/off</button>
            <button onClick={handleShuffle}>shuffle</button>
            <button onClick={handleSort}>sort</button>
          </>
        ) : (
          <h1>Now Running...</h1>
        )}
      </div>
      <style jsx>{`
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
