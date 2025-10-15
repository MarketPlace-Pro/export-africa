const { exec } = require('child_process');
const fs = require('fs');

class AICommander {
    constructor() {
        this.modules = {
            'coder': 'super_coder.py',
            'business': 'business_bot.py', 
            'content': 'content_creator.py'
        };
    }

    executeCommand(module, prompt) {
        return new Promise((resolve, reject) => {
            const command = `python ${this.modules[module]} "${prompt}"`;
            
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    reject(`Stderr: ${stderr}`);
                    return;
                }
                resolve(stdout);
            });
        });
    }

    async generateComponent(componentName) {
        console.log(`🤖 AI Generating: ${componentName} component...`);
        const result = await this.executeCommand('coder', `Create React component ${componentName}`);
        return result;
    }

    async findBuyers(product, country) {
        console.log(`🔍 AI Finding buyers for ${product} in ${country}...`);
        const result = await this.executeCommand('business', `find_buyers ${product} ${country}`);
        return result;
    }

    async createBlogPost(topic) {
        console.log(`📝 AI Creating blog post: ${topic}...`);
        const result = await this.executeCommand('content', `blog_post ${topic}`);
        return result;
    }
}

// Create and export instance
const aiCommander = new AICommander();
module.exports = aiCommander;

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);
    const command = args[0];
    const params = args.slice(1);

    const commander = new AICommander();

    switch(command) {
        case 'code':
            commander.generateComponent(params[0]).then(console.log);
            break;
        case 'leads':
            commander.findBuyers(params[0], params[1]).then(console.log);
            break;
        case 'blog':
            commander.createBlogPost(params[0]).then(console.log);
            break;
        default:
            console.log(`
🎯 AI COMMANDER USAGE:

npm run ai:code "UserDashboard"
npm run ai:leads "avocados" "Germany"  
npm run ai:blog "Export Opportunities"

Available Commands:
• code [component] - Generate React components
• leads [product] [country] - Find buyers
• blog [topic] - Create blog content
            `);
    }
}
