const AWS = require('aws-sdk');
const mysql = require('serverless-mysql')() // <-- initialize with function call?

const secretclient = new AWS.SecretsManager();
const secretlink = process.env.SECRET_LINK;

var params = {
    SecretId: secretlink
};

function getAwsSecret() {
    return secretclient.getSecretValue(params).promise();
}

async function getAwsSecretAsync () {
    try {
        const response = await getAwsSecret();
        return response;
    } catch (error) {
        console.error('Error occurred while retrieving AWS secret');
        console.error(error);
    }
}

/**
 * A simple example includes a HTTP get method to get all items from a MySQL table.
 */
exports.getAllItemsHandler = async (event) => {
    // All log statements are written to CloudWatch
    console.info('received:', event);
    console.log("secretlink",secretlink);

    // const secretResponse = await secretclient.getSecretValue(params).promise();
    const secretResponse = await getAwsSecretAsync();

    // console.log("secretResponse",secretResponse);
    
    const dbname = JSON.parse(secretResponse.SecretString).dbname;
    const dbport = JSON.parse(secretResponse.SecretString).port;
    const dbhost = JSON.parse(secretResponse.SecretString).host;
    const dbusername = JSON.parse(secretResponse.SecretString).username;
    const dbpassword = JSON.parse(secretResponse.SecretString).password;
    // console.log("dbname",dbname);
    // console.log("dbport",dbport);
    // console.log("dbhost",dbhost);
    // console.log("dbusername",dbusername);
    // console.log("dbpassword",dbpassword);

    mysql.config({
        host     : dbhost,
        port     : dbport,
        database : dbname,
        user     : dbusername,
        password : dbpassword
    })
    
    // Run your query
    let results = await mysql.query('SELECT * FROM Persons')

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
