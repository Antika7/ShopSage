# Contributing to ShopSage

Thank you for your interest in contributing! This document covers how to get set up and the workflow for submitting changes.

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Git

### Local Setup

**Backend**

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

## How to Contribute

1. Fork the repository and create a branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes. Keep commits focused — one logical change per commit.

3. Test your changes locally before opening a pull request.

4. Open a pull request against `main` with a clear description of what changed and why.

## Code Style

**Python** — follow [PEP 8](https://peps.python.org/pep-0008/). Use `black` for formatting if available.

**JavaScript/TypeScript** — follow the existing ESLint config in the project.

## Reporting Bugs

Open a GitHub issue with:
- A clear title and description
- Steps to reproduce
- Expected vs. actual behavior
- Any relevant logs or screenshots

## Suggesting Features

Open a GitHub issue describing the feature and the problem it solves. Discussion first helps avoid duplicate effort.

## License

By contributing, you agree that your contributions will be licensed under the [GNU General Public License v3.0](LICENSE).
