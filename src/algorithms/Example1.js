var nl = getNewLine()



function getNewLine() {
	var agent = navigator.userAgent

	if (agent.indexOf("Win") >= 0)
		return "\r\n";
	else
		if (agent.indexOf("Mac") >= 0)
			return "\r";

 	return "\r";

}
quicksort(A,p,r) {
    if (p < r - 1) {
        let q = partition(A, p, r);
        quicksort(A, p, q);
        quicksort(A, q + 1, r);
    }
}

void modified_quicksort(int A[], int p, int r) {
    limited_quicksort(A, p, r, K);
    insertion_sort(A, p, r);
}

void limited_quicksort(int A[], int p, int r, int treshold) {
    if (r - p > treshold) {
        int q = partition(A, p, r);
        limited_quicksort(A, p, q, treshold);
        limited_quicksort(A, q + 1, r, treshold);
    }
}

 partition(int A[], int p, int r) {
    let x, i, j, tmp;

    x = A[r - 1];
    i = p;

    for (j = p; j < r - 1; j++) {
        if (A[j] <= x) {
            tmp = A[i];
            A[i] = A[j];
            A[j] = tmp;
            i++;
        }
    }

    tmp = A[i];
    A[i] = A[r - 1];
    A[r - 1] = tmp;

    return i;
}

 insertion_sort(let A[], let p, let r) {
   let i, j, key;

    for (j = p + 1; j < r; j++) {
        key = A[j];
        for (i = j - 1; i >= p && A[i] > key; i--) {
            A[i + 1] = A[i];
        }
        A[i + 1] = key;
    }
}