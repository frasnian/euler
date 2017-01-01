// common.js:
// Euler Zero project, common javascript used by html doc files
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

// options that are always enabled, regardless of build type
var stdAlwaysOnOptions = "-O3 -Wall -Werror -pedantic "; // many *nix-style compilers (gcc,clang,icc,etc.) are the same

function CompilerInfo(sIdent, sFriendlyName, exeCmd, optStd, optAsm, optDefine, sOptOutputName, linkOptions, optionAlways) {
    this.ident = sIdent;
    this.friendlyName = sFriendlyName;
    this.command = exeCmd;
    this.optStandard = optStd;
    this.optAsm = optAsm;
    this.optDefine = optDefine;
    this.optOutputName = sOptOutputName;
    this.ciLinkOptions = linkOptions;
    this.ciOptionAlways = optionAlways;
  return this;
};

var CompilerInformation = [
    new CompilerInfo("gcc", "gcc", "gcc", "--std=", "-S", "-D", "-o", "-lstdc++", stdAlwaysOnOptions),
    new CompilerInfo("gxx", "g++", "g++", "--std=", "-S", "-D", "-o", "", stdAlwaysOnOptions),
    new CompilerInfo("clang", "clang", "clang", "--std=", "-S", "-D", "-o", "-lstdc++", stdAlwaysOnOptions),
    new CompilerInfo("clangxx", "clang++", "clang++", "--std=", "-S", "-D", "-o", "", stdAlwaysOnOptions),
    new CompilerInfo("intel", "Intel C++", "icc", "--std=", "-S", "-D", "-o", "-lstdc++", stdAlwaysOnOptions),
    new CompilerInfo("msvc", "Visual C++", "cl", "", "/Fa", "/D", "/Fe", "", "/EHsc /W4 /WX /O2 /Ox /Ot ")
];

// these must be global for some versions of firefox
var problemHeader;
var buildCommands;
var cmdLineProxy;

/*
Compiler support:
  -compilers (gcc, g++, clang, clang++, icc, msvc)
  -minimum versions for each
  -always-used options for each
  -project-specific settings
  -build-type settings
  -project-specific build-type settings
*/

function supportedVariant(sVariantTag, sSolutionVariant, sRequiredStandard, sInputSuffix, sOutputSuffix, sExeDefinitions, aSupportedCompilers){
    this.variantTag = sVariantTag;
    this.variantName = sSolutionVariant;
    this.requiredStandard = sRequiredStandard;
    this.inputSuffix = sInputSuffix;
    this.outputSuffix = sOutputSuffix;
    this.exeDefinitions = sExeDefinitions;
    this.supportedCompilers = aSupportedCompilers;
  return this;
}


function EulerZeroDefaults() {
  this.defaultCompiler = "";                                      // no preset default compiler  
  this.wikiHome = "https://github.com/frasnian/euler-zero/wiki/"; // online wiki pages
  this.optCompilerExplorer = false;                               // checkbox default
  return this;
};
var preferences = new EulerZeroDefaults();


function setTitle(sProblemNumber){
    document.title="Problem " +sProblemNumber+ " - Euler Zero";
}

function showRequiredStandards(oRequiredStandards){
    var sOut = '<p><b>Required Standards:</b>';
    sOut += '<table style="margin-top:-.85em;margin-left:20px;">';

    for (var i = 0; i < supportedVariants.length; i++){
        var v = supportedVariants[i];
        sOut += "<tr><td>" +v.requiredStandard.toUpperCase() + "</td><td>(" +v.variantName+ ")</td></tr>";
    }
    sOut += "</table></p>";
    return sOut;
}

function pageFooterContent(bIsSolutionPage){
    var s = "";
    
    if (bIsSolutionPage){
        s += '<p align="center"><br/><a href="../../doc/index.html">Documentation Home</a></p>';
    }
    s += '<p align="center" class="footer_notices"><a href="https://github.com/frasnian/euler-zero/wiki/License" target="_blank">Copyright &amp License Info</a> <b>&nbsp; | &nbsp;</b> <a href="https://github.com/frasnian/euler-zero/wiki/Contact-Info" target="_blank">Contact</a></p>';
  
    return s;
}

function lookupCompilerInfoByTag(sCompilerTag){
    for (var i = 0; i < CompilerInformation.length; i++){
        var cInfo = CompilerInformation[i];
        if (CompilerInformation[i].ident == sCompilerTag){
            return cInfo;
        }
    }
    return "";
}

