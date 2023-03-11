
import boto3
from botocore.exceptions import ClientError


class PartiQLWrapper:
    """
    Encapsulates a DynamoDB resource to run PartiQL statements.
    """
    def __init__(self, dyn_resource):
        """
        :param dyn_resource: A Boto3 DynamoDB resource.
        """
        self.dyn_resource = dyn_resource

    def query(self, statement, params):
        """
        Runs a PartiQL statement. A Boto3 resource is used even though
        `execute_statement` is called on the underlying `client` object because the
        resource transforms input and output from plain old Python objects (POPOs) to
        the DynamoDB format. If you create the client directly, you must do these
        transforms yourself.

        :param statement: The PartiQL statement.
        :param params: The list of PartiQL parameters. These are applied to the
                       statement in the order they are listed.
        :return: The items returned from the statement, if any.
        """
        try:
            output = self.dyn_resource.meta.client.execute_statement(
                Statement=statement, Parameters=params)
        except ClientError as err:
            if err.response['Error']['Code'] == 'ResourceNotFoundException':
                print(
                    "Couldn't execute PartiQL '%s' because the table does not exist.",
                    statement)
            else:
                print(
                    "Couldn't execute PartiQL '%s'. Here's why: %s: %s", statement,
                    err.response['Error']['Code'], err.response['Error']['Message'])
            raise
        else:
            return output

    def scan(self, table_name):
        return self.dyn_resource.Table(table_name).scan()


def setup_dynamo_db():
    dynamo_resource = boto3.resource('dynamodb')
    return  PartiQLWrapper(dynamo_resource)

def main():
    dynamo_resource = boto3.resource('dynamodb')
    table = dynamo_resource.Table('trashbot_users')
    response = table.scan()
    print(response)

    # wrapper = PartiQLWrapper(dynamo_resource)
    # table_name = "trashbot_users"
    # email = "test@gmail.com"
    # query = f"SELECT * FROM \"{table_name}\" WHERE email=?"
    # output = wrapper.query(query, [email])
    # print(output)


if __name__ == '__main__':
    main()