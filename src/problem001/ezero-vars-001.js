var problemNumber = "001";

// Format: variant-tag, variant-name, required-standard, input-suffix, output-suffix, exe-definitions, supported-compilers[]
var supportedVariants =  [
    new supportedVariant("zrt", "Zero-runtime", "c++98", "-zrt", "-zrt", "BUILD_ZRT_MAIN", [ 
        "gcc;4.5.3+;-ftemplate-depth=1000",
        "gxx;4.5.3+;-ftemplate-depth=1000",
        "clang;3.4.1+;-ftemplate-depth=1000", 
        "clangxx;3.4.1+;-ftemplate-depth=1000"
//        , "intel;13+;-ftemplate-depth=1000", 
        ]),
    new supportedVariant("cax", "Calc-at-execution", "c++98", "-cax", "-cax", "", [ 
        "gcc;4.4.7+;",
        "gxx;4.4+;", 
        "clang;3.4.1+;", 
        "clangxx;3.4.1+;", 
        "intel;13.0.1+;", 
        "msvc;2003+;"
        ])
];
