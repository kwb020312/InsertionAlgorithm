# 삽입 정렬

<img src="./graph.PNG">
<img src="./insertionSort.PNG">

```javascript
// 삽입정렬의 기본 알고리즘
for (let i = 1; i < arr.length; i++) {
  let key = arr[i];
  let j = i - 1;
  while (j >= 0 && arr[j] > key) {
    arr[j + 1] = arr[j];
    j = j - 1;
  }

  arr[j + 1] = key;
}
```

<img src="./insertion-sort.png">

## 알게된점

```javascript
const sort = async() => {
    await 비동기처리
}
// 를 하는경우

const 비동기처리 = () =>
  new Promise((resolve) => {
    // 처리할 내용
    setTimeout(resolve, 얼마나 시간이 걸리게 할 지);
  });

// 를 주어 일정시간 뒤 실행하게 할 수 있다.


```