function generateBuildCommandLine(buildVariant, compilerInfo, compilerAdditionalOptions, generateAsm, godbolt){
var commandLine="";

  var commandLine = godbolt ? "" : (compilerInfo.command + " ");

    commandLine += compilerInfo.ciOptionAlways;

    if (compilerInfo.optStandard){
        commandLine += compilerInfo.optStandard + buildVariant.requiredStandard+ " ";
    }
    
    commandLine += compilerAdditionalOptions + " ";
    
    if (generateAsm){
        if (!godbolt){
            commandLine += compilerInfo.optAsm + " ";
            commandLine += compilerInfo.optOutputName + "euler" +problemNumber+  buildVariant.outputSuffix + ".s ";
        }
    }
    else{
        if (buildVariant.exeDefinitions){
            commandLine += compilerInfo.optDefine + buildVariant.exeDefinitions + " "; // TODO: allow multiple definitions?
        }
        if (!godbolt){
            commandLine += compilerInfo.ciLinkOptions + " ";
            commandLine += compilerInfo.optOutputName + "euler" +problemNumber+  buildVariant.outputSuffix + " ";
        }
    }
    if (!godbolt){
        // add input source filename
        commandLine += "euler" +problemNumber+  buildVariant.inputSuffix + ".cpp";
    }

  return commandLine;
}

function copyToClipboard(sCommandLineElement)
{
    var cmdLine = eval(sCommandLineElement).innerText;

    cmdLineProxy.innerHTML = "<textarea id=\"buildCommandText\">"+cmdLine+"</textarea>";
    var oClipboardProxy = document.getElementById("buildCommandText");
    
    oClipboardProxy.value = cmdLine; 
    oClipboardProxy.setSelectionRange(0,4096);
    oClipboardProxy.select();
    document.execCommand('copy');           

    cmdLineProxy.innerHTML = "";
}

function regenerateBuildCommands(setDiv){
    var sOut = '<br/><table>';
    var sBuildNotes = "";

    // output generation
    var outputAsm = document.getElementById("generate_asm").checked;
    // options...
    var godbolt = document.getElementById("opt_godbolt").checked;
    var compilerNotes = new Array;

    sOut+= '<tr><td class="bld_command_table_hdr"><b>Compiler</b></td><td class="bld_command_table_hdr"><b>Version</b></td><td class="bld_command_table_hdr"><b>Build Command Line<b></td><td></td><td></td></tr>';
    for (var i = 0; i < supportedVariants.length; ++i){
        if (buildVariant != i){
            continue;
        }
        var v = supportedVariants[i];
        for (var comp = 0; comp < v.supportedCompilers.length; ++comp){
            var compilerAndVersion = v.supportedCompilers[comp].split(';');
            var compilerTag = compilerAndVersion[0];
            var compilerVersion = compilerAndVersion[1];

            if ((document.getElementById("compilers_all").checked) || compilerTag == preferences.defaultCompiler){
                var compilerAdditionalOptions = compilerAndVersion[2];
                var compilerAdditionalNote = compilerAndVersion[3];
                
                var compilerInfo = lookupCompilerInfoByTag(compilerTag);
                               
                sOut += '<tr><td nowrap>' +compilerInfo.friendlyName+ '</td>' 
                 +  '<td>(' +compilerVersion+  ")" +'</td>'
                 +  '<td id="' +compilerInfo.ident+ i  + '"><code>' 
                 +      generateBuildCommandLine(v, compilerInfo, compilerAdditionalOptions, outputAsm, godbolt)+ '</code>'
                 + '</td>'
                 + '<td><button id = "btn_' +compilerInfo.ident + i + '\" style="border:0;height:19px;" title="Copy command line to clipboard" '
                    + 'onclick="copyToClipboard(\'' +compilerInfo.ident + i  + '\')">'
                    + '<img src="../../doc/copy2clipboard-sm2.png"></button'
                +'</td>'
                ;
                if (compilerAdditionalNote){
                    sOut += '<td text-align="center"  align="center" valign="center" style="background-image:url(../../doc/icon-note-sm.png);background-repeat:no-repeat;background-position:center;width:22px;height:18px;cursor: default;vertical-align: middle;background-vertical-align: middle;"'
                    ;
                    var newNote = true;
                    for (var existingNote = 0; existingNote < compilerNotes.length; ++existingNote){
                        if (compilerNotes[existingNote] == compilerAdditionalNote){
                            sOut += ' title="Note ' +compilerNotes.length+ '">' + (existingNote+1) +"&nbsp;";
                            newNote = false;
                        }
                    }
                    if (newNote){
                        compilerNotes.push(compilerAdditionalNote);
                        sOut += ' title="Note ' +compilerNotes.length+ '">' + compilerNotes.length +"&nbsp;";
                    }
                    sOut += '</td>';
                }
                else{
                    sOut += '<td></td>';
                }
                
                sOut += '</tr>';
            }
        }
    }
    if (compilerNotes.length){
        sOut += '<tr><td align="right"><b>Notes:</b></td><td colspan="4"></td></tr>';
        for (var note = 0; note < compilerNotes.length; ++note){
            sOut += '<tr><td align="right">' +(note+1)+ ') </td><td colspan="2"> ' +compilerNotes[note]+ '</td><td></td><td></td></tr>';
        }
    }
    sOut += '</table>';  
    
    if (setDiv){
        buildCommands.innerHTML = sOut;
    }
    return sOut;
}

