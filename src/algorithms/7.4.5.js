// We can improve the running time of quicksort in practice by taking advantage of the fast
// running time of insertion sort when its input is "nearly" sorted. Upon calling quicksort
// on a subarray with fewer than kk elements, let it simply return without sorting the subarray.
// After the top-level call to quicksort returns, run insertion sort on the entire array to finish
// the sorting process. Argue that this sorting algorithm runs in O(nk + nlg(n/k))
// expected time. How should we pick k, both in theory and practice?

var K = 50;
let array_length;

var comp = ""; // complexity variable
var space = ""; // space complexity variable

export function modified_quicksort(arr, setComp, setSpace) {
  const copy = [...arr];
  array_length = copy.length;
  const animations = [];

  var p = 0;
  var r = array_length;
  limited_quicksort(copy, p, r, K, animations);
  insertion_sort(copy, p, r, animations);
  setComp(comp); // set complexity
  if (space === "") {
    setSpace("Space Complexity: O(n)");
    // O(n) for space complexity since we are using an extra space to store animations approximately equal to the size of the array
  } else {
    setSpace(space);
    // set space complexity
  }
  return animations;
}

function limited_quicksort(copy, p, r, t, animations) {
  if (r - p > t) {
    var q = partition(copy, p, r, animations);
    limited_quicksort(copy, p, q, t, animations);
    limited_quicksort(copy, q + 1, r, t, animations);
    comp = "Time Complexity: O(nlog(n/k))";
    // O(nlog(n/k)) for case when k = 550 which is the threshold
    space = "Space Complexity: O(n+n)";
    // O(n) because of the recursive calls and O(n) for the animations array
  }
}

function partition(copy, p, r, animations) {
  var x, i, j, tmp;

  x = copy[r - 1];
  i = p;

  for (j = p; j < r - 1; j++) {
    if (copy[j] <= x) {
      tmp = copy[i];
      copy[i] = copy[j];
      animations.push([[i, copy[j]], true]);
      // animations.push([[i,copy[j]],false]);
      copy[j] = tmp;
      animations.push([[j, tmp], true]);
      // animations.push([[j,tmp],false]);
      i++;
    }
  }

  tmp = copy[i];
  copy[i] = copy[r - 1];
  animations.push([[i, copy[r - 1]], false]);
  animations.push([[i, copy[r - 1]], true]);
  copy[r - 1] = tmp;
  animations.push([[r - 1, tmp], false]);
  animations.push([[r - 1, tmp], true]);

  return i;
}

function insertion_sort(copy, p, r, animations) {
  var i, j, key;
  comp = "Time Complexity: O(nk + nlog(n/k))";
  // considering the complexity of insertion sort which would ne O(nk) and the complexity of quicksort which would be O(nlog(n/k))
  for (j = p + 1; j < r; j++) {
    key = copy[j];
    for (i = j - 1; i >= p && copy[i] > key; i--) {
      copy[i + 1] = copy[i];
      animations.push([[i, copy[i]], false]);
      animations.push([[i + 1, copy[i]], true]);
    }
    copy[i + 1] = key;
    animations.push([[i, key], false]);
    animations.push([[i + 1, key], true]);
  }
}
