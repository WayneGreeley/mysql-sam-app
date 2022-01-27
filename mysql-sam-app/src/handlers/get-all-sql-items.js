const AWS = require('aws-sdk');
const RDS = new AWS.RDSDataService();

const data = require('data-api-client')({
  secretArn: process.env.SECRET_ARN,
  resourceArn: process.env.CLUSTER_ARN,
  database: process.env.DATABASE_NAME
})

// import { ExecuteStatementResponse } from 'aws-sdk/clients/rdsdataservice';

var params = {
    secretArn: process.env.SECRET_ARN,
    resourceArn: process.env.CLUSTER_ARN,
    database: process.env.DATABASE_NAME,
    sql: '',
    includeResultMetadata: true
};

/**
 * A simple example includes a HTTP get method to get all items from a MySQL table.
 */
exports.getAllItemsHandler = async (event) => {
    // All log statements are written to CloudWatch
    console.info('params:', params);
    console.info('received:', event);

    params.sql = `SELECT * FROM Persons ; `

    let result = {}
    try {
        result = await RDS.executeStatement(params).promise();
        console.log("result",result.records);
    } catch (error) {
        console.error(error)
    }
    
    let data_result = await data.query(`SELECT * FROM Persons ;`)
    console.log("data_result",data_result);

        //let countResponse: ExecuteStatementResponse = await rds.executeStatement(checkUserEmailSQL).promise();
        //console.log(`${ServiceName} - invite.handle - rds-checkEmailInUse RES`, JSON.stringify(countResponse.records));

    const response = {
        statusCode: 200,
        body: JSON.stringify(result)
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
