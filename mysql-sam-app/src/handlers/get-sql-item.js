const AWS = require('aws-sdk');
import * as Knex from 'knex';

const secretclient = new AWS.SecretsManager();
const secretlink = process.env.SECRET_LINK;

var params = {
    SecretId: secretlink
};

try {
    const response = await secretclient.getSecretValue(params).promise();

    const database = JSON.parse(secretResponse.SecretString).dbname;
    const port = JSON.parse(secretResponse.SecretString).port;
    const host = JSON.parse(secretResponse.SecretString).host;
    const user = JSON.parse(secretResponse.SecretString).username;
    const password = JSON.parse(secretResponse.SecretString).password;

    const connection = {
        ssl: { rejectUnauthorized = false },
        host,
        user,
        password,
        database,
    }

    const knex = Knex({
        client: 'mysql',
        connection,
    })

} catch (error) {
    console.error('Error occurred while retrieving AWS secret');
    console.error(error);
}


/**
 * A simple example includes a HTTP get method to get one item from a MySQL table.
 */
exports.getItemsHandler = async (event) => {
    // All log statements are written to CloudWatch
    console.info('received:', event);
    console.log("secretlink",secretlink);
    // console.log("dbname",dbname);
    // console.log("dbport",dbport);
    // console.log("dbhost",dbhost);
    // console.log("dbusername",dbusername);
    // console.log("dbpassword",dbpassword);

    
    // Run your query
    const result = await knex().select()

    console.log("result",result);

    const response = {
        statusCode: 200,
        body: JSON.stringify(result)
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
