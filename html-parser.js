module.exports = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = function() { return doc; },
        peg$c1 = peg$FAILED,
        peg$c2 = function(l) { doc.imports = doc.imports.concat(l); },
        peg$c3 = function(c) { doc.content = doc.content.concat(c); },
        peg$c4 = [],
        peg$c5 = function() { },
        peg$c6 = function(i, l) { return [e].concat(l); },
        peg$c7 = function(i) { return [i]; },
        peg$c8 = "@import ",
        peg$c9 = { type: "literal", value: "@import ", description: "\"@import \"" },
        peg$c10 = function(modulename) { 
            return {'type': 'import', 'module': modulename };
          },
        peg$c11 = /^[a-zA-Z.]/,
        peg$c12 = { type: "class", value: "[a-zA-Z.]", description: "[a-zA-Z.]" },
        peg$c13 = function(name) { return name.join(""); },
        peg$c14 = /^[^<]/,
        peg$c15 = { type: "class", value: "[^<]", description: "[^<]" },
        peg$c16 = function(text, rest) { 
            var node = {
              type: 'text',
              content: text.join('')
            };
            return [node].concat(rest);
          },
        peg$c17 = function(text) { 
            var node = {
              type: 'text',
              content: text.join('')
            };
            return [node];
          },
        peg$c18 = function(e, rest) {
            var node = {
              type: 'element',
              content: e
            };
            return [node].concat(rest);
          },
        peg$c19 = function(e) {
            var node = {
              type: 'element',
              content: e
            };
            return [node];
          },
        peg$c20 = "<",
        peg$c21 = { type: "literal", value: "<", description: "\"<\"" },
        peg$c22 = null,
        peg$c23 = ">",
        peg$c24 = { type: "literal", value: ">", description: "\">\"" },
        peg$c25 = function(starttag, attrs, annotation) { 
            return {
              name: starttag,
              attributes: attrs === null ? [] : attrs,
              annotation: annotation
            };
          },
        peg$c26 = "</",
        peg$c27 = { type: "literal", value: "</", description: "\"</\"" },
        peg$c28 = function(endtag) { return endtag },
        peg$c29 = function(starttag, c, endtag) { 
            if (starttag.name != endtag) {
              console.log("error " + lineno + ": Start tag <" + starttag.name + ">  does not match up with end tag </" + endtag + ">")
            }
            return {
              type: 'element', 
              name: starttag.name, 
              attributes: starttag.attributes,
              annotation: starttag.annotation,
              content: c === null ? [] : c,
              lineno: lineno };
          },
        peg$c30 = function(a, l) { return [a].concat(l); },
        peg$c31 = function(a) { return [a]; },
        peg$c32 = "=\"",
        peg$c33 = { type: "literal", value: "=\"", description: "\"=\\\"\"" },
        peg$c34 = "\"",
        peg$c35 = { type: "literal", value: "\"", description: "\"\\\"\"" },
        peg$c36 = function(v) {
            return v;
          },
        peg$c37 = function(name, values) {
            return {
              name: name,
              value: values === null ? [] : values
            };
          },
        peg$c38 = "@",
        peg$c39 = { type: "literal", value: "@", description: "\"@\"" },
        peg$c40 = "()",
        peg$c41 = { type: "literal", value: "()", description: "\"()\"" },
        peg$c42 = function(functionname) {
            return functionname;
          },
        peg$c43 = function(lit, lst) { return [lit].concat(lst); },
        peg$c44 = function(lit) { return [lit] },
        peg$c45 = /^[a-zA-Z0-9]/,
        peg$c46 = { type: "class", value: "[a-zA-Z0-9]", description: "[a-zA-Z0-9]" },
        peg$c47 = function(letters) { return letters.join(""); },
        peg$c48 = /^[ \n\t]/,
        peg$c49 = { type: "class", value: "[ \\n\\t]", description: "[ \\n\\t]" },
        peg$c50 = function(chars) { 
            lineno += util.count_linebreaks(chars.join("")); // Increase current line.
            return "SPACE"
          },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsedocument();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c0();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsedocument() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseimportlist();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsedocument();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c2(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsecontent();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsedocument();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c3(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c5();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseimportlist() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseimport();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseimportlist();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c6(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseimport();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c7(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseimport() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 8) === peg$c8) {
        s1 = peg$c8;
        peg$currPos += 8;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsemodule();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsespace();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c10(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsemodule() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c11.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c12); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c11.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c12); }
          }
        }
      } else {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c13(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsecontent() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c14.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c15); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c14.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c15); }
          }
        }
      } else {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecontent();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c16(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c14.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c15); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c14.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c15); }
            }
          }
        } else {
          s1 = peg$c1;
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c17(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseelement();
          if (s1 !== peg$FAILED) {
            s2 = peg$parsecontent();
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c18(s1, s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseelement();
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c19(s1);
            }
            s0 = s1;
          }
        }
      }

      return s0;
    }

    function peg$parseopentag() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 60) {
        s1 = peg$c20;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseliteral();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsespace();
          if (s3 === peg$FAILED) {
            s3 = peg$c22;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseattributelist();
            if (s4 === peg$FAILED) {
              s4 = peg$c22;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseelementannotation();
              if (s5 === peg$FAILED) {
                s5 = peg$c22;
              }
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 62) {
                  s6 = peg$c23;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c24); }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsespace();
                  if (s7 === peg$FAILED) {
                    s7 = peg$c22;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c25(s2, s4, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c1;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parseclosetag() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c26) {
        s1 = peg$c26;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c27); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseliteral();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 62) {
            s3 = peg$c23;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c24); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsespace();
            if (s4 === peg$FAILED) {
              s4 = peg$c22;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c28(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parseelement() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseopentag();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecontent();
        if (s2 === peg$FAILED) {
          s2 = peg$c22;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseclosetag();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c29(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parseattributelist() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseattribute();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseattributelist();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c30(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseattribute();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c31(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseattribute_value() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c32) {
        s1 = peg$c32;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c33); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseliterallist();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s3 = peg$c34;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c35); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c36(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parseattribute() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseliteral();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseattribute_value();
        if (s2 === peg$FAILED) {
          s2 = peg$c22;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsespace();
          if (s3 === peg$FAILED) {
            s3 = peg$c22;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c37(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parseelementannotation() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 64) {
        s1 = peg$c38;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c39); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsemodule();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c40) {
            s3 = peg$c40;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c41); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c42(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parseliterallist() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseliteral();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseliterallist();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c43(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseliteral();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c44(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseliteral() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c45.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c46); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c45.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c46); }
          }
        }
      } else {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsespace();
        if (s2 === peg$FAILED) {
          s2 = peg$c22;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c47(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c1;
      }

      return s0;
    }

    function peg$parsespace() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c48.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c48.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c49); }
          }
        }
      } else {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c50(s1);
      }
      s0 = s1;

      return s0;
    }


      var util = require('./parser-util.js')

      lineno = 1;

      doc = { imports: [],
             content: [],
             annotation: null}


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();
