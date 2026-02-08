# Portfolio Website

A clean, modern portfolio website built with HTML and CSS.

## 🚀 Quick Start

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Create a GitHub account** (if you don't have one)
   - Go to [github.com](https://github.com) and sign up

2. **Create a new repository**
   - Repository name: `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
   - Make it public
   - Don't add README, .gitignore, or license (we already have our files)

3. **Upload your files**
   - Click "uploading an existing file"
   - Drag and drop `index.html` and `styles.css`
   - Commit the changes

4. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main (or master)
   - Folder: / (root)
   - Click Save

5. **Visit your site!**
   - Your site will be live at: `https://yourusername.github.io`
   - It may take a few minutes for the first deployment

### Option 2: Use Git Command Line

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 📝 Customization Guide

### 1. Update Personal Information

**In `index.html`:**
- Replace "Your Name" with your actual name
- Update the subtitle and description in the hero section
- Modify the "About Me" section with your own story
- Add your actual email and social media links in the contact section

### 2. Add Your Projects

For each project card, update:
- **Project Name**: Change "Project Name 1" to your actual project name
- **Description**: Write what the project does
- **GitHub Link**: Add the link to your GitHub repository
- **Live Demo Link**: Add the link to the deployed project (if available)
- **Tech Tags**: Replace with the technologies you actually used

Example:
```html
<div class="project-card">
    <div class="project-header">
        <h3>Weather App</h3>
        <div class="project-links">
            <a href="https://github.com/yourusername/weather-app" target="_blank">GitHub</a>
            <a href="https://yourusername.github.io/weather-app" target="_blank">Live Demo</a>
        </div>
    </div>
    <p>A beautiful weather forecasting app using OpenWeather API with real-time data.</p>
    <div class="tech-stack">
        <span class="tech-tag">React</span>
        <span class="tech-tag">TypeScript</span>
        <span class="tech-tag">OpenWeather API</span>
    </div>
</div>
```

### 3. Update Skills

Modify the skills in each category to match your actual skillset. Add or remove categories as needed.

### 4. Change Colors

**In `styles.css`**, modify the CSS variables at the top:
```css
:root {
    --primary-color: #4a90e2;  /* Your preferred primary color */
    --secondary-color: #2c3e50;  /* Your preferred secondary color */
    --accent-color: #e74c3c;  /* Your preferred accent color */
}
```

### 5. Customize the Hero Background

Change the gradient in the `.hero` section:
```css
.hero {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}
```

## 🎨 Adding More Sections

You can add additional sections like:
- Education
- Experience
- Certifications
- Blog posts
- Testimonials

Just follow the same structure as existing sections.

## 📱 Mobile Responsive

The site is fully responsive and looks great on all devices!

## 🔧 Troubleshooting

**Site not showing up?**
- Make sure your repository name is exactly `yourusername.github.io`
- Check that GitHub Pages is enabled in Settings
- Wait a few minutes for deployment
- Clear your browser cache

**Images not loading?**
- Make sure image paths are correct
- Use relative paths for local images
- Consider using absolute URLs for external images

## 📚 Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)

## 💡 Next Steps

- Add a custom domain
- Include project screenshots
- Add animations
- Integrate a contact form
- Add a blog section
- Include Google Analytics

## 📄 License

Feel free to use this template for your own portfolio!

---

**Built with ❤️ and deployed on GitHub Pages**
