import fm from 'front-matter';
import glob from 'glob';
import { fs } from 'mz';
import path from 'path';

export async function get(req, res) {
	// List the Markdown files and return their filenames
	const posts = await new Promise((resolve, reject) =>
		glob('static/_posts/*.md', (err, files) => {
			if (err) return reject(err);
			return resolve(files);
		}),
	);

	// Read the files and parse the metadata + content
	const postsFrontMatter = await Promise.all(
		posts.map(async post => {
			const content = (await fs.readFile(post)).toString();
			const attr = fm(content).attributes;
			const currentDate = attr.date
			const formatter = new Intl.DateTimeFormat('pt-BR', { month: 'long' });

			let formatDate = currentDate.getDate() + " de " + formatter.format(currentDate.getMonth() + 1) + " de " + currentDate.getFullYear()

			// Add the slug (based on the filename) to the metadata, so we can create links to this blog post
			return { ...attr, slug: path.parse(post).name, date: formatDate };
		}),
	);

	res.writeHead(200, {
		'Content-Type': 'application/json',
	});

	// Send the list of blog posts to our Svelte component
	res.end(JSON.stringify(postsFrontMatter));
}