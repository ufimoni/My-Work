# This is a python script for storing the packages.
# we have to sort every thing out.
##############################################
###########################################
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # Last i elements are already in place
        for j in range(0, n-i-1):
            # Traverse the array from 0 to n-i-1
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(arr)
print("Sorted array is:", arr)

########################################################
#######################################################
##MERGE SORTING.....
def merge_sort(arr):
    if len(arr) > 1:
        # Finding the mid of the array
        mid = len(arr) // 2

        # Dividing the array elements into 2 halves
        left_half = arr[:mid]
        right_half = arr[mid:]

        # Recursive call on each half
        merge_sort(left_half)
        merge_sort(right_half)

        i = j = k = 0

        # Copy data to temp arrays L[] and R[]
        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1

        # Checking if any element was left
        while i < len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1

        while j < len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1

# Example usage
arr = [12, 11, 13, 5, 6, 7]
merge_sort(arr)
print("Sorted array is:", arr)
######## remeber to install flask.
###### process to install flask.
###### pip install virtualenv and source venv/bin/activate. for linux
######## for windows venv\Scripts\activate

import os
import subprocess

def setup_environment():
    # Create a virtual environment if it doesn't exist
    if not os.path.exists('venv'):
        subprocess.call(['virtualenv', 'venv'])
    
    # Activate the virtual environment
    if os.name == 'nt':
        activate = '.\\venv\\Scripts\\activate'
    else:
        activate = 'source ./venv/bin/activate'
    
    # Install packages from requirements.txt
    subprocess.call([activate + ' && pip install -r requirements.txt'], shell=True)

if __name__ == "__main__":
    setup_environment()




