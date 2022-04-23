# aws-codeartifact-delete-package-versions

Required: `aws-actions/configure-aws-credentials`

Deletes one or more versions of a package from AWS codeartifacts. A deleted package version cannot be restored in your repository. If you want to remove a package version from your repository and be able to restore it later, set its status to Archived

## `domain`

The name of the domain that contains the package to delete.

### `domain-owner`

The 12-digit account number of the AWS account that owns the domain. It does not include dashes or spaces.

## `region`

AWS CodeArtifact Region.

## `repository`

The name of the repository that contains the package versions to delete.

## `format`

The format of the package versions to delete. The valid values are:

- npm
- pypi
- maven
- nuget

## `namespace`

The namespace of the package. The package component that specifies its namespace depends on its type. For example:

- The namespace of a Maven package is its groupId .
- The namespace of an npm package is its scope .
- A Python package does not contain a corresponding component, so Python packages do not have a namespace.

## `package`

The name of the package with the versions to delete.

## `versions`

An array of strings that specify the versions of the package to delete.

### Example

```yml
Test:
  runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          role-to-assume: arn:aws:iam::*****
          aws-region: us-east-1
          
      - name: aws-codeartifact-delete-package-versions
        uses: Fred78290/aws-codeartifact-delete-package-versions@v****
        with:
          domain: release
          domain-owner: 123456789012
          region: us-east-1
          repository: fred78290
          format: maven
          namespace: com.example.groupid
          package: sample
          versions: |
            1.0.0
            1.0.1
```
