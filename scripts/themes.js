// themes.js

export const themes = {
    matrix: { 
      bg: '#001100', 
      text: '#00ff00', 
      prompt: '#00ff00',
      accent: '#33ff33',
      name: 'Matrix',
      description: 'Classic green-on-black terminal'
    },
    cyber: { 
      bg: '#0a1929', 
      text: '#00ffff', 
      prompt: '#ff00ff',
      accent: '#ff00ff',
      name: 'Cyberpunk',
      description: 'Neon blue and pink futuristic theme'
    },
    retro: { 
      bg: '#2b2b2b', 
      text: '#ff8c00', 
      prompt: '#ff8c00',
      accent: '#ffa500',
      name: 'Retro',
      description: 'Vintage computer terminal orange glow'
    },
    synthwave: { 
      bg: '#2b213a', 
      text: '#ff71ce', 
      prompt: '#05ffa1',
      accent: '#b967ff',
      name: 'Synthwave',
      description: 'Purple and pink vaporwave aesthetic'
    },
    hacker: { 
      bg: '#000000', 
      text: '#0f0', 
      prompt: '#0f0',
      accent: '#0a0',
      name: 'Hacker',
      description: 'Classic hacker terminal green'
    },
    ocean: { 
      bg: '#001B2E', 
      text: '#00B4D8', 
      prompt: '#90E0EF',
      accent: '#CAF0F8',
      name: 'Ocean',
      description: 'Calm blue tones inspired by the deep sea'
    },
    sunset: { 
      bg: '#1A1A2E', 
      text: '#E94560', 
      prompt: '#FFB800',
      accent: '#FF7B54',
      name: 'Sunset',
      description: 'Warm sunset colors with dark background'
    }
  };
  
  export function applyTheme(themeName) {
    const theme = themes[themeName] || themes.matrix; // Default to matrix if theme not found
    
    document.documentElement.style.setProperty('--bg-color', theme.bg);
    document.documentElement.style.setProperty('--text-color', theme.text);
    document.documentElement.style.setProperty('--prompt-color', theme.prompt);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
  
    // Save theme preference to localStorage
    localStorage.setItem('preferred-theme', themeName);
  }
  
  export function getThemeInfo(themeName) {
    return themes[themeName] || null;
  }
  
  export function getAllThemes() {
    return Object.entries(themes).map(([id, theme]) => ({
      id,
      name: theme.name,
      description: theme.description
    }));
  }
  
  // Function to get saved theme preference
  export function getSavedTheme() {
    return localStorage.getItem('preferred-theme') || 'matrix';
  }
  
  // Function to preview a theme without applying it
  export function getThemePreview(themeName) {
    const theme = themes[themeName];
    if (!theme) return null;
    
    return {
      name: theme.name,
      description: theme.description,
      colors: {
        background: theme.bg,
        text: theme.text,
        prompt: theme.prompt,
        accent: theme.accent
      }
    };
  }