import React, { Component } from "react";
import { computeLPSArray, KMPSearch } from "../Algorithms/AlgorithmsSearches";

const MATCH_COLOR = "#006633";
const INIT_COLOR = "#FFFFFF";
var timeOut = [];
var counter = 0;
export default class CharactersRep extends Component {
  constructor(props) {
    super(props);
    const lps = computeLPSArray("aabaa", 5);
    this.state = {
      text: "aababaabaaba",
      pattern: "aabaa",
      isFinished: false,
      leftMargin: 0,
      lps: lps
    };
  }

  onChange = e => {
    e.persist();
    if (e.target.name === "pattern") {
      const pattern = e.target.value;
      const lps = computeLPSArray(pattern, pattern.length);
      this.setState({
        [e.target.name]: e.target.value,
        lps: lps
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  animateKMP() {
    const animations = KMPSearch(this.state.text, this.state.pattern);
    const lps = this.state.lps;
    const animationsLength = animations.length;
    for (let i = 0; i < animationsLength; i++) {
      const [
        textCounter,
        patternCounter,
        areEqualChars,
        matchFound
      ] = animations[i];
      if (areEqualChars && !matchFound) {
        timeOut.push(() => {
          const textLetter = document.getElementsByName(
            "text." + textCounter
          )[0];
          const patternLetter = document.getElementsByName(
            "pattern." + patternCounter
          )[0];
          textLetter.style.backgroundColor = MATCH_COLOR;
          patternLetter.style.backgroundColor = MATCH_COLOR;
        });
      } else if (!areEqualChars && !matchFound) {
        timeOut.push(() => {
          const patternFirstLetter = document.getElementsByName("pattern.0")[0];
          this.removeBackgroundColor(patternCounter, textCounter);
          let lpsShift = 0;
          if (patternCounter !== 0) {
            lpsShift = lps[patternCounter];
          }
          const shiftLeft =
            1.25 * (lpsShift + 1) +
            parseFloat(patternFirstLetter.style.marginLeft);
          patternFirstLetter.style.marginLeft = shiftLeft + "rem";
        });
      } else {
        timeOut.push(() => {
          const patternFirstLetter = document.getElementsByName("pattern.0")[0];
          this.removeBackgroundColor(patternCounter, textCounter);
          const shiftLeft =
            1.25 * (lps[patternCounter] + 1) +
            parseFloat(patternFirstLetter.style.marginLeft);
          patternFirstLetter.style.marginLeft = shiftLeft + "rem";
        });
      }
    }
    setTimeout(timeOut[counter], 100);
  }

  removeBackgroundColor(patternCounter, textCounter) {
    for (let j = 0; j <= patternCounter; j++) {
      const textLetter = document.getElementsByName(
        "text." + (textCounter - j)
      )[0];

      const patternLetter = document.getElementsByName("pattern." + j)[0];
      textLetter.style.backgroundColor = INIT_COLOR;
      patternLetter.style.backgroundColor = INIT_COLOR;
    }
  }

  prevStep() {
    setTimeout(timeOut[--counter], 100);
  }

  nextStep() {
    setTimeout(timeOut[++counter], 100);
  }

  animateBM() {
    console.log("BM");
  }
  render() {
    const { text, pattern, isFinished, leftMargin, lps } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="form-group">
            <label htmlFor="text" className="">
              Text
            </label>
            <input
              className="form-control"
              type="text"
              maxLength="50"
              id="text"
              name="text"
              value={text}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group px-3">
            <label htmlFor="pattern" className="">
              Pattern
            </label>
            <input
              className="form-control"
              type="pattern"
              maxLength="50"
              id="pattern"
              name="pattern"
              value={pattern}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group px-3">
            <button
              className="navbar-function-link btn py-3 mt-3"
              onClick={() => this.animateKMP()}
            >
              Find!
            </button>
          </div>
        </div>
        <div className="row">
          {text.split("").map((value, idx) => (
            <div key={idx} className="letter" name={`text.${idx}`}>
              {value}
            </div>
          ))}
        </div>
        <div className="row" style={{ left: leftMargin }}>
          {pattern.split("").map((value, idx) => (
            <div
              key={idx}
              className="letter-pattern"
              name={`pattern.${idx}`}
              style={{ marginLeft: "0rem" }}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="row mt-3">
          <div className="form-group">
            <button
              className="navbar-function-link btn py-3 mt-3"
              onClick={() => this.prevStep()}
            >
              Previous Step
            </button>
          </div>
          <div className="form-group ml-3">
            <button
              className="navbar-function-link btn py-3 mt-3"
              onClick={() => this.nextStep()}
            >
              Next Step
            </button>
          </div>
        </div>
        <div className="row">
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th scope="col">Character</th>
                <th scope="col">LPS value</th>
              </tr>
            </thead>
            <tbody>
              {pattern.split("").map((value, idx) => (
                <tr id={`row_${idx}`} key={idx}>
                  <th scope="row">{value}</th>
                  <td id={`col_${idx}`} className={`col_${idx} table_row`}>
                    {lps[idx]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
