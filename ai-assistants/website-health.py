import asyncio
import json
from datetime import datetime
from playwright.async_api import async_playwright

async def test_website():
    print('🌐 Testing AfriTrade website...')
    results = {
        'timestamp': datetime.now().isoformat(),
        'tests': {}
    }

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        try:
            await page.goto('https://afritrade-export.vercel.app', timeout=30000)
            load_time = await page.evaluate('() => performance.timing.loadEventEnd - performance.timing.navigationStart')
            results['tests']['homepage_load'] = {
                'status': 'success', 
                'load_time_ms': load_time,
                'url': 'https://afritrade-export.vercel.app'
            }
            print('✅ Homepage loaded successfully')
        except Exception as e:
            results['tests']['homepage_load'] = {
                'status': 'failed',
                'error': str(e)
            }
            print('❌ Homepage failed to load')

        try:
            await page.set_viewport_size({'width': 375, 'height': 812})
            menu_button = await page.query_selector('[class*="menu"], [class*="hamburger"]')
            if menu_button:
                await menu_button.click()
                await page.wait_for_timeout(1000)
                results['tests']['mobile_menu'] = {'status': 'success'}
                print('✅ Mobile menu test passed')
            else:
                results['tests']['mobile_menu'] = {'status': 'no_button_found'}
        except Exception as e:
            results['tests']['mobile_menu'] = {'status': 'failed', 'error': str(e)}

        await browser.close()

    with open('website_health.json', 'w') as f:
        json.dump(results, f, indent=2)

    print('📊 Website health check completed')
    return results

if __name__ == "__main__":
    asyncio.run(test_website())
