import React, { useState, useEffect } from 'react';
import '../Components/main.css';
import '../App.css';
import { SheetDirective, SheetsDirective, SpreadsheetComponent, ColumnsDirective, ColumnDirective, 
    RangeDirective, RangesDirective, getFormatFromType, RowsDirective, RowDirective, CellsDirective, CellDirective, ChartModel, getRangeIndexes} from '@syncfusion/ej2-react-spreadsheet';

function Exportexcel() {

   //passing the useeffect data to usestate
   const [remoteData, setremoteData] = useState([]);


   //useffect to make request to the server
   useEffect(() => {
       const getremoteData = async () => {
           const req = await fetch("http://localhost:3001/chartData1");
           const res = await req.json();
           //console.log(bankres);
           setremoteData(res);
       }
       getremoteData(); //recursion
   }, []);

   //fusion documentation template
  let ssObj: SpreadsheetComponent;  
  let chartDetails: ChartModel[] = [{type:"Line", theme:"Fabric", isSeriesInRows: false, range: "A2:B7", data:remoteData}];
  const onCreated=()=>{
    // Formatting cells dynamically using cellFormat method
    ssObj.cellFormat({ backgroundColor: '#e56590', color: '#fff', fontWeight: 'bold', textAlign: 'center' }, 'A1:B1');
    // Applying currency format to the specified range.
   ssObj.numberFormat(getFormatFromType('Currency'), 'B2:E8');

    //Insert chart through Spreadsheet method.
    // ssObj.insertChart(chartDetails);

    /*setTimeout(function(){
      let rangeIndex = getRangeIndexes("G1");
      let cell = getCell(rangeIndex[0], rangeIndex[1], ssObj.getActiveSheet());

      if(cell.chart){
        ssObj.deleteChart(cell.chart[0].id);
      }
    }, 2000)*/
  }
  return (
    <div className='exceltb'>
      <SpreadsheetComponent ref={((s:SpreadsheetComponent)=>ssObj=s)}
        height={560}  created={onCreated} allowChart={true}
        allowOpen= {true} openUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open' 
        allowSave= {true} saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'
        >
        <SheetsDirective>
            <SheetDirective name='Bank Report'>
              <RowsDirective>
                <RowDirective index={0}>
                  <CellsDirective>
                    <CellDirective index={6} chart={chartDetails}></CellDirective>
                  </CellsDirective>
                </RowDirective>
              </RowsDirective>
              <RangesDirective>
                  <RangeDirective dataSource={remoteData}></RangeDirective>
              </RangesDirective>
              <ColumnsDirective>
                  <ColumnDirective width={100}></ColumnDirective>
                  <ColumnDirective width={100} ></ColumnDirective>
      
              </ColumnsDirective>
            </SheetDirective>
        </SheetsDirective>
      </SpreadsheetComponent>
    </div>
  );
}


export default Exportexcel;
