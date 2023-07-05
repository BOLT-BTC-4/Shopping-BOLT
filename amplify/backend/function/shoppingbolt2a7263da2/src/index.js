const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // ItemPresetテーブルのデータを取得
        const itemPresets = await ddb.scan({ TableName: 'ItemPreset' }).promise();

        // 取得したデータを使用してItemテーブルに新しいアイテムを作成
        for (const itemPreset of itemPresets.Items) {
            const newItem = {
                id: itemPreset.id,
                itemName: itemPreset.itemName,
                unit: itemPreset.unit,
                corner: itemPreset.corner
            };

            await ddb.put({
                TableName: 'Item',
                Item: newItem
            }).promise();
        }

        return {
            statusCode: 200,
            body: 'Item data copied successfully'
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: 'Error copying item data'
        };
    }
};


// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = async (event) => {
//     console.log(`EVENT: ${JSON.stringify(event)}`);
//     return {
//         statusCode: 200,
//     //  Uncomment below to enable CORS requests
//     //  headers: {
//     //      "Access-Control-Allow-Origin": "*",
//     //      "Access-Control-Allow-Headers": "*"
//     //  },
//         body: JSON.stringify('Hello from Lambda!'),
//     };
// };
