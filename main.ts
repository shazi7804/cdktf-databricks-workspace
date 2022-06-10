import { Construct } from "constructs";
import { App, TerraformStack, TerraformOutput } from "cdktf";
import { DatabricksProvider, 
         MwsCredentials, 
         MwsStorageConfigurations,
         MwsNetworks,
         MwsWorkspaces } from "./.gen/providers/databricks";

const config = require('./config.json');

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const databricksWorkspaceProvider = new DatabricksProvider(this, 'databricks', {
        username: config.workspace.username,
        password: config.workspace.password,
        host: config.workspace.host,
    });

    const mwsCredential = new MwsCredentials(this, 'mws_credentials', {
        provider: databricksWorkspaceProvider,
        accountId: config.workspace.accountId,
        roleArn: config.aws.iamArn,
        credentialsName: config.prefix + '-creds',
    });


    const mwsStorage = new MwsStorageConfigurations(this, 'mws_storage', {
        provider: databricksWorkspaceProvider,
        accountId: config.workspace.accountId,
        bucketName: config.aws.bucket,
        storageConfigurationName: config.prefix + '-storage',
    });


    const mwsNetwork = new MwsNetworks(this, 'mws_network', {
        provider: databricksWorkspaceProvider,
        accountId: config.workspace.accountId,
        vpcId: config.aws.vpcId,
        subnetIds: config.aws.privateSubnetIds,
        securityGroupIds: [config.aws.securityGroupId],
        networkName: config.prefix + '-net',
    });

    const mwsWorkspace = new MwsWorkspaces(this, 'workspace', {
        provider: databricksWorkspaceProvider,
        accountId: config.workspace.accountId,
        awsRegion: config.aws.region,
        workspaceName: config.prefix,
        deploymentName: config.prefix,
        credentialsId: mwsCredential.credentialsId,
        storageConfigurationId: mwsStorage.storageConfigurationId,
        networkId: mwsNetwork.networkId
    })



    new TerraformOutput(this, 'workspace_url', {
        value: mwsWorkspace.workspaceUrl
    });

  }
}

const app = new App();
new MyStack(app, "cdktf");
app.synth();
