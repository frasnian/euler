var problemNumber = "003";

var clangNote = "This will compile with clang / clang++ v3.4.1+, but the <code>--std=c++14</code> option must be changed to <code>--std=c++1y</code>";

var gccNote = "This will compile with gcc / g++ v4.4.7, but you have to remove the <code>--std=c++11</code> and <code>-pedantic</code> command-line options.";

// Format: variant-tag, variant-name, required-standard, input-suffix, output-suffix, exe-definitions, supported-compilers[]
var supportedVariants = [
    new supportedVariant("zrt", "Zero-runtime", "c++14", "-zrt", "-zrt", "BUILD_ZRT_MAIN", [ 
        "gcc;5.1+;;",
        "gxx;5.1+;;",
        "clang;3.5+;;" + clangNote, 
        "clangxx;3.5+;;" + clangNote 
//        , "intel;??+;",  // Intel compilers as of icc17 choke on this solution
        ]),
    new supportedVariant("cax", "Calc-at-execution", "c++98", "-zrt", "-cax", "BUILD_ZRT_MAIN", [ 
        "gcc;4.4.7+;-DEULER_ZERO_CAX -Wno-long-long;" + gccNote,
        "gxx;4.4.7+;-DEULER_ZERO_CAX -Wno-long-long;" + gccNote,
        "clang;3.4.1+;-DEULER_ZERO_CAX -Wno-long-long", 
        "clangxx;3.4.1+;-DEULER_ZERO_CAX -Wno-long-long", 
        "intel;13.0.1+;-DEULER_ZERO_CAX -Wno-long-long; Intel C++ will compile this without the <code>-Wno-long-long</code> option      (at least as of icc17). Technically, it shouldn't.", 
        "msvc;2003+;/DEULER_ZERO_CAX"
        ])
];
