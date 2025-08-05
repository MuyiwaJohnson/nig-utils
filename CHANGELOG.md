# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.5] - 2024-12-19

### Added
- **Enhanced documentation**: Comprehensive README with detailed API reference
- **Rich examples**: Extensive usage examples for all modules
- **Error handling guide**: Complete error handling documentation
- **Best practices**: Performance and usage best practices
- **Type definitions**: Detailed TypeScript type documentation
- **Performance badges**: Bundle size and download statistics

### Documentation
- Added detailed function tables with parameters and return types
- Enhanced usage examples with real-world scenarios
- Comprehensive error handling documentation
- Performance optimization guide
- Best practices for each module

## [0.1.4] - 2024-12-19

### Changed
- **Major size optimization**: Reduced package size by 82% (from 650KB to 120KB)
- Removed source maps to reduce package size
- Removed JSDoc comments from TypeScript declaration files
- Fixed tsup configuration to exclude non-existent payments module
- Optimized build configuration for minimal package size

### Performance
- Package size reduced from 663KB to ~120KB
- Faster downloads and installations
- Maintained all functionality while reducing overhead

## [0.1.3] - 2024-12-19

### Removed
- Planned features and roadmap sections from documentation
- Demo directory and performance monitoring features
- References to NIN validation and other planned features

### Changed
- Updated active development warning to focus on improvements rather than new features
- Simplified documentation structure
- Cleaned up code comments and references

## [Unreleased]

### Added
- Enhanced Geography Module with complete Nigerian states, LGAs, and cities data

## [0.1.2] - 2024-12-19

### Added
- Comprehensive API documentation with function tables
- Development status badges and active development warning
- Enhanced documentation structure
- TypeScript support documentation
- Performance features documentation
- Browser & Node.js support documentation

### Changed
- Updated README with detailed function reference tables
- Improved documentation structure and examples
- Enhanced error handling documentation

## [0.1.1] - 2024-12-19

### Fixed
- Package contents control with `files` field in package.json
- Removed unnecessary files from npm package
- Fixed package naming from `ng-utils-nigeria` to `nig-utils`

### Removed
- Payments module exports (not implemented)
- Benchmark module from telco (simplified structure)

## [0.1.0] - 2024-12-19

### Added
- **Phone Number Utilities**: Nigerian phone number validation, telco detection, and formatting
- **Money Utilities**: Naira formatting, VAT calculations, currency conversion
- **Geography Utilities**: Nigerian states, LGAs, and cities data
- **TypeScript Support**: Full type definitions and type safety
- **Cross-Environment Support**: Works in both browser and Node.js
- **Batch Processing**: Efficient handling of multiple items
- **Error Handling**: Comprehensive error types and safe operations

### Features
- Phone number normalization to E.164 format
- Telco provider detection (MTN, GLO, AIRTEL, 9MOBILE)
- Naira currency formatting with multiple options
- VAT calculations (add/remove VAT)
- Percentage calculations
- Currency conversion (Naira to Kobo)
- Amount spelling in words
- Nigerian geography data
- Random phone number generation
- Batch processing for multiple operations
- Safe operations with error handling
- Comprehensive validation functions

---

## Version History

- **0.1.0**: Initial release with core utilities
- **0.1.1**: Package optimization and structure cleanup
- **0.1.2**: Enhanced documentation and user experience
- **0.1.3**: Simplified library structure and removed planned features
- **Unreleased**: Future features and improvements 