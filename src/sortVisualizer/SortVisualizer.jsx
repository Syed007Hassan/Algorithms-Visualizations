import React, { useState, useEffect, useRef } from "react";
import "./SortVisualizer.css";
import { getQuickSortAnimations } from "../algorithms/QuickSort";
import { getInsertionSortAnimations } from "../algorithms/InsertionSort";
import { getMergeSortAnimations } from "../algorithms/MergeSort";
import { getBubbleSortAnimations } from "../algorithms/BubbleSort";
import { getRadixSortAnimations } from "../algorithms/RadixSort";
import { getCountSortAnimations } from "../algorithms/CountSort";
import {getBucketSortAnimations} from "../algorithms/BucketSort";

const ARR_LEN = 100;
const MIN_NUM = 5;
const MAX_NUM = 80;
const DELAY = 10;
const ACCESSED_COLOUR = "turquoise";
const SORTED_COLOUR = "green";
let MainArray = [];
let n;

export default function SortVisualizer(props) {
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
    shuffle(arr);
    setArr(arr);
  }

  function mergeSort() {
    const animations = getMergeSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function insertionSort() {
    const animations = getInsertionSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function quickSort() {
    const animations = getQuickSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function bubbleSort() {
    const animations = getBubbleSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function radixSort() {
    const animations = getRadixSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function CountSort() {
    const animations = getCountSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function BucketSort() {
    const animations = getBucketSortAnimations(arr);
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
      <footer className="app-footer">
        <ul>
          <li>
            <button className="app-button">
              <input type="file" id="fileInput" onChange={onLoad} />
            </button>
          </li>
          <li>
            <button className="app-button" onClick={initialiseArray}>
              Create new array
            </button>
          </li>
          <li>
            <button className="app-button" onClick={mergeSort}>
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
            <button className="app-button" onClick={bubbleSort}>
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
