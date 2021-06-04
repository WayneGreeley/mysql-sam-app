const AWS = require('aws-sdk');
const RDS = new AWS.RDSDataService();

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
        console.log("result",result);
    } catch (error) {
        console.error(error)
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(result)
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
