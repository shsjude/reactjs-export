import React, {useState, useEffect } from "react";
import Chart from "react-apexcharts";

const Charts = () => {

  //passing the chart1data-set to useState 
  const [importSourceBank, setimportSourceBank] = useState([]);
  const [totalAmount, settotalAmount] = useState([]);
  const [communityName, setcommunityName] = useState([]);
  const [communityAmount, setcommunityAmount] = useState([]);

  //useeffect to pull chartdata 1st set from the server
  useEffect(() => {
    const ImportSourceBank=[];
    const TotalAmount=[];

    const getchartData1 = async () => {
      const dataReq = await fetch("http://localhost:3001/chartData1");
      const dataRes = await dataReq.json();
     //iterating over datares because mapping won't work
    for(let i=0; i<dataRes.length; i++) {
      ImportSourceBank.push(dataRes[i].ImportSourceBank);
      TotalAmount.push(dataRes[i].Column1);
    } 
    setimportSourceBank(ImportSourceBank);
    settotalAmount(TotalAmount);
    }
    getchartData1(); 
  }, []);

  //useeffect to pull chartdata 2nd set from the server
  useEffect(() => {
    const CommunityName=[];
    const CommunityAmount=[];

    const getchartData2 = async () => {
      const dataReq = await fetch("http://localhost:3001/chartData2");
      const dataRes = await dataReq.json();
     //iterating over datares because mapping won't work
    for(let i=0; i<dataRes.length; i++) {
      CommunityName.push(dataRes[i].CommunityName);
      CommunityAmount.push(dataRes[i].CommunityAmount);
    } 
    setcommunityName(CommunityName);
    setcommunityAmount(CommunityAmount);
    }
    getchartData2(); 
  }, []);




  return (
    <React.Fragment>
      <div className="container-fluid mb-5">
      
        <Chart
          type="scatter"
          width={500}
          height={400}
          series={[
            {
              name: "Banks",
              data:totalAmount,
            },
          ]}
          options={{
            title: {
              text: "Total Amount by banks",
              style: { fontSize: 15 },
              color:"#008000",
            },

            subtitle: {
              text: "",
              style: { fontSize: 12 },
            },

            colors: ["#008000"],
            theme: { mode: "light" },

            xaxis: {
              tickPlacement: "on",
              categories: importSourceBank,
              title: {
                text: "Bank Name",
                style: { color: "#008000", fontSize: 12 },
              },
            },

            yaxis: {
                labels: {
                  formatter: (val) => {
                  return `${val}`;
                  },
                style: { fontSize: "12", colors: ["#000000"] },
              },
                 title: {
                 text: "Amount In ($)",
                 style: { color: "#008000", fontSize: 15 },
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#000000"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>

{// second chart for totalamount by community}
}
<Chart
          type="line"
          width={550}
          height={400}
          series={[
            {
              name: "Communities",
              data:communityAmount,
            },
          ]}
          options={{
            title: {
              text: "Total Amount by Communities",
              style: { fontSize: 15 },
              color:"#008000",
            },

            subtitle: {
              text: "",
              style: { fontSize: 12 },
            },

            colors: ["#008000"],
            theme: { mode: "light" },

            xaxis: {
              tickPlacement: "on",
              categories: communityName,
              title: {
                text: "Community Name",
                style: { color: "#008000", fontSize: 12 },
              },
            },

            yaxis: {
                labels: {
                  formatter: (val) => {
                  return `${val}`;
                  },
                style: { fontSize: "12", colors: ["#000000"] },
              },
                 title: {
                 text: "Amount In ($)",
                 style: { color: "#008000", fontSize: 15 },
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#000000"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
}

export default Charts;