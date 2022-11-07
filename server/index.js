//connecting to mssql server to fetch data using msnodesqlv8 driver
const sql = require("msnodesqlv8");
const connectionString = "server=VM-SQL2019;Database=TylerDB;user=cenSoft!;password=ckl@;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

//importing expressjs and cors modules
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

//sending a get request for the tblData to mssql with express
app.get("/bankTransactions", (req, res) => {
    const query = 'select AccountName, AccountNumber, ImportSourceBank, Amount from TylerDB.dbo.tblBankTransactions;';
    sql.query(connectionString, query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }

    })

})

//requesting set1 data for linechart
app.get("/chartData1", (req, res) => {
    const query = 'select ImportSourceBank, sum(Amount) from TylerDB.dbo.tblBankTransactions Group by ImportSourceBank;';

    sql.query(connectionString, query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }

    })

})

//requesting set2 data for linechart
app.get("/chartData2", (req, res) => {
    const query = 'select CommunityName, sum(Amount)as CommunityAmount from TylerDB.dbo.tblBankTransactions Group by CommunityName;';

    sql.query(connectionString, query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }

    })

})

app.listen(3001, () => {
    console.log("server is running on port 3001")

});