var buildVariant = 0;
function setBuildVariant(bv){
    buildVariant = bv;
    regenerateBuildCommands(true);
}

function writeBuildCommandForm(){
    var sOut = ""
        + '<p>'
        +  '<b>Build:</b><br/>'
        +  '<form onchange="regenerateBuildCommands(true)">'
        + '<p>'
        +  '<table style="margin-top:-.85em;margin-left:20px;">'
        +  '  <!-- <tr><td colspan="4"><span class="table_heading"><b>Build:</b></span></td></tr> -->'
        +  '  <tr>'
        +  '    <td class="column_heading">Variant</td>'
        +  '    <td class="column_heading">Compiler</td>'
        +  '    <td class="column_heading">Output</td>'
        +  '    <td class="column_heading">Options</td>'
        +  '  </tr>'
        ;

        for (var variantIndex = 0; variantIndex < supportedVariants.length; variantIndex++){
            sOut +=  '<tr>';
            sOut += '<td class="column_entry"><input type="radio" name="genvariant" onclick="setBuildVariant(' +variantIndex+ ')" ' +((variantIndex == 0) ? "checked" : "") + '>' + supportedVariants[variantIndex].variantName + "</input></td>";
            
            if (variantIndex == 0){ // row zero is "Default/Preferred" compiler
                if (preferences.defaultCompiler){
                    sOut +=  '<td class="column_entry"><input type="radio" name="compilers" checked>Default/Preferred</input></td>'
                }
                else{
                    sOut +=  '<td class="column_entry"><input type="radio" name="compilers" disabled><span style="color:#c0c0c0">Default/Preferred</span></input></td>'
                }
                
                sOut += '    <td class="column_entry"><input type="radio" name="generate"  id="generate_asm" checked>Assembly</input></td>';
                sOut += '    <td class="column_entry"><input type="checkbox" id="opt_godbolt" ' 
                     +            (preferences.optCompilerExplorer ? "checked" : "" ) + '>Compiler Explorer</input>'
                     +       '</td>';
            }
            else if (variantIndex == 1){
                if (!(preferences.defaultCompiler)){
                    sOut +=  '<td class="column_entry"><input type="radio" name="compilers" id="compilers_all" checked>All</input></td>'
                }
                else{
                    sOut +=  '<td class="column_entry"><input type="radio" name="compilers" id="compilers_all">All supported</td>'
                }

                sOut += '<td class="column_entry"><input type="radio" name="generate">Executable binary</input></td>';
                sOut += '<td class="column_entry"></td>';
            }
            else{
                sOut +=  '<td class="column_entry"></td>'
                sOut +=  '<td class="column_entry"></td>'
                sOut +=  '<td class="column_entry"></td>'
            }
            sOut +=  '</tr>';
        }

        +  '</table>'
        + '</p>'
        +  '</form>'
        + '</p>'
    ; // sOut   
    return sOut;
}

function addPageHeader(oElement)
{
    for (var i = 0; i < EulerZeroProblems.length; ++i){
        if (problemNumber == EulerZeroProblems[i].problemNumber){
            var sOut = "<h1>Euler Zero - Problem " +parseInt(problemNumber)
                     + " : " + EulerZeroProblems[i].name
                     + "</h1>"
                ;
            return sOut; // break;
        }
    }  
}

function standardPageElements() {
    setTitle(problemNumber);

    var content = document.getElementById("content");
    var intro = document.getElementById("ezero_intro");
    
    problemHeader = document.createElement("div", 'id="ezero_problemheader"');
    var s = addPageHeader(problemHeader);
    problemHeader.innerHTML = s;
    content.insertBefore(problemHeader, intro);
    
    var requiredStandards = document.createElement("div", "required_standards");
    requiredStandards.innerHTML = showRequiredStandards(supportedVariants);
    content.appendChild(requiredStandards);
    
    var buildCommandForm = document.createElement("div", "build_command_form");
    buildCommandForm.innerHTML = writeBuildCommandForm();
    content.appendChild(buildCommandForm);

    cmdLineProxy = document.createElement("div", "cmdLineProxy");
    content.appendChild(cmdLineProxy);

    buildCommands = document.createElement("div", "build_commands");
    s = regenerateBuildCommands(false);
    buildCommands.innerHTML = s;
    content.appendChild(buildCommands);
    
    var pageFooter  = document.createElement("div", "ezero_footer");
    pageFooter.innerHTML = pageFooterContent(true);
    content.appendChild(pageFooter);
    
    // fixups for Problem & Solution sections:
    var oProblem = document.getElementById("ezero_problem");
    var sCurrent = oProblem.innerHTML;
    var sFixedUp = '<b>The problem:</b><br/>' + sCurrent;
    oProblem.innerHTML = sFixedUp;
    
    var oSolution = document.getElementById("ezero_solution");
    sCurrent = oSolution.innerHTML;
    sFixedUp = '<b>The solution:</b></br>' + sCurrent;
    oSolution.innerHTML = sFixedUp;  
}
