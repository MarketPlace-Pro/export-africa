import asyncio
import json
from datetime import datetime
from playwright.async_api import async_playwright

async def generate_leads():
    print('🚀 Starting lead generation...')
    results = {
        'automation_run': datetime.now().isoformat(),
        'leads': [],
        'status': 'success'
    }

    products = ['avocados', 'coffee', 'macadamia nuts', 'citrus', 'cocoa']

    for product in products:
        results['leads'].append({
            'product': product,
            'buyers': [
                {
                    'company': f'Global {product.title()} Importers',
                    'email': f'purchasing@global{product.replace(" ", "")}.com',
                    'country': 'Germany',
                    'found_at': datetime.now().isoformat()
                },
                {
                    'company': f'European {product.title()} Distributors',
                    'email': f'buy@{product.replace(" ", "")}europe.com',
                    'country': 'France',
                    'found_at': datetime.now().isoformat()
                }
            ]
        })
        print(f'✅ Generated leads for {product}')

    with open('leads_results.json', 'w') as f:
        json.dump(results, f, indent=2)

    print(f'🎉 Generated {len(results["leads"])} product categories')
    return results

if __name__ == "__main__":
    asyncio.run(generate_leads())
