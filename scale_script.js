const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.vue')) results.push(file);
        }
    });
    return results;
}

const pagesDir = path.join(__dirname, 'pages');
const files = walk(pagesDir);

const wrapperStart = `    <div class="flex-1 flex flex-col w-full max-md:scale-[0.95] max-md:origin-top transition-transform duration-300">`;
const wrapperEnd = `    </div>`;

let modifiedCount = 0;

files.forEach(file => {
    // skip index.vue since we already modified it
    if (file === path.join(pagesDir, 'index.vue')) return;

    let content = fs.readFileSync(file, 'utf8');

    // Check if it's already wrapped
    if (content.includes('max-md:scale-[0.95]')) return;

    let lines = content.split('\n');
    let rootDivIndex = -1;
    // Find <div ... min-h-screen ...>
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('<template>')) {
            for (let j = i + 1; j < lines.length; j++) {
                if (lines[j].includes('min-h-screen')) {
                    rootDivIndex = j;
                    break;
                }
            }
            break;
        }
    }

    if (rootDivIndex !== -1) {
        let appFooterIndex = -1;
        for (let i = rootDivIndex + 1; i < lines.length; i++) {
            if (lines[i].includes('<AppFooter')) {
                appFooterIndex = i;
                break;
            }
        }

        lines.splice(rootDivIndex + 1, 0, wrapperStart);

        if (appFooterIndex !== -1) {
            // Because we inserted one line, appFooterIndex shifted by 1
            lines.splice(appFooterIndex + 1, 0, wrapperEnd);
        } else {
            // Find the last </div> before </template>
            let inserted = false;
            for (let i = lines.length - 1; i >= 0; i--) {
                if (lines[i].includes('</template>')) {
                    for (let j = i - 1; j >= 0; j--) {
                        if (lines[j].includes('</div>')) {
                            lines.splice(j, 0, wrapperEnd);
                            inserted = true;
                            break;
                        }
                    }
                    break;
                }
            }
            if (!inserted) {
                console.log('Could not find insertion point for end tag in', file);
                return;
            }
        }

        fs.writeFileSync(file, lines.join('\n'));
        console.log('Modified', file.replace(pagesDir, ''));
        modifiedCount++;
    } else {
        console.log('No min-h-screen root div found in', file);
    }
});

console.log('Total modified:', modifiedCount);
