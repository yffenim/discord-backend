const { Stack, Duration } = require('aws-cdk-lib');
// const sqs = require('aws-cdk-lib/aws-sqs');
const cdk = require("aws-cdk-lib");
const { Construct } = require("constructs");
const apiGateway = require("aws-cdk-lib/aws-apigateway");
const lambda = require("aws-cdk-lib/aws-lambda");
// const dynamodb = require("@aws-cdk/aws-dynamodb");


class DiscordServerSearchStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create our lambda
    const scraperLambda = new lambda.Function(this, "scraper", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.asset("src"),
      handler: "scraper.scrape",
      timeout: cdk.Duration.seconds(99),
      // environment: {
      //   TABLE_NAME: ServersTable,
      // },
    });

  // Create API Gateway API
    const api = new apiGateway.RestApi(this, "ufc-scraper-api", {
      restApiName: "UFC Stats Scraper",
      description: "UFC Stats Scraper API.",
    });

    // call our lambda when someone makes a GET request to /scrape
    const scrape = api.root.addResource("scrape");
    const scraperIntegration = new apiGateway.LambdaIntegration(scraperLambda);
    scrape.addMethod("GET", scraperIntegration);

  }
}

module.exports = { DiscordServerSearchStack }
