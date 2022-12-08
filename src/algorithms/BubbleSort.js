import { swap } from "./Utility";
import React, { useState, useEffect, useRef } from "react";

export function getBubbleSortAnimations(arr, setComp, setSpace) {
    const copy = [...arr];
    const animations = [];
    setSpace("Space Complexity: O(n)"); // O(n) for space complexity since we are using an extra space to store animations approximately equal to the size of the array


    var check = 0;
    for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy.length; j++) {
            if (check === 0) {
                setComp("Time Complexity: O(n)"); // O(n) for best case
            }
            if (copy[j] > copy[j + 1]) {
                check = 1;
                setComp("Time Complexity: O(n^2)"); // O(n^2) for worst case
               animations.push([[j+1,copy[j]],true]);
               animations.push([[j+1,copy[j+1]],false]);
                animations.push([[j,copy[j+1]],true]);
                swap(copy,j,j+1);
            }
        }
    }
    return animations;
  };
