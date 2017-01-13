// euler003-zrt.cpp:
// Euler Zero, Problem 3 - Zero-runtime and calculation-at-execution versions
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

CONSTEXPR unsigned long long LargestPrimeFactor(unsigned long long n)
{
    unsigned long long lpf = 0;
    unsigned long divisor  = 2;

    while (n > 1){
        while(0 == (n % divisor)){
            if (divisor > lpf){
                lpf = divisor;
            }
            n /= divisor;
        }
        ++divisor;
        if ((divisor*divisor) > n){
            if (n > 1){
                if (n > lpf){
                    lpf = n;
                }
                break;
            }
        }
    }
    return lpf;
}

unsigned long long lpf = LargestPrimeFactor(600851475143);

#ifdef BUILD_ZRT_MAIN
#include <iostream>
int main()
{
    std::cout << lpf << std::endl;
}
#endif
