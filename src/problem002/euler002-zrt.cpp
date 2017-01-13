// euler002-zrt.cpp:
// Euler Zero, Problem 2 - Zero-runtime and calculation-at-execution versions
// The code for both implementations is the same - compiler options
// determine which version should be built - the only difference is
// that CONSTEXPR is defined as the keyword for ZRT implentations and
// an empty definition for CAX.
//
// <copyright>
// This is a part of Euler Zero - see https://github.com/frasnian/euler-zero
// Copyright (c) 2015,2016 David Starr
//
// Distributed under the Boost Software License, Version 1.0. 
// (See accompanying file LICENSE_1_0.txt or copy at 
// http://www.boost.org/LICENSE_1_0.txt)
// </copyright>
//

CONSTEXPR unsigned SumEvenFibs(const unsigned lim)
{
  unsigned sum = 0;
    
    unsigned prev2 = 1;
    unsigned prev1 = 1;
    unsigned next  = 2;
    while (prev1 < lim){
        if (!(prev1 & 1)){
            sum += prev1;
        }
        prev2 = prev1;
        prev1 = next;
        next = prev1 + prev2;
    }
  return sum;
}

unsigned long sum = SumEvenFibs(4000000);

#ifdef BUILD_ZRT_MAIN
#include <iostream>
int main()
{
    std::cout << sum << std::endl;
}
#endif
