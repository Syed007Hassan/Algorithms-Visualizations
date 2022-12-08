import { swap } from './Utility';
import React, { useState, useEffect, useRef } from "react";

var comp = ""; // time complexity variable
var space = ""; // space complexity variable

export function getQuickSortAnimations(arr, setComp, setSpace) {
  const copy = [...arr];
  const animations = [];
  setSpace("Space Complexity: O(n)"); // O(n) for space complexity since we are using an extra space to store animations approximately equal to the size of the array
  quickSortHelper(copy, 0, copy.length - 1, animations);
  setComp(comp); // set time complexity
  setSpace(space); // set space complexity
  return animations;
}

function quickSortHelper(arr, left, right, animations) {
  if (right <= left) return;
  const part = partition(arr, left, right, animations);
  quickSortHelper(arr, left, part, animations);
  quickSortHelper(arr, part + 1, right, animations);

  comp = "Time Complexity: O(nlogn)"; // O(nlogn) for best case and average case
  space = "Space Complexity: O(n+n)"; // O(n) because of the recursive calls and O(n) for the animations array
}

function partition(arr, left, right, animations) {
  let i = left;
  let j = right + 1;
  const pivot = arr[left];
  while (true) {
    while (arr[++i] <= pivot) {
      if (i === right) break;
      animations.push([[i], false]);
    }
    while (arr[--j] >= pivot) {
      if (j === left) break;
      animations.push([[j], false]);
    }
    if (j <= i) break;
    animations.push([[i, arr[j]], true]);
    animations.push([[j, arr[i]], true]);
    swap(arr, i, j);
  }
  animations.push([[left, arr[j]], true]);
  animations.push([[j, arr[left]], true]);
  swap(arr, left, j);
  return j;
}
