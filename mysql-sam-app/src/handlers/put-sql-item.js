const AWS = require('aws-sdk');
const mysql = require('serverless-mysql')() // <-- initialize with function call?

const secretclient = new AWS.SecretsManager();
const secretlink = process.env.SECRET_LINK;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putItemHandler = async (event, context) => {
    // context.callbackWaitsForEmptyEventLoop = false;
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

    var params = {
        SecretId: secretlink
    };

    console.log("before secret",secretlink);
    const secretResponse = await secretclient.getSecretValue(params).promise();
    console.log("after secret");

    // console.log("secretResponse",secretResponse);
    
    const dbname = JSON.parse(secretResponse.SecretString).dbname;
    const dbport = JSON.parse(secretResponse.SecretString).port;
    const dbhost = JSON.parse(secretResponse.SecretString).host;
    const dbusername = JSON.parse(secretResponse.SecretString).username;
    const dbpassword = JSON.parse(secretResponse.SecretString).password;
    console.log("dbname",dbname);

    mysql.config({
        host     : dbhost,
        port     : dbport,
        database : dbname,
        user     : dbusername,
        password : dbpassword
    })
    console.log("before");
    
    var post  = {userId: 10, firstName: 'Insert', lastName: 'Example'};
    var results = await mysql.query('INSERT INTO Persons SET ?', post, function (error, results, fields) {
        if (error) throw error;
      // Neat!
    });
    
    console.log(results);

    // Run clean up function
    mysql.quit();

    const response = {
        statusCode: 200,
        body: JSON.stringify(results)
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
