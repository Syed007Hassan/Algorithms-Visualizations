
var K = 550;
let array_length;

export function modified_quicksort(arr) {
    const copy =[...arr];
    array_length = copy.length;
    const animations = [];
    var p = 0;
    var r = array_length
    limited_quicksort(copy, p, r, K, animations);
    insertion_sort(copy, p, r, animations);

    return animations;
}

function limited_quicksort(copy, p, r, t, animations) {
    if (r - p > t) {
        var q = partition(copy, p, r, animations);

        limited_quicksort(copy, p, q, t, animations);
        limited_quicksort(copy, q + 1, r, t, animations);
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
            animations.push([[i,copy[j]],true]);
            // animations.push([[i,copy[j]],false]);
            copy[j] = tmp;
            animations.push([[j,tmp],true]);
            // animations.push([[j,tmp],false]);
            i++;
        }
    }

    tmp = copy[i];
    copy[i] = copy[r - 1];
    animations.push([[i,copy[r-1]],false]);
    animations.push([[i,copy[r-1]],true]);
    copy[r - 1] = tmp;
    animations.push([[r-1,tmp],false]);
    animations.push([[r-1,tmp],true]);

    return i;
}

function insertion_sort(copy, p, r, animations) {
    var i, j, key;

    for (j = p + 1; j < r; j++) {
        key = copy[j];
        for (i = j - 1; i >= p && copy[i] > key; i--) {
            copy[i + 1] = copy[i];
            animations.push([[i,copy[i]],false]);
            animations.push([[i+1,copy[i]],true]);
        }
        copy[i + 1] = key;
        animations.push([[i,key],false]);
        animations.push([[i+1,key],true]);
    }
}