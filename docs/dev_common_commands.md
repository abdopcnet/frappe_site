# Development Common Commands

## Backend Apply Changes

```bash
cd ~/frappe-bench-15
bench clear-cache && \
bench clear-website-cache && \
find . -name "*.pyc" -print -delete && \
bench restart
```

## Frontend Apply Changes

```bash
cd ~/frappe-bench-15
bench clear-cache && \
bench clear-website-cache && \
bench build --app frappe_site --force
```

## Install Frontend Dependencies

```bash
cd frappe_site
yarn install
```

## Verify Database Schema

```bash
bench mariadb
> DESCRIBE tabItem;  # Confirm field names before queries
```

## Commit Changes and Update Version

```bash
cd ~/frappe-bench-15/apps/frappe_site
python3 auto_commit.py
```

This command will:
- Update the version in `frappe_site/__init__.py` to current date (DD.MM.YYYY format)
- Update the version badge in `README.md`
- Commit changes to git
- Push changes to GitHub
