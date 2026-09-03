# Security notes

The local demo does not fetch remote URLs or upload files. URL inputs are validated and displayed as unanalysed targets unless demo mode is chosen. A production fetch provider must enforce private-IP blocking, redirects, size/time limits, MIME validation, HTML sanitization, and audit logging before remote retrieval is enabled.
