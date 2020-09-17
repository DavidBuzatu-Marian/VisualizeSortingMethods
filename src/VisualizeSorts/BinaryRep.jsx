import React, { Component } from "react";

const PRIMARY_COLOR = "#c2e8ce";
const SORTED_COLOR = "#f6ad7b";

export default class BinaryRep extends Component {
  constructor(props) {
    super(props);
    this.state = props.arrayInfo;
    this.pad = this.pad.bind(this);
  }

  componentDidMount() {
    this.setState(this.props.arrayInfo);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState(props.arrayInfo);
  }

  /* SPECIAL THANKS TO POINTY FROM  STACK OVERFLOW
  https://stackoverflow.com/a/10073788/11023871
  */
  pad(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  createBitDivs = (bits, isSorted) => {
    let ps = [];
    var keys = 0;
    for (let bit of bits) {
      ps.push(
        <p
          key={keys++}
          name={bits + this.pad(bit, keys)}
          className="col-2 bits"
          style={{
            backgroundColor: isSorted ? SORTED_COLOR : ""
          }}
        >{`${bit}`}</p>
      );
    }
    return ps;
  };

  render() {
    const { array, isSorted } = this.state.arrayInfo;
    return (
      <div className="row mt-5 ">
        {this.props.binaryType === 0 ? (
          array.map((value, idx) => (
            <div
              className="array-binary col-12"
              key={idx}
              name={value}
              style={{
                backgroundColor: isSorted ? SORTED_COLOR : PRIMARY_COLOR,
                display: "flex"
              }}
            >
              {this.createBitDivs(this.pad(value.toString(2), 6), isSorted)}
            </div>
          ))
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-6">
                {array.map((value, idx) => (
                  <p
                    className={`array-binary text-center p-responsive ` + value}
                    key={idx}
                    name={value}
                    style={{
                      backgroundColor: isSorted ? SORTED_COLOR : PRIMARY_COLOR
                    }}
                  >
                    {this.pad(value.toString(2), 6)}
                  </p>
                ))}
              </div>
              <div className="col-6">
                <table className="table table-bordered table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Mask</th>
                      <th scope="col">Numbers</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr id="row_0">
                      <th scope="row">00</th>
                      <td id="col_0" className="col_0 table_row"></td>
                    </tr>
                    <tr id="row_1">
                      <th scope="row">01</th>
                      <td id="col_1" className="col_1 table_row"></td>
                    </tr>
                    <tr id="row_2">
                      <th scope="row">10</th>
                      <td id="col_2" className="col_2 table_row"></td>
                    </tr>
                    <tr id="row_3">
                      <th scope="row">11</th>
                      <td id="col_3" className="col_3 table_row"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
