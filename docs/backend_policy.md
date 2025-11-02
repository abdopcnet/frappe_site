# Backend Policy

## Rules

- ✅ One function per file
- ✅ Use `@frappe.whitelist(allow_guest=True)` for public APIs
- ✅ Specify fields explicitly (no `SELECT *`)
- ✅ Use ERPNext native methods
- ✅ Target < 100ms response time
- ✅ Use `ignore_version=True` for faster saves

## API Structure

```
frappe_site/api/[doctype]/
├── get_[doctype].py          # Single record
├── get_many_[doctype]s.py    # Multiple records
├── create_[doctype].py       # POST - create new
├── update_[doctype].py       # PUT - update existing
└── delete_[doctype].py       # DELETE
```

## Error Handling

- Use `frappe.log_error()` for errors only
- Never log successful operations
- Wrap risky code in try/except blocks
