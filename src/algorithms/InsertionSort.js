import { swap } from "./Utility";
import React, { useState, useEffect, useRef } from "react";

export function getInsertionSortAnimations(arr, setComp, setSpace) {
  const copy = [...arr];

  const animations = [];
  setSpace("Space Complexity: O(n)"); // O(n) for space complexity since we are using an extra space to store animations approximately equal to the size of the array

  for (let i = 1; i < copy.length; i++) {
    setComp("Time Complexity: O(n)"); // O(n) for best case
    for (let j = i - 1; j >= 0; j--) {
      animations.push([[j, j + 1], false]);
      if (copy[j + 1] < copy[j]) {
        setComp("Time Complexity: O(n^2)"); // O(n^2) for worst case
        animations.push([[j, copy[j + 1]], true]);
        animations.push([[j + 1, copy[j]], true]);
        swap(copy, j, j + 1);
      } else break;
    }
  }
  // comp = "Ehetsham";
  //setComp("Ehetsham");
  //console.log("comp = ", comp);
  return animations;
}


