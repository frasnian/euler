// Euler Zero
//
// main() function for building an executable version of
// zero-runtime implementation of solutions
//
// Copyright (c) 2015,2016 David Starr
//
// Distributed under the Boost Software License, Version 1.0. 
// (See accompanying file LICENSE_1_0.txt or copy at 
// http://www.boost.org/LICENSE_1_0.txt)
//
#include <iostream>

#define ZRT_MAIN_MSG(msg, zrt_result) \
int main() \
{\
    std::cout << msg << zrt_result << std::endl;\
}

#define ZRT_MAIN(zrt_result)  ZRT_MAIN_MSG("", zrt_result)

