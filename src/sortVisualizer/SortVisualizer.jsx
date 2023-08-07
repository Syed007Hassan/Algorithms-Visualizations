import React, { useState, useEffect, useRef } from "react";
import "./SortVisualizer.css";
import { getQuickSortAnimations } from "../algorithms/QuickSort";
import { getInsertionSortAnimations } from "../algorithms/InsertionSort";
import { getMergeSortAnimations } from "../algorithms/MergeSort";
import { getBubbleSortAnimations } from "../algorithms/BubbleSort";
import { getRadixSortAnimations } from "../algorithms/RadixSort";
import { getCountSortAnimations } from "../algorithms/CountSort";
import { getBucketSortAnimations } from "../algorithms/BucketSort";
import { getHeapSortAnimations } from "../algorithms/HeapSort.js";
import { modified_quicksort } from "../algorithms/7.4.5";
import { getExample8 } from "../algorithms/8.2";
import {Timer} from "./Timer.jsx";


// const ARR_LEN = 100;
// const MIN_NUM = 5;
// const MAX_NUM = 80;
const DELAY = 100;
const ACCESSED_COLOUR = "darkgrey";
const SORTED_COLOUR = "darkcyan";
let MainArray = [];
let n;

export default function SortVisualizer() {
  let mappedElements = [];
  var onLoad = function (event) {
    // eslint-disable-next-line no-undef
    var file = fileInput.files[0];
    var textType = /text.*/;

    if (file.type.match(textType)) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var content = reader.result;
        //Here the content has been read successfuly
        //alert(content);
        MainArray = content.split("\n");
        mappedElements = MainArray.map(Number);
      };

      reader.readAsText(file);
    }
  };

  const [arr, setArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const containerRef = useRef(null);
  const [comp, setComp] = useState("");
  const [space, setSpace] = useState("");
  const [range, setRange] = useState("");

  useEffect(initialiseArray, []);

  function initialiseArray() {
    if (isSorting) return;
    if (isSorted) resetArrayColour();
    setIsSorted(false);
    const arr = [];
    n = mappedElements.length;
    for (let i = 0; i < n; i++) {
      // arr.push((MAX_NUM - MIN_NUM) * (i / ARR_LEN) + MIN_NUM);
      arr.push(mappedElements[i]);
    }
    //shuffle(arr);
    setArr(arr);
  }

  function mergeSort() {
    const animations = getMergeSortAnimations(arr, setComp, setSpace);
    animateArrayUpdate(animations);
  }

  function insertionSort() {

    const animations = getInsertionSortAnimations(arr, setComp, setSpace);
    animateArrayUpdate(animations);
  }

  function quickSort() {
    const animations = getQuickSortAnimations(arr, setComp, setSpace);
    animateArrayUpdate(animations);
  }

  function bubbleSort() {
    const animations = getBubbleSortAnimations(arr, setComp, setSpace);
    animateArrayUpdate(animations);

  }

  function radixSort() {
    const animations = getRadixSortAnimations(arr, setComp, setSpace);
    animateArrayUpdate(animations);
  }

  function CountSort() {
    const animations = getCountSortAnimations(arr, setComp, setSpace);
    animateArrayUpdate(animations);
  }

  function BucketSort() {
    const animations = getBucketSortAnimations(arr, setComp, setSpace);
    animateArrayUpdate(animations);
  }

  function HeapSort() {
    const animations = getHeapSortAnimations(arr, setComp, setSpace);
    animateArrayUpdate(animations);
  }

  function Example7() {
    const animations = modified_quicksort(arr, setComp, setSpace);
    animateArrayUpdate(animations);
  }

  function Example8() {
    const animations = getExample8(arr, setComp, setSpace, setRange);
    animateArrayUpdate(animations);
  }

  function animateArrayUpdate(animations) {
    if (isSorting) return;
    setIsSorting(true);
    animations.forEach(([comparison, swapped], index) => {
      setTimeout(() => {
        if (!swapped) {
          if (comparison.length === 2) {
            const [i, j] = comparison;
            animateArrayAccess(i);
            animateArrayAccess(j);
          } else {
            const [i] = comparison;
            animateArrayAccess(i);
          }
        } else {
          setArr((prevArr) => {
            const [k, newValue] = comparison;
            const newArr = [...prevArr];
            newArr[k] = newValue;
            return newArr;
          });
        }
      }, index * DELAY);
    });
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * DELAY);
  }

  function animateArrayAccess(index) {
    const arrayBars = containerRef.current.children;
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = ACCESSED_COLOUR;
    }, DELAY);
    setTimeout(() => {
      arrayBarStyle.backgroundColor = "";
    }, DELAY * 2);
  }

  function animateSortedArray() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = SORTED_COLOUR),
        i * DELAY
      );
    }
    setTimeout(() => {
      setIsSorted(true);
      setIsSorting(false);
    }, arrayBars.length * DELAY);
  }

  function resetArrayColour() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arr.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      arrayBarStyle.backgroundColor = "";
    }
  }

  function toggle(){
    return true;
  }
  
  return (
    <div className="visualizer-container">
      <div className="array-container" ref={containerRef}>
        {arr.map((barHeight, index) => (
          <div
            className="array-bar"
            style={{
              height: `${barHeight}vmin`,
              width: `${90 / n}vw`,
            }}
            key={index}
          >
            <div>
              <h3 className="displayNo">{barHeight}</h3>{" "}
            </div>
          </div>
        ))}
      </div>
      <div className="complexity">
        <h3 >{comp}</h3>
        <h3 >{space}</h3>
        <h3 >{range}</h3>
      </div>
      <footer className="app-footer">

        <div class="flex-col">
          <button className="app-button">
                <input type="file" id="fileInput" onChange={onLoad} />
          </button>

          <button className="app-button" onClick={initialiseArray}>
                Create new array
          </button>
        </div>
        <button className="app-button">
              <Timer />
        </button>

        <ul>
          <li>
            <button className="app-button" onClick={() => { mergeSort();}}>
              Merge sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={insertionSort}>
              Insertion sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={quickSort}>
              Quick sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={bubbleSort} >

              Bubble sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={radixSort}>
              Radix Sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={CountSort}>
              Count Sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={BucketSort}>
              Bucket Sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={HeapSort}>
              Heap Sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={Example7}>
              Example 7.4
            </button>
          </li>
          <li>
            <button className="app-button" onClick={Example8}>
              Example 8.2
            </button>
          </li>
        </ul>
      </footer>
    </div>
  );
}

const shuffle = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
};
