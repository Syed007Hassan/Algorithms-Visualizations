import React, { useState, useEffect, useRef } from "react";

  var comp = ""; 
  // complexity variable

  export function getMergeSortAnimations(arr, setComp, setSpace) {
  const copy = [...arr];
  const len = copy.length;
  const aux = Array(len);
  setSpace("Space Complexity: O(n)"); 
  // O(n) for space complexity since we are using an auxillary array of size n

  const animations = [];
  setSpace("Space Complexity: O(n+n)"); 
  // O(n=n) for space complexity since we are using an extra space to store animations approximately equal to the size of the array
  mergeSortHelper(copy, aux, 0, len - 1, animations);
  setComp(comp); // assign the complexity to the state variable
  return animations;
}

  function mergeSortHelper(arr, aux, left, right, animations) {
  if (right <= left) return;
  const mid = left + Math.floor((right - left) / 2);
  mergeSortHelper(arr, aux, left, mid, animations);
  mergeSortHelper(arr, aux, mid + 1, right, animations);
  merge(arr, aux, left, mid, right, animations);

  comp = "Time Complexity: O(nlogn)"; 
  // O(nlogn) for best case and worst case
  }

  function merge(arr, aux, left, mid, right, animations) {
  for (let i = left; i <= right; i++) aux[i] = arr[i];
  let i = left;
  let j = mid + 1;
  for (let k = left; k <= right; k++) {
    if (i > mid) {
      animations.push([[j], false]);
      animations.push([[k, aux[j]], true]);
      arr[k] = aux[j++];
    } else if (j > right) {
      animations.push([[i], false]);
      animations.push([[k, aux[i]], true]);
      arr[k] = aux[i++];
    } else if (aux[j] < aux[i]) {
      animations.push([[i, j], false]);
      animations.push([[k, aux[j]], true]);
      arr[k] = aux[j++];
    } else {
      animations.push([[i, j], false]);
      animations.push([[k, aux[i]], true]);
      arr[k] = aux[i++];
    }
  }
}
