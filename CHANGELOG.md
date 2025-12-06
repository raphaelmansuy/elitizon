# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security

- **CRITICAL**: Upgraded React from 19.0.0 to 19.2.1 to address CVE-2025-55182 (Remote Code Execution vulnerability in React Server Components)
- **CRITICAL**: Upgraded React-DOM from 19.0.0 to 19.2.1 for consistency with React core
- Updated @types/react from 19.1.8 to 19.2.7
- Updated @types/react-dom from 19.1.6 to 19.2.3
- Fixed @eslint/plugin-kit vulnerability via npm audit fix

### Changed

- Updated TypeScript type definitions to match React 19.2.1

### References

- [CVE-2025-55182](https://nvd.nist.gov/vuln/detail/CVE-2025-55182)
- [Google Cloud Security Bulletin: GCP-2025-072](https://cloud.google.com/support/bulletins#gcp-2025-072)
