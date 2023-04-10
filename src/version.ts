import semver, { ReleaseType } from 'semver';


const allowed_release_types: ReleaseType[] = ['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease'];

export function parseReleaseType(str: string): ReleaseType {
    if (!allowed_release_types.includes(str as ReleaseType)) {
        throw new Error(`Invalid release type: ${str}`);
    }
    return str as ReleaseType; // type assertion
}

export function isNewerVersion(_before: string, _after: string, _releaseType: string): boolean {
    if (!_before) {
        throw new Error(`Cannot infer valid semver version from empty \`before\` input`);
    }
    if (!_after) {
        throw new Error(`Cannot infer valid semver version from empty \`after\` input`);
    }
    const releaseType: ReleaseType = parseReleaseType(_releaseType);
    const before = semver.clean(_before);
    if (!before) {
        throw new Error(`Cannot infer valid semver version from \`before\` input: ${_before}`);
    }
    const after = semver.clean(_after);
    if (!after) {
        throw new Error(`Cannot infer valid semver version from \`after\` input: ${_after}`);
    }
    // 1st we should get the next release from before given the release type
    const next = semver.inc(before, releaseType)!;
    return semver.gte(after, next);
}
