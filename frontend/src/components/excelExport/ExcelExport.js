/* eslint-disable react/prop-types */
import './ExcelExport.scss';
import * as xlsx from 'xlsx/xlsx.mjs';
import FileSaver from 'file-saver';
import ExcelExportIcon from './ExcelExport-icon.svg';

export default function ExcelExport(props) {
  function exportToExcel() {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const worksheet = xlsx.utils.json_to_sheet(props.data);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `excelData${EXCEL_EXTENSION}`);
  }

  return (
    <div className="btn-excel-export" onClick={exportToExcel} onKeyPress={exportToExcel} role="button" tabIndex={0}>
      <img className="ExcelExport-icon" src={ExcelExportIcon} alt="ExcelExport-icon.svg" />
    </div>
  );
}
