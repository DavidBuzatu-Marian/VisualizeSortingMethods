const MAX_CHAR = 65535;

export function boyerMooreSearch(textToSearchIn, patternToSearchFor) {
  const animations = [];
  if (textToSearchIn.length < 1 || patternToSearchFor.length < 1) {
    return -1;
  }

  let badCharsTable = getBadCharsTable(patternToSearchFor);
  let iterator = 0;
  let textLength = textToSearchIn.length;
  let patternLength = patternToSearchFor.length;
  while (iterator <= textLength - patternLength) {
    let iteratorPattern = patternLength - 1;
    while (
      iteratorPattern >= 0 &&
      patternToSearchFor[iteratorPattern] ===
        textToSearchIn[iterator + iteratorPattern]
    ) {
      iteratorPattern--;
    }

    if (iteratorPattern < 0) {
      // FOUND
      iterator +=
        iterator + patternLength < patternToSearchFor
          ? patternLength -
            badCharsTable[textToSearchIn.charCodeAt(iterator + patternLength)]
          : 1;
      break;
    } else {
      iterator += max(
        1,
        badCharsTable[textToSearchIn.charCodeAt(iterator + iteratorPattern)]
      );
    }
  }

  return animations;
}

function max(a, b) {
  return a > b ? a : b;
}

function getBadCharsTable(pattern) {
  let charsTable = [];
  let i;
  for (i = 0; i < MAX_CHAR; i++) {
    charsTable.push(pattern.length);
  }

  for (let i = 0; i < pattern.length - 1; i++) {
    let charCode = pattern.charCodeAt(i);
    charsTable[charCode] = pattern.length - i - 1;
  }

  return charsTable;
}

export function KMPSearch(textToSearchIn, patternToSearchFor) {
  let animations = [];
  let textLength = textToSearchIn.length;
  let patternLength = patternToSearchFor.length;

  let lps = computeLPSArray(patternToSearchFor, patternLength);
  let counterText = 0,
    counterPattern = 0;
  while (counterText < textLength) {
    if (patternToSearchFor[counterPattern] === textToSearchIn[counterText]) {
      animations.push([counterText, counterPattern, true, false]);
      counterText++;
      counterPattern++;
    }
    if (counterPattern === patternLength) {
      animations.push([counterText - 1, counterPattern - 1, true, true]);
      counterPattern = lps[counterPattern - 1];
    } else if (
      counterText < textLength &&
      patternToSearchFor[counterPattern] !== textToSearchIn[counterText]
    ) {
      if (counterPattern !== 0) {
        animations.push([counterText - 1, counterPattern - 1, false, false]);
        counterPattern = lps[counterPattern - 1];
      } else {
        counterText++;
        animations.push([counterText, counterPattern, false, false]);
      }
    }
  }

  return animations;
}

export function computeLPSArray(pattern, length) {
  let counter = 0;
  let lps = [];
  lps[0] = 0;
  let counterLPS = 1;
  while (counterLPS < length) {
    if (pattern[counterLPS] === pattern[counter]) {
      counter++;
      lps[counterLPS] = counter;
      counterLPS++;
    } else {
      if (counter !== 0) {
        counter = lps[counter - 1];
      } else {
        lps[counterLPS] = 0;
        counterLPS++;
      }
    }
  }
  return lps;
}
