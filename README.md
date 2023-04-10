# @ForesightMiningSoftwareCorporation/is-newer-version

GitHub Action designed to compare two semantic version numbers and determine whether the version has been updated based on its release type (major, minor, or patch).

[![build-test](https://github.com/ForesightMiningSoftwareCorporation/is-newer-version/actions/workflows/build-test.yml/badge.svg)](https://github.com/ForesightMiningSoftwareCorporation/is-newer-version/actions/workflows/build-test.yml)

## Usage

```yaml
- uses: @ForesightMiningSoftwareCorporation/is-newer-version@v1
  with:
    before: '1.0.0'
    after: '1.1.0'
    release_type: 'minor'
```

## Inputs

| Name           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Required | Default   |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :-------- |
| `before`       | The original semantic version number to compare against. It should be provided as a string in the format "X.Y.Z" where X, Y, and Z are integers representing the major, minor, and patch versions respectively.                                                                                                                                                                                                                                                                      | `true`   | `N/A`     |
| `after`        | The new semantic version number to compare against. It should be provided as a string in the same format as the before input.                                                                                                                                                                                                                                                                                                                                                        | `true`   | `N/A`     |
| `release_type` | The release type to use when comparing the two versions. It should be provided as a string that is either "major", "minor", or "patch". If "major" is selected, the action will consider any change in the major version number to be an update. If "minor" is selected, the action will consider changes in the major or minor version numbers to be an update. Finally, if "patch" is selected, the action will only consider changes in the patch version number to be an update. | `false`  | `'patch'` |

## Outputs

| Name       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `is_after` | The release type to use when comparing the two versions. It should be provided as a string that is either "major", "minor", or "patch". If "major" is selected, the action will consider any change in the major version number to be an update. If "minor" is selected, the action will consider changes in the major or minor version numbers to be an update. Finally, if "patch" is selected, the action will only consider changes in the patch version number to be an update. |

## License

This GitHub Action is licensed under the [MIT License](./LICENSE).
