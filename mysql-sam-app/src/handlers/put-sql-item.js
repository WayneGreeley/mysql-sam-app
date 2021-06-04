const AWS = require('aws-sdk');
const RDS = new AWS.RDSDataService();

var params = {
    secretArn: process.env.SECRET_ARN,
    resourceArn: process.env.CLUSTER_ARN,
    database: process.env.DATABASE_NAME,
    sql: ''
};

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putItemHandler = async (event) => {
    // All log statements are written to CloudWatch
    console.info('params:', params);

    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    const body = JSON.parse(event.body)
    const userId = body.userId;
    const firstName = body.firstName;
    const lastName = body.lastName;
    
    var post  = {userId: 10, firstName: 'Insert', lastName: 'Example'};
    

    params.sql = `INSERT INTO Persons (userId, firstName, lastName) 
    VALUES ('${userId}','${firstName}','${lastName}'); `

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
