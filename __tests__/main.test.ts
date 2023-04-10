import { parseReleaseType, isNewerVersion } from '../src/version';
import { expect, describe, it } from '@jest/globals'


describe('parseReleaseType', () => {
  it('should return the release type when a valid release type is provided', () => {
    expect(parseReleaseType('major')).toBe('major');
  });

  it('should throw an error when an invalid release type is provided', () => {
    expect(() => parseReleaseType('invalid')).toThrow('Invalid release type');
  });
});

describe('isNewerVersion', () => {
  it('should throw an error when the release type is invalid', () => {
    expect(() => isNewerVersion('1.0.0', '1.1.0', 'invalid')).toThrow(
      'Invalid release type: invalid'
    );
  });

  it('should throw an error when the before parameter is invalid', () => {
    expect(() => isNewerVersion('invalid', '1.1.0', 'minor')).toThrow(
      'Cannot infer valid semver version from `before` input: invalid'
    );
  });

  it('should throw an error when the before parameter is not set', () => {
    expect(() => isNewerVersion('', '1.1.0', 'minor')).toThrow(
      'Cannot infer valid semver version from empty `before` input'
    );
  });

  it('should throw an error when the after parameter is invalid', () => {
    expect(() => isNewerVersion('1.1.0', 'invalid', 'minor')).toThrow(
      'Cannot infer valid semver version from `after` input: invalid'
    );
  });

  it('should throw an error when the before parameter is not set', () => {
    expect(() => isNewerVersion('1.1.0', '', 'minor')).toThrow(
      'Cannot infer valid semver version from empty `after` input'
    );
  });

  it('should return true when the after version is after the before version', () => {
    expect(isNewerVersion('1.0.0', '1.1.0', 'minor')).toBe(true);
  });

  it('should return false when the after version is before the before version', () => {
    expect(isNewerVersion('1.1.0', '1.0.0', 'minor')).toBe(false);
  });

  for (const releaseType of ['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease']) {
    it(`should return false when the after version is the same as the before version for release type ${releaseType}`, () => {
      expect(isNewerVersion('1.0.0', '1.0.0', releaseType)).toBe(false);
    });
  }

  it('should return true when the after version is after the before version with "major" release type', () => {
    expect(isNewerVersion('1.0.0', '2.0.0', 'major')).toBe(true);
  });

  it('should return false when the after version is before the before version with "major" release type', () => {
    expect(isNewerVersion('2.0.0', '1.0.0', 'major')).toBe(false);
  });

  it('should return true when the after version is after the before version with "premajor" release type', () => {
    expect(isNewerVersion('1.0.0', '2.0.0-0', 'premajor')).toBe(true);
  });

  it('should return false when the after version is before the before version with "premajor" release type', () => {
    expect(isNewerVersion('2.0.0-0', '1.0.0', 'premajor')).toBe(false);
  });

  it('should return true when the after version is after the before version with "minor" release type', () => {
    expect(isNewerVersion('1.0.0', '1.1.0', 'minor')).toBe(true);
  });

  it('should return false when the after version is before the before version with "minor" release type', () => {
    expect(isNewerVersion('1.1.0', '1.0.0', 'minor')).toBe(false);
  });

  it('should return true when the after version is after the before version with "preminor" release type', () => {
    expect(isNewerVersion('1.0.0', '1.1.0-0', 'preminor')).toBe(true);
  });

  it('should return false when the after version is before the before version with "preminor" release type', () => {
    expect(isNewerVersion('1.1.0-0', '1.0.0', 'preminor')).toBe(false);
  });

  it('should return true when the after version is after the before version with "patch" release type', () => {
    expect(isNewerVersion('1.0.0', '1.0.1', 'patch')).toBe(true);
  });

  it('should return false when the after version is before the before version with "patch" release type', () => {
    expect(isNewerVersion('1.0.1', '1.0.0', 'patch')).toBe(false);
  });

  it('should return true when the after version is after the before version with "prepatch" release type', () => {
    expect(isNewerVersion('1.0.0', '1.0.1-0', 'prepatch')).toBe(true);
  });

  it('should return false when the after version is before the before version with "prepatch" release type', () => {
    expect(isNewerVersion('1.0.1-0', '1.0.0', 'prepatch')).toBe(false);
  });

  it('should return true when the after version is after the before version with prerelease release type', () => {
    expect(isNewerVersion('1.0.0', '1.0.1-beta.0', 'prerelease')).toBe(true);
  });

  it('should return false when the after version is before the before version with prerelease release type', () => {
    expect(isNewerVersion('1.0.1-beta.0', '1.0.0', 'prerelease')).toBe(false);
  });
});
