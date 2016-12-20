// euler001-poc.cpp:
// Euler Zero, Problem 1 - calculation at runtime version
// 
// Copyright (c) 2015,2016 David Starr
//
// Distributed under the Boost Software License, Version 1.0. 
// (See accompanying file LICENSE_1_0.txt or copy at 
// http://www.boost.org/LICENSE_1_0.txt)
//
#include <iostream>

// using a const int here instead of hard-coding in the for loop
// so you can change it to 10 and verify against the example on
// the project page (or change it to whatever if Project Euler 
// changes the parameters of the problem).
const int limit = 1000; 

int main()
{
    int sum = 0;
    for (int i = 3; i < limit; i++){
        if ( ((i % 3) == 0) || ((i % 5) == 0)){
            sum += i;
        }
    }
    std::cout << "Sum = " << sum << "\n";

    return 0;
}
