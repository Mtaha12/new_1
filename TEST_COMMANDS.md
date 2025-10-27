# Playwright Test Commands - Quick Reference

## 🚀 Running Tests

### Run All Tests (All 7 Browsers)
```bash
npm test
```
**Runs**: 210 tests (30 tests × 7 browsers)
**Time**: ~8-10 minutes

---

### Run Specific Browser

#### Chromium Only
```bash
npm run test:chromium
```
**Runs**: 30 tests
**Time**: ~1-2 minutes

#### Firefox Only
```bash
npm run test:firefox
```
**Runs**: 30 tests
**Time**: ~1-2 minutes

#### Webkit (Safari) Only
```bash
npm run test:webkit
```
**Runs**: 30 tests
**Time**: ~2-3 minutes

#### Mobile Tests Only
```bash
npm run test:mobile
```
**Runs**: 60 tests (Mobile Chrome + Mobile Safari)
**Time**: ~3-4 minutes

---

### Run Specific Test File

```bash
npx playwright test tests/api-endpoints.spec.ts
npx playwright test tests/page-navigation.spec.ts
npx playwright test tests/chat-widget.spec.ts
npx playwright test tests/contact-form.spec.ts
npx playwright test tests/internationalization.spec.ts
```

---

### Run Single Test

```bash
npx playwright test -g "should load English homepage"
npx playwright test -g "should connect to MongoDB"
```

---

## 📊 Viewing Results

### View HTML Report
```bash
npm run test:report
```
Opens interactive HTML report in browser

### View Last Report
```bash
npx playwright show-report
```

---

## 🎯 Advanced Options

### Run Tests in UI Mode (Interactive)
```bash
npm run test:ui
```
Opens Playwright UI for debugging

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

### Run Tests with Specific Workers
```bash
npx playwright test --workers=2
```

---

## 🔍 Filtering Tests

### Run Only Failed Tests
```bash
npx playwright test --last-failed
```

### Run Tests by Tag
```bash
npx playwright test --grep @smoke
npx playwright test --grep @api
```

---

## 📝 Test Coverage

### All Test Files
1. **API Endpoints** (8 tests)
   - MongoDB connection
   - Content API
   - Contact form API
   - Chat API

2. **Page Navigation** (9 tests)
   - Homepage loading
   - Locale switching
   - 404 handling
   - Meta tags

3. **Chat Widget** (3 tests)
   - English version
   - Arabic version
   - Mobile responsive

4. **Contact Form** (3 tests)
   - English version
   - Arabic RTL
   - Mobile responsive

5. **Internationalization** (7 tests)
   - Language attributes
   - Text direction (LTR/RTL)
   - Locale switching
   - Invalid locale handling

---

## 🌐 Browser Coverage

| Browser | Device | Tests |
|---------|--------|-------|
| Chromium | Desktop | 30 |
| Firefox | Desktop | 30 |
| Webkit | Desktop Safari | 30 |
| Mobile Chrome | Pixel 5 | 30 |
| Mobile Safari | iPhone 12 | 30 |
| Microsoft Edge | Desktop | 30 |
| Google Chrome | Desktop | 30 |
| **TOTAL** | | **210** |

---

## ⚡ Quick Tips

1. **First Run**: May take longer as browsers download
2. **Parallel Execution**: Tests run in parallel (4 workers by default)
3. **Retries**: Failed tests automatically retry twice
4. **Server**: Dev server starts automatically before tests
5. **Reports**: Generated in `playwright-report/` and `test-results/`

---

## 🐛 Troubleshooting

### Tests Timing Out
```bash
# Increase timeout
npx playwright test --timeout=90000
```

### Server Not Starting
```bash
# Start server manually first
npm run dev

# Then run tests (will reuse existing server)
npm test
```

### Browser Not Found
```bash
# Install browsers
npx playwright install
```

### Clear Test Cache
```bash
# Remove old results
rm -rf test-results playwright-report
```

---

## 📈 Expected Results

 **All tests should pass**: 210/210
 **Total time**: 8-10 minutes
 **Retries**: Up to 2 per failed test
**Reports**: HTML + JSON + JUnit

---

## 🎉 Success Indicators

When tests pass successfully, you'll see:
```
✓ 210 passed (8.5m)
```

When viewing the report:
```
Serving HTML report at http://localhost:9323
```

---

**Last Updated**: 2025-10-10
**Status**:  All Systems Go
