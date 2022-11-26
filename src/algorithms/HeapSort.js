 import { swap } from "./Utility";

 const animations = [];
 let array_length;
 export function getHeapSortAnimations(input) {
    

    const copy =[...input];
    array_length = copy.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
        animations.push([[i,copy[i]], true]);
        heap_root(copy, i);
        animations.push([[i,copy[i]], false]);
      }

    for (i = copy.length - 1; i > 0; i--) {
        swap(copy, 0, i);
        animations.push([[i,copy[i]], true]);
        //animations.push([[i], false]);
        array_length--;
        heap_root(copy, 0);
         animations.push([[0,copy[0]], false]);
        animations.push([[0,copy[0]], true]);
      
    }
    return animations;
}


 function heap_root(input, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
        // animations.push([[max,input[left]], true]);
    }

    if (right < array_length && input[right] > input[max])     {
        max = right;
        // animations.push([[max,input[right]], true]);
    }

    if (max != i) {
        swap(input, i, max);
        heap_root(input, max);
    }
}


