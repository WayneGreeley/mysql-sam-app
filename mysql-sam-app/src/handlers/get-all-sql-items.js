const AWS = require('aws-sdk');

const secretclient = new AWS.SecretsManager();

var params = {
    SecretId : "RDSSecret-3CR2vSUUhxJd"
};

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

/**
 * A simple example includes a HTTP get method to get all items from a MySQL table.
 */
exports.getAllItemsHandler = async (event) => {
    // All log statements are written to CloudWatch
    console.info('received:', event);
    console.log("tableName",tableName);


    const secretResponse = await secretclient.getSecretValue(params).promise();

    console.log("secretResponse",secretResponse);

    const items = '';

    const response = {
        statusCode: 200,
        body: JSON.stringify(items)
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
