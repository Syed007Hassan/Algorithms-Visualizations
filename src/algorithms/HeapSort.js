 import { swap } from "./Utility";

 const animations = [];
 let array_length;
 var check = 0;
 export function getHeapSortAnimations(input, setComp, setSpace) {
    

    const copy =[...input];
    array_length = copy.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
        animations.push([[i,copy[i]], true]);
        heap_root(copy, i);
        animations.push([[i,copy[i]], false]);
        setComp("Complexity: O(n/2)");
        // O(n/2) since half array is take into consideration
      }

    for (i = copy.length - 1; i > 0; i--) {

        if(check === 0){
            setComp("Complexity: O(n)");
             // O(n) for best case
        } else {
            setComp("Complexity: O(nlogn)");
             // O(nlogn) for best, average and worst case
        }
        swap(copy, 0, i);
        animations.push([[i,copy[i]], true]);
        //animations.push([[i], false]);
        array_length--;
        heap_root(copy, 0);
         animations.push([[0,copy[0]], false]);
        animations.push([[0,copy[0]], true]);
      
    }
    setSpace("Space Complexity: O(n)"); // O(n) for space complexity since we are using an extra space to store animations approximately equal to the size of the array
    return animations;
}


 function heap_root(input, i) {

    check = 1; // to check that array is going in heap_root
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


