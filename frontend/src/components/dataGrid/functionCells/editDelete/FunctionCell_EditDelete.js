import { Component } from "react";
import pencilIcon from "../icons/pencil.svg";
import trashIcon from "../icons/trash.svg";
import "./FunctionCell_EditDelete.scss";

export default class FunctionCell_EditDelete extends Component {
  constructor(props) {
    console.log('+++ FunctionCell_EditDelete.js (line: 7)',props);
    super(props);
    this.pencilClickHandler = this.pencilClickHandler.bind(this);
    this.trashClickHandler = this.trashClickHandler.bind(this);
  }
  pencilClickHandler() {
    console.log('+++ FunctionCell_EditDelete.js (line: 14)',this.props);
    this.props.pencilClicked(this.props.value);
  }

  trashClickHandler() {
    this.props.trashClicked(this.props.value);
  }

  render() {
    if (this.props.data._origData.Status !== "STATUS_ERROR" && this.props.data._origData.Status !== "STATUS_DELETED") {
      return (
        <div className="gridFunctionCell">
          <img
            className='pencilIcon'
            src={pencilIcon}
            onClick={this.pencilClickHandler}
            alt="pencil"
          />
          <img
            className='trashIcon'
            src={trashIcon}
            onClick={this.trashClickHandler}
            alt="trash"
          />
        </div>
      );
    }
    return (
      <div className="reportInvoicesFunctionCell-err">
      </div>)
  }
}